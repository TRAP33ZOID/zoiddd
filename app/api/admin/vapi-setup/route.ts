import { NextResponse } from "next/server";
import { getVAPIStatus, listPhoneNumbers, createAssistant, linkAssistantToPhoneNumber, testWebhookConnection } from "@/lib/vapi-client";

/**
 * Admin API for VAPI Setup
 * 
 * Endpoints:
 * GET /api/admin/vapi-setup - Get current VAPI status
 * POST /api/admin/vapi-setup - Initialize VAPI configuration
 * POST /api/admin/vapi-setup/test-webhook - Test webhook connection
 */

export async function GET() {
  console.log("\n📊 [VAPI ADMIN] Status check requested");

  try {
    const status = await getVAPIStatus();
    const phoneNumbers = await listPhoneNumbers();

    console.log(`  ✅ API Key Set: ${status.apiKeySet}`);
    console.log(`  📞 Phone Numbers: ${phoneNumbers.length}`);

    return NextResponse.json({
      status: "ok",
      vapi: status,
      phoneNumbers: phoneNumbers.map(pn => ({
        id: pn.id,
        phoneNumber: pn.phoneNumber,
        country: pn.country,
        hasAssistant: !!pn.assistantId,
      })),
      setupStatus:
        status.apiKeySet && phoneNumbers.length > 0
          ? "ready_for_assistant"
          : "incomplete",
    });
  } catch (error) {
    console.error("❌ VAPI Status Check Error:", error);
    return NextResponse.json(
      {
        error: "Failed to get VAPI status",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  console.log("\n⚙️ [VAPI ADMIN] Setup requested");

  try {
    const body = (await req.json()) as {
      action?: string;
      phoneNumberId?: string;
      language?: string;
    };

    const { action = "setup", phoneNumberId, language = "en-US" } = body;

    // Check if VAPI key is set
    if (!process.env.VAPI_API_KEY) {
      return NextResponse.json(
        {
          error: "VAPI_API_KEY not configured",
          message: "Set VAPI_API_KEY in .env.local and restart the server",
        },
        { status: 400 }
      );
    }

    if (action === "setup") {
      // Full setup: List numbers and create assistant
      console.log("  Action: Full Setup");

      const phoneNumbers = await listPhoneNumbers();
      if (phoneNumbers.length === 0) {
        return NextResponse.json(
          {
            error: "No phone numbers available",
            message:
              "Please provision a phone number in VAPI dashboard first",
            setupUrl: "https://dashboard.vapi.ai/phone-numbers",
          },
          { status: 400 }
        );
      }

      const selectedPhone = phoneNumbers[0];
      console.log(`  Using phone: ${selectedPhone.phoneNumber}`);

      // Create assistant
      const assistantId = await createAssistant({
        name: `Zoid AI Support (${language})`,
        phoneNumberId: selectedPhone.id,
        firstMessage: getFirstMessage(language),
        language,
      });

      if (!assistantId) {
        return NextResponse.json(
          { error: "Failed to create assistant" },
          { status: 500 }
        );
      }

      // Link assistant to phone number
      const linked = await linkAssistantToPhoneNumber(
        selectedPhone.id,
        assistantId
      );

      if (!linked) {
        return NextResponse.json(
          { error: "Failed to link assistant to phone number" },
          { status: 500 }
        );
      }

      console.log(`  ✅ Setup complete: ${selectedPhone.phoneNumber}`);

      return NextResponse.json({
        status: "ok",
        message: "VAPI setup complete",
        phoneNumber: selectedPhone.phoneNumber,
        assistantId,
        language,
        readyToTest: true,
      });
    } else if (action === "create-assistant") {
      // Create assistant for specific phone number
      if (!phoneNumberId) {
        return NextResponse.json(
          { error: "phoneNumberId is required" },
          { status: 400 }
        );
      }

      console.log(
        `  Action: Create Assistant for phone ${phoneNumberId}`
      );

      const assistantId = await createAssistant({
        name: `Zoid AI Support (${language})`,
        phoneNumberId,
        firstMessage: getFirstMessage(language),
        language,
      });

      if (!assistantId) {
        return NextResponse.json(
          { error: "Failed to create assistant" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        status: "ok",
        assistantId,
        language,
      });
    } else {
      return NextResponse.json(
        { error: "Unknown action", validActions: ["setup", "create-assistant"] },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ VAPI Setup Error:", error);
    return NextResponse.json(
      {
        error: "VAPI setup failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * Test webhook endpoint
 */
export async function PUT(req: Request) {
  console.log("\n🧪 [VAPI ADMIN] Webhook test requested");

  try {
    const body = (await req.json()) as { testCallId?: string } | null;
    const testCallId = body?.testCallId || `test_${Date.now()}`;

    const success = await testWebhookConnection(testCallId);

    if (success) {
      return NextResponse.json({
        status: "ok",
        message: "Webhook test successful",
        testCallId,
      });
    } else {
      return NextResponse.json(
        {
          error: "Webhook test failed",
          testCallId,
          checkLogs: "See server logs for details",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Webhook Test Error:", error);
    return NextResponse.json(
      {
        error: "Webhook test failed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

/**
 * Get first message for language
 */
function getFirstMessage(language: string): string {
  const messages: Record<string, string> = {
    "en-US": "Welcome to Zoid AI Support. How can I help you today?",
    "ar-SA": "مرحبا بك في دعم Zoid الذكي. كيف يمكنني مساعدتك؟",
  };

  return messages[language] || messages["en-US"];
}