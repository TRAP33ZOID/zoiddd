import { NextResponse } from "next/server";

/**
 * VAPI Webhook Test Endpoint
 * 
 * Simulates VAPI webhook events for testing and debugging
 * Usage: POST /api/debug/vapi-webhook-test
 * 
 * Test payloads:
 * - type: "call.started"
 * - type: "user.transcription"  
 * - type: "call.ended"
 * - type: "end-of-call-report"
 */

interface TestPayload {
  type: "call.started" | "user.transcription" | "call.ended" | "end-of-call-report";
  callId?: string;
  language?: string;
  transcription?: string;
  message?: string;
  timestamp?: number;
  // For end-of-call-report
  id?: string;
  orgId?: string;
  phoneCallProviderId?: string;
  phoneNumberId?: string;
  assistantId?: string;
  startedAt?: string;
  endedAt?: string;
  durationSeconds?: number;
  durationMinutes?: number;
  cost?: number;
  customer?: { number?: string; name?: string };
  transcript?: string;
  summary?: string;
  recordingUrl?: string;
  performanceMetrics?: {
    modelLatencyAverage?: number;
    voiceLatencyAverage?: number;
    transcriberLatencyAverage?: number;
    turnLatencyAverage?: number;
  };
  costBreakdown?: {
    stt?: number;
    llm?: number;
    tts?: number;
    vapi?: number;
    total?: number;
    llmPromptTokens?: number;
    llmCompletionTokens?: number;
    ttsCharacters?: number;
  };
  messages?: Array<{
    role: string;
    message: string;
    secondsFromStart: number;
    duration?: number;
  }>;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const payload: TestPayload = await req.json();

    console.log("\n========================================");
    console.log("🧪 [DEBUG] VAPI Webhook Test");
    console.log("========================================");
    console.log(`  Event Type: ${payload.type}`);

    // Generate realistic test data based on event type
    const enrichedPayload = enrichTestPayload(payload);

    // Forward to actual webhook handler
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const webhookUrl = `${baseUrl}/api/vapi-webhook`;

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.VAPI_WEBHOOK_TOKEN || "vapi-test-token-zoid"}`,
      },
      body: JSON.stringify(enrichedPayload),
    });

    if (!webhookResponse.ok) {
      console.error(`  ❌ Webhook rejected: ${webhookResponse.status}`);
      const errorText = await webhookResponse.text();
      return NextResponse.json(
        {
          error: "Webhook test failed",
          status: webhookResponse.status,
          details: errorText,
        },
        { status: 500 }
      );
    }

    const result = await webhookResponse.json();
    const duration = Date.now() - startTime;

    console.log(`  ✅ Webhook accepted in ${duration}ms`);
    console.log(`========================================\n`);

    return NextResponse.json({
      status: "ok",
      testType: payload.type,
      duration,
      webhookResponse: result,
      payload: enrichedPayload,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`\n❌ [DEBUG] Test Error (${duration}ms)`);
    console.error(`  ${error instanceof Error ? error.message : String(error)}`);
    console.error("========================================\n");

    return NextResponse.json(
      {
        error: "Test failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

function enrichTestPayload(payload: TestPayload): unknown {
  const now = new Date();
  const callId = payload.callId || `test_${Date.now()}`;

  switch (payload.type) {
    case "call.started":
      return {
        type: "call.started",
        callId,
        language: payload.language || "en-US",
        timestamp: Date.now(),
      };

    case "user.transcription":
      return {
        type: "user.transcription",
        callId,
        transcription: payload.transcription || "What do you do?",
        message: payload.message || "What do you do?",
        timestamp: Date.now(),
      };

    case "call.ended":
      return {
        type: "call.ended",
        callId,
        timestamp: Date.now(),
      };

    case "end-of-call-report":
      return {
        type: "end-of-call-report",
        id: payload.id || callId,
        orgId: "test_org",
        phoneCallProviderId: "test_provider",
        phoneNumberId: "test_phone_id",
        assistantId: "test_assistant_id",
        startedAt: payload.startedAt || now.toISOString(),
        endedAt: payload.endedAt || new Date(now.getTime() + 60000).toISOString(),
        durationSeconds: payload.durationSeconds || 60,
        durationMinutes: 1,
        customer: payload.customer || { number: "+1234567890", name: "Test Customer" },
        transcript:
          payload.transcript ||
          "User: What do you do?\nAssistant: We provide AI support services.",
        summary: payload.summary || "Customer asked about services",
        recordingUrl: "https://example.com/recording.wav",
        performanceMetrics: {
          modelLatencyAverage: 150,
          voiceLatencyAverage: 200,
          transcriberLatencyAverage: 100,
          turnLatencyAverage: 250,
        },
        cost: payload.cost || 0.1234,
        costBreakdown: {
          stt: 0.02,
          llm: 0.04,
          tts: 0.06,
          vapi: 0.01,
          total: 0.1234,
          llmPromptTokens: 50,
          llmCompletionTokens: 30,
          ttsCharacters: 150,
        },
        language: "en-US",
        messages: [
          {
            role: "user",
            message: "What do you do?",
            secondsFromStart: 5,
            duration: 2000,
          },
          {
            role: "assistant",
            message: "We provide AI support services.",
            secondsFromStart: 7,
            duration: 3000,
          },
        ],
      };

    default:
      return payload;
  }
}

/**
 * GET endpoint for documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/debug/vapi-webhook-test",
    method: "POST",
    description: "Test VAPI webhook events locally",
    examples: {
      callStarted: {
        type: "call.started",
        callId: "test_123",
        language: "en-US",
      },
      userTranscription: {
        type: "user.transcription",
        callId: "test_123",
        transcription: "What do you do?",
      },
      callEnded: {
        type: "call.ended",
        callId: "test_123",
      },
      endOfCallReport: {
        type: "end-of-call-report",
        id: "test_123",
        durationSeconds: 60,
        cost: 0.1234,
      },
    },
    testCommands: {
      callFlow: `
        # Full call flow test
        1. POST /api/debug/vapi-webhook-test with { "type": "call.started", "callId": "test_123" }
        2. POST /api/debug/vapi-webhook-test with { "type": "user.transcription", "callId": "test_123", "transcription": "Hello" }
        3. POST /api/debug/vapi-webhook-test with { "type": "call.ended", "callId": "test_123" }
        4. POST /api/debug/vapi-webhook-test with { "type": "end-of-call-report", "id": "test_123" }
      `,
      quickEndOfCallTest: `
        POST /api/debug/vapi-webhook-test with { "type": "end-of-call-report" }
      `,
    },
  });
}