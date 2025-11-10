import { NextResponse } from "next/server";
import { ai, CHAT_MODEL } from "@/lib/gemini";
import { retrieveContext } from "@/lib/rag";
import { getSystemInstruction, isValidLanguage, getDefaultLanguage } from "@/lib/language";

/**
 * VAPI Webhook Handler
 * Handles streaming AI voice conversations from VAPI.ai
 * 
 * This endpoint receives:
 * 1. Incoming call events
 * 2. User transcription (STT already done by VAPI)
 * 3. Returns AI response for VAPI to synthesize
 * 
 * Architecture:
 * - VAPI handles telephony, STT, TTS, and streaming
 * - We handle RAG retrieval and AI response generation
 * - Target: <200ms response time for natural conversation
 */

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

interface ConversationState {
  messages: ConversationMessage[];
  language: string;
}

interface VAPIMessage {
  type: string;
  transcription?: string;
  message?: string;
  language?: string;
  callId?: string;
  timestamp?: number;
}

interface VAPIResponse {
  response: string;
  language: string;
  context?: string[];
  isFinal?: boolean;
  timestamp: number;
}

// Store conversation state per call (in production, use Redis)
const conversationState = new Map<string, ConversationState>();

/**
 * Main webhook handler for VAPI calls
 */
export async function POST(req: Request) {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log(`\n========================================`);
  console.log(`📞 [VAPI] Webhook received (ID: ${requestId})`);
  console.log(`========================================`);

  try {
    // 1. Validate Bearer Token for security
    const authHeader = req.headers.get("authorization");
    const expectedToken = `Bearer ${process.env.VAPI_WEBHOOK_TOKEN || "vapi-test-token-zoid"}`;
    
    if (!authHeader || authHeader !== expectedToken) {
      console.error("❌ [VAPI] Unauthorized request - invalid or missing token");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body: VAPIMessage = await req.json();
    
    console.log(`  Raw Payload Keys: ${Object.keys(body).join(", ")}`);
    console.log(`  Full Body:`, JSON.stringify(body, null, 2));
    
    console.log(`  Message Type: ${body.type}`);
    console.log(`  Call ID: ${body.callId}`);
    
    // Handle different VAPI message types
    if (body.type === "call.started") {
      return handleCallStarted(body, requestId, startTime);
    } else if (body.type === "user.transcription") {
      return handleUserTranscription(body, requestId, startTime);
    } else if (body.type === "call.ended") {
      return handleCallEnded(body, requestId, startTime);
    } else {
      console.log(`  ⚠️ Unknown message type: ${body.type}`);
      return NextResponse.json({ status: "unknown_type" });
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`\n❌ [VAPI] Webhook Error (${duration}ms)`);
    console.error(`  Error: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`========================================\n`);
    
    return NextResponse.json(
      {
        error: "Webhook processing failed",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

/**
 * Handle call.started event - IVR language selection
 */
async function handleCallStarted(
  body: VAPIMessage,
  requestId: string,
  startTime: number
): Promise<NextResponse> {
  const callId = body.callId || `call_${Date.now()}`;
  const language = body.language || getDefaultLanguage();
  
  console.log(`  Action: Call Started`);
  console.log(`  Language: ${language}`);
  
  // Initialize conversation state for this call
  conversationState.set(callId, {
    messages: [],
    language: isValidLanguage(language) ? language : getDefaultLanguage(),
  });
  
  // Greeting message with IVR instructions
  const greetingMessages: Record<string, string> = {
    'en-US': "Welcome to Zoid AI Support. How can I help you today?",
    'ar-SA': "مرحبا بك في دعم Zoid الذكي. كيف يمكنني مساعدتك؟",
  };
  
  const greeting = greetingMessages[language] || greetingMessages['en-US'];
  const duration = Date.now() - startTime;
  
  console.log(`  ✅ Call initialized in ${duration}ms`);
  
  return NextResponse.json({
    status: "ok",
    callId,
    language,
    greeting,
    timestamp: Date.now(),
  });
}

/**
 * Handle user.transcription event - Main RAG + AI response
 * This is the core of the streaming conversation
 */
async function handleUserTranscription(
  body: VAPIMessage,
  requestId: string,
  startTime: number
): Promise<NextResponse> {
  const callId = body.callId || "unknown";
  const userMessage = body.transcription || body.message || "";
  
  console.log(`  Action: User Transcription`);
  console.log(`  Transcription: "${userMessage}"`);
  
  if (!userMessage || userMessage.trim().length === 0) {
    console.log(`  ⚠️ Empty transcription, returning silence`);
    return NextResponse.json({ response: "", isFinal: false });
  }
  
  try {
    // Get conversation context for this call
    const state = conversationState.get(callId);
    if (!state) {
      console.error(`  ❌ No conversation state for call ${callId}`);
      return NextResponse.json(
        { error: "Call state not found" },
        { status: 400 }
      );
    }
    
    const language = state.language;
    
    // Step 1: RAG retrieval (target: <100ms)
    const ragStartTime = Date.now();
    const contextChunks = await retrieveContext(userMessage, language, 2);
    const ragDuration = Date.now() - ragStartTime;
    console.log(`  📚 RAG retrieval: ${ragDuration}ms`);
    
    // Step 2: Build conversation history for better context
    state.messages.push({ role: "user", content: userMessage });
    
    // Step 3: Generate AI response (target: <100ms)
    const aiStartTime = Date.now();
    const context = contextChunks.join("\n---\n");
    const baseSystemInstruction = getSystemInstruction(language);
    
    const systemInstruction = `${baseSystemInstruction}

CONTEXT:
---
${context}
---

IMPORTANT: Keep your response concise for phone conversations. Maximum 2-3 sentences.`;
    
    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [
        ...state.messages.map(msg => ({
          role: msg.role as "user" | "assistant",
          parts: [{ text: msg.content }]
        }))
      ],
      config: {
        systemInstruction: systemInstruction,
      },
    });
    
    const aiResponse = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
    const aiDuration = Date.now() - aiStartTime;
    console.log(`  🤖 AI generation: ${aiDuration}ms`);
    
    // Store AI response in history
    state.messages.push({ role: "assistant", content: aiResponse });
    
    // Keep only last 10 messages to prevent token bloat
    if (state.messages.length > 10) {
      state.messages.shift();
    }
    
    const totalDuration = Date.now() - startTime;
    console.log(`  ✅ Response ready in ${totalDuration}ms`);
    console.log(`  Response: "${aiResponse.substring(0, 60)}${aiResponse.length > 60 ? '...' : ''}"`);
    
    return NextResponse.json({
      status: "ok",
      response: aiResponse,
      language,
      context: contextChunks,
      isFinal: true,
      metrics: {
        ragMs: ragDuration,
        aiMs: aiDuration,
        totalMs: totalDuration,
      },
      timestamp: Date.now(),
    } as VAPIResponse);
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`  ❌ Error in transcription handler (${duration}ms)`);
    console.error(`  Error: ${error instanceof Error ? error.message : String(error)}`);
    
    return NextResponse.json(
      {
        error: "Failed to process transcription",
        response: "I encountered an error processing your request. Please try again.",
        isFinal: true,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle call.ended event - Cleanup
 */
async function handleCallEnded(
  body: VAPIMessage,
  requestId: string,
  startTime: number
): Promise<NextResponse> {
  const callId = body.callId || "unknown";
  
  console.log(`  Action: Call Ended`);
  
  // Clean up conversation state
  if (conversationState.has(callId)) {
    const state = conversationState.get(callId);
    console.log(`  📊 Call Summary: ${state?.messages.length || 0} total messages`);
    conversationState.delete(callId);
  }
  
  const duration = Date.now() - startTime;
  console.log(`  ✅ Call cleanup completed in ${duration}ms`);
  
  return NextResponse.json({ status: "ok", timestamp: Date.now() });
}