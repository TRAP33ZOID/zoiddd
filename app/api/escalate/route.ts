/**
 * app/api/escalate/route.ts
 * 
 * API endpoint for initiating a human handoff/call escalation.
 * This endpoint is typically called internally by the VAPI webhook handler
 * when an escalation trigger is detected (e.g., low confidence, user request).
 */

import { NextResponse } from "next/server";
import { escalateCall, EscalationTrigger } from "@/lib/escalation-manager";

export async function POST(request: Request) {
  try {
    const { callId, reason, confidenceScore } = (await request.json()) as {
      callId: string;
      reason: string;
      confidenceScore?: number;
    };

    if (!callId || !reason) {
      return NextResponse.json(
        { error: "Missing required fields: callId and reason" },
        { status: 400 }
      );
    }

    const trigger: EscalationTrigger = { reason, confidenceScore };

    const success = await escalateCall(callId, trigger);

    if (success) {
      return NextResponse.json(
        { message: "Call escalation initiated successfully", callId },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Escalation failed (e.g., no available agents or VAPI transfer error)",
          callId,
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error in /api/escalate:", error);
    return NextResponse.json(
      { error: "Internal Server Error during escalation" },
      { status: 500 }
    );
  }
}