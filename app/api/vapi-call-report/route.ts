import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * VAPI End-of-Call Report Webhook Handler
 * 
 * This endpoint receives the comprehensive call data from VAPI.ai
 * after each call completes. It stores:
 * - Full call metadata and recordings
 * - Transcript and summary
 * - Performance metrics
 * - Cost breakdown
 * - Individual messages
 * 
 * Setup in VAPI Dashboard:
 * 1. Go to Phone Numbers → Your Number → Server Settings
 * 2. Add webhook URL: https://your-domain.com/api/vapi-call-report
 * 3. Set Bearer token to match VAPI_WEBHOOK_TOKEN
 */

interface VAPICallReport {
  // Call identifiers
  id: string;
  orgId: string;
  type: string;
  
  // Call details
  phoneCallProvider?: string;
  phoneCallProviderId?: string;
  phoneNumberId?: string;
  assistantId?: string;
  
  // Timing
  startedAt: string;
  endedAt: string;
  endedReason?: string;
  durationMs?: number;
  durationSeconds?: number;
  durationMinutes?: number;
  
  // Customer info
  customer?: {
    number?: string;
    name?: string;
  };
  
  // Transcript & recordings
  transcript?: string;
  summary?: string;
  recordingUrl?: string;
  stereoRecordingUrl?: string;
  
  // Performance metrics
  performanceMetrics?: {
    modelLatencyAverage?: number;
    voiceLatencyAverage?: number;
    transcriberLatencyAverage?: number;
    turnLatencyAverage?: number;
  };
  
  // Costs
  cost?: number;
  costBreakdown?: {
    stt?: number;
    llm?: number;
    tts?: number;
    vapi?: number;
    total?: number;
    llmPromptTokens?: number;
    llmCompletionTokens?: number;
    ttsCharacters?: number;
    knowledgeBaseCost?: number;
  };
  
  // Messages
  messages?: Array<{
    role: string;
    message?: string;
    time?: number;
    secondsFromStart?: number;
    duration?: number;
    toolCalls?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
  }>;
  
  // Status
  status?: string;
  
  // Language (from assistant config or variables)
  assistant?: {
    transcriber?: {
      language?: string;
    };
  };
  variableValues?: {
    language?: string;
  };
  
  // Full payload for debugging
  [key: string]: unknown;
}

export async function POST(req: Request) {
  const startTime = Date.now();
  
  console.log(`\n========================================`);
  console.log(`📊 [VAPI] End-of-Call Report Received`);
  console.log(`========================================`);
  
  try {
    // 1. Validate Bearer Token
    const authHeader = req.headers.get("authorization");
    const expectedToken = `Bearer ${process.env.VAPI_WEBHOOK_TOKEN || "vapi-test-token-zoid"}`;
    
    if (!authHeader || authHeader !== expectedToken) {
      console.error("❌ [VAPI] Unauthorized - invalid token");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // 2. Parse the call report
    const report: VAPICallReport = await req.json();
    
    console.log(`  Call ID: ${report.id}`);
    console.log(`  Duration: ${report.durationSeconds}s`);
    console.log(`  Cost: $${report.cost?.toFixed(4) || "0.0000"}`);
    console.log(`  Customer: ${report.customer?.number || "unknown"}`);
    
    // 3. Extract language (check multiple possible locations)
    const language = 
      report.variableValues?.language ||
      report.assistant?.transcriber?.language ||
      "en-US";
    
    // 4. Insert call log
    const { data: callLog, error: callLogError } = await supabase
      .from("vapi_call_logs")
      .insert({
        call_id: report.id,
        phone_number_id: report.phoneNumberId,
        assistant_id: report.assistantId,
        type: report.type,
        status: report.status || "completed",
        ended_reason: report.endedReason,
        customer_number: report.customer?.number,
        customer_name: report.customer?.name,
        started_at: report.startedAt,
        ended_at: report.endedAt,
        duration_seconds: report.durationSeconds,
        duration_minutes: report.durationMinutes,
        transcript: report.transcript,
        summary: report.summary,
        recording_url: report.recordingUrl,
        stereo_recording_url: report.stereoRecordingUrl,
        model_latency_avg: report.performanceMetrics?.modelLatencyAverage,
        voice_latency_avg: report.performanceMetrics?.voiceLatencyAverage,
        transcriber_latency_avg: report.performanceMetrics?.transcriberLatencyAverage,
        turn_latency_avg: report.performanceMetrics?.turnLatencyAverage,
        cost_total: report.cost || report.costBreakdown?.total,
        cost_stt: report.costBreakdown?.stt,
        cost_llm: report.costBreakdown?.llm,
        cost_tts: report.costBreakdown?.tts,
        cost_vapi: report.costBreakdown?.vapi,
        cost_knowledge_base: report.costBreakdown?.knowledgeBaseCost,
        llm_prompt_tokens: report.costBreakdown?.llmPromptTokens,
        llm_completion_tokens: report.costBreakdown?.llmCompletionTokens,
        tts_characters: report.costBreakdown?.ttsCharacters,
        language: language,
        raw_data: report, // Store full payload for debugging
      })
      .select()
      .single();
    
    if (callLogError) {
      console.error("❌ [VAPI] Error inserting call log:", callLogError);
      return NextResponse.json(
        { error: "Failed to store call log", details: callLogError.message },
        { status: 500 }
      );
    }
    
    console.log(`  ✅ Call log stored (ID: ${callLog.id})`);
    
    // 5. Insert messages if present
    if (report.messages && report.messages.length > 0) {
      const messages = report.messages
        .filter(msg => msg.role && msg.message) // Only store messages with content
        .map(msg => ({
          call_log_id: callLog.id,
          role: msg.role,
          message: msg.message,
          time: msg.time,
          seconds_from_start: msg.secondsFromStart,
          duration: msg.duration,
          tool_calls: msg.toolCalls || null,
          word_level_confidence: msg.metadata?.wordLevelConfidence || null,
        }));
      
      if (messages.length > 0) {
        const { error: messagesError } = await supabase
          .from("vapi_call_messages")
          .insert(messages);
        
        if (messagesError) {
          console.error("⚠️  [VAPI] Error inserting messages:", messagesError);
          // Don't fail the request if messages fail
        } else {
          console.log(`  ✅ ${messages.length} messages stored`);
        }
      }
    }
    
    const duration = Date.now() - startTime;
    console.log(`  ⏱️  Processing completed in ${duration}ms`);
    console.log(`========================================\n`);
    
    return NextResponse.json({
      status: "ok",
      callLogId: callLog.id,
      messagesStored: report.messages?.length || 0,
      processingTimeMs: duration,
    });
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`\n❌ [VAPI] Report Handler Error (${duration}ms)`);
    console.error(`  Error: ${error instanceof Error ? error.message : String(error)}`);
    console.error(`========================================\n`);
    
    return NextResponse.json(
      {
        error: "Failed to process call report",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "vapi-call-report",
    message: "VAPI End-of-Call Report webhook is active",
  });
}