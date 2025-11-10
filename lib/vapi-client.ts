/**
 * VAPI Client Utility
 * Manages interactions with VAPI.ai API
 * 
 * VAPI handles:
 * - Phone number provisioning
 * - Call routing to our webhook
 * - STT (Speech-to-Text)
 * - TTS (Text-to-Speech)
 * - Real-time streaming
 */

interface VAPIAssistantConfig {
  id?: string;
  name: string;
  phoneNumberId: string;
  firstMessage: string;
  voiceId?: string;
  language: string;
  systemPrompt?: string;
}

interface VAPIPhoneNumber {
  id: string;
  phoneNumber: string;
  country: string;
  provider: string;
  assistantId?: string;
}

interface VAPICall {
  id: string;
  phoneNumber: string;
  status: "initiated" | "ringing" | "active" | "ended";
  duration: number;
  startTime: string;
  endTime?: string;
  transcript?: string;
}

/**
 * Initialize VAPI client
 * Requires VAPI_API_KEY environment variable
 */
const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_BASE_URL = "https://api.vapi.ai";
const WEBHOOK_URL = process.env.VAPI_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/vapi-webhook`;

if (!VAPI_API_KEY) {
  console.warn(
    "⚠️ VAPI_API_KEY not set. VAPI integration will not work. Set it in .env.local"
  );
}

/**
 * Make API call to VAPI
 */
async function vapiApiCall(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: unknown
): Promise<unknown> {
  const url = `${VAPI_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${VAPI_API_KEY}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        `VAPI API Error ${response.status}: ${error}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`VAPI API Call Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * List available phone numbers in VAPI account
 */
export async function listPhoneNumbers(): Promise<VAPIPhoneNumber[]> {
  try {
    const response = await vapiApiCall("/phone-numbers");
    return (response as { phoneNumbers: VAPIPhoneNumber[] }).phoneNumbers || [];
  } catch (error) {
    console.error("Error listing phone numbers:", error);
    return [];
  }
}

/**
 * Get specific phone number details
 */
export async function getPhoneNumber(phoneNumberId: string): Promise<VAPIPhoneNumber | null> {
  try {
    return (await vapiApiCall(`/phone-numbers/${phoneNumberId}`)) as VAPIPhoneNumber;
  } catch (error) {
    console.error(`Error getting phone number ${phoneNumberId}:`, error);
    return null;
  }
}

/**
 * Create assistant configuration for VAPI
 */
export async function createAssistant(config: VAPIAssistantConfig): Promise<string | null> {
  try {
    const assistantPayload = {
      name: config.name,
      firstMessage: config.firstMessage,
      model: {
        provider: "google",
        model: "gemini-2.5-flash",
      },
      voice: {
        provider: "google",
        voiceId: config.voiceId || (config.language === "ar-SA" ? "ar-XA-Neural2-A" : "en-US-Neural2-A"),
      },
      phoneNumberId: config.phoneNumberId,
      webhookUrl: WEBHOOK_URL,
      transcriber: {
        provider: "google",
        language: config.language,
      },
    };

    const response = (await vapiApiCall("/assistants", "POST", assistantPayload)) as {
      id: string;
    };
    console.log(`✅ Created assistant: ${response.id}`);
    return response.id;
  } catch (error) {
    console.error("Error creating assistant:", error);
    return null;
  }
}

/**
 * Link assistant to phone number
 */
export async function linkAssistantToPhoneNumber(
  phoneNumberId: string,
  assistantId: string
): Promise<boolean> {
  try {
    await vapiApiCall(`/phone-numbers/${phoneNumberId}`, "PUT", {
      assistantId,
    });
    console.log(
      `✅ Linked assistant ${assistantId} to phone ${phoneNumberId}`
    );
    return true;
  } catch (error) {
    console.error("Error linking assistant to phone number:", error);
    return false;
  }
}

/**
 * Get call history
 */
export async function getCallHistory(limit: number = 10): Promise<VAPICall[]> {
  try {
    const response = (await vapiApiCall(`/calls?limit=${limit}`)) as {
      calls: VAPICall[];
    };
    return response.calls || [];
  } catch (error) {
    console.error("Error getting call history:", error);
    return [];
  }
}

/**
 * Get specific call details
 */
export async function getCallDetails(callId: string): Promise<VAPICall | null> {
  try {
    return (await vapiApiCall(`/calls/${callId}`)) as VAPICall;
  } catch (error) {
    console.error(`Error getting call ${callId}:`, error);
    return null;
  }
}

/**
 * Test webhook connection
 */
export async function testWebhookConnection(testCallId: string = "test_123"): Promise<boolean> {
  try {
    console.log(`🔗 Testing webhook at: ${WEBHOOK_URL}`);

    const testPayload = {
      type: "call.started",
      callId: testCallId,
      language: "en-US",
      timestamp: Date.now(),
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
    });

    if (response.ok) {
      console.log("✅ Webhook test successful");
      return true;
    } else {
      console.error(`❌ Webhook test failed: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error("Error testing webhook:", error);
    return false;
  }
}

/**
 * Get VAPI configuration status
 */
export async function getVAPIStatus(): Promise<{
  apiKeySet: boolean;
  webhookUrl: string;
  phoneNumbers: number;
}> {
  const phoneNumbers = await listPhoneNumbers();

  return {
    apiKeySet: !!VAPI_API_KEY,
    webhookUrl: WEBHOOK_URL,
    phoneNumbers: phoneNumbers.length,
  };
}