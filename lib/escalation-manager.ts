/**
 * lib/escalation-manager.ts
 * 
 * Manages the logic for determining if a call needs to be escalated to a human agent,
 * and handles the process of initiating the handoff.
 */

import { supabase } from "@/lib/supabase";
import { CallState, getCallState } from "@/lib/call-state-manager";
import { requiresEscalationByConfidence } from "@/lib/confidence-scorer";
import { transferCall } from "@/lib/vapi-client";

// --- Configuration ---
const CONFIDENCE_THRESHOLD = 0.6;
const LOW_CONFIDENCE_TURN_LIMIT = 3;
const MAX_CALL_DURATION_SECONDS = 600; // 10 minutes
const ESCALATION_KEYWORDS = [
  "talk to a human",
  "speak to manager",
  "speak to a supervisor",
  "human agent",
  "transfer me",
];

// --- Types ---

export interface EscalationTrigger {
  reason: string;
  confidenceScore?: number;
}

// --- Core Logic ---

/**
 * Checks if the latest user message contains explicit escalation keywords.
 * @param message The latest user message content.
 * @returns EscalationTrigger if triggered, otherwise null.
 */
function checkKeywordTrigger(message: string): EscalationTrigger | null {
  const lowerCaseMessage = message.toLowerCase();
  for (const keyword of ESCALATION_KEYWORDS) {
    if (lowerCaseMessage.includes(keyword)) {
      return { reason: `User explicitly requested to ${keyword}` };
    }
  }
  return null;
}

/**
 * Checks if the call state meets any non-keyword escalation criteria.
 * @param state The current CallState.
 * @returns EscalationTrigger if triggered, otherwise null.
 */
function checkStateTriggers(state: CallState): EscalationTrigger | null {
  const durationSeconds = (Date.now() - state.startTime) / 1000;

  // 1. Call duration limit
  if (durationSeconds > MAX_CALL_DURATION_SECONDS) {
    return { reason: `Call duration exceeded ${MAX_CALL_DURATION_SECONDS / 60} minutes` };
  }

  // 2. Multiple low confidence responses (requires metadata tracking, simplified here)
  // NOTE: In a real system, CallState should track confidence scores per assistant message.
  // For now, we rely on the latest confidence score check in the main function.
  
  // 3. Profanity/escalation keywords (handled by checkKeywordTrigger)

  return null;
}

/**
 * Determines if a call should be escalated based on the latest turn.
 * @param callId The ID of the active call.
 * @param latestUserMessage The latest user message content.
 * @param latestConfidenceScore The confidence score of the AI's last response.
 * @returns EscalationTrigger if escalation is required, otherwise null.
 */
export function checkEscalationRequired(
  callId: string,
  latestUserMessage: string,
  latestConfidenceScore: number
): EscalationTrigger | null {
  const state = getCallState(callId);
  if (!state) return { reason: "Call state not found" };

  // 1. Check for explicit keywords
  const keywordTrigger = checkKeywordTrigger(latestUserMessage);
  if (keywordTrigger) return keywordTrigger;

  // 2. Check for low confidence score
  if (requiresEscalationByConfidence(latestConfidenceScore, CONFIDENCE_THRESHOLD)) {
    return { 
      reason: `AI confidence score (${latestConfidenceScore.toFixed(2)}) is below threshold (${CONFIDENCE_THRESHOLD})`,
      confidenceScore: latestConfidenceScore
    };
  }

  // 3. Check for state-based triggers (e.g., duration)
  const stateTrigger = checkStateTriggers(state);
  if (stateTrigger) return stateTrigger;

  return null;
}

/**
 * Finds the next available human agent from the database.
 * @returns The agent's phone number and ID, or null if none available.
 */
async function findAvailableAgent(): Promise<{ agentId: string; phoneNumber: string } | null> {
  const { data, error } = await supabase
    .from("agent_users")
    .select("id, phone_number")
    .eq("status", "available")
    .limit(1)
    .single();

  if (error || !data) {
    console.error("No available agents found or DB error:", error);
    return null;
  }

  return { agentId: data.id, phoneNumber: data.phone_number };
}

/**
 * Initiates the call escalation process: logs to DB, notifies agent, and transfers call.
 * @param callId The ID of the VAPI call.
 * @param trigger The reason for escalation.
 * @returns True if transfer was initiated successfully, false otherwise.
 */
export async function escalateCall(callId: string, trigger: EscalationTrigger): Promise<boolean> {
  console.log(`🚨 Escalating call ${callId}. Reason: ${trigger.reason}`);

  // 1. Find an available agent
  const agent = await findAvailableAgent();
  if (!agent) {
    console.warn(`❌ Cannot escalate call ${callId}: No agents available.`);
    // In a real system, we would queue the call or play a message.
    return false;
  }

  // 2. Log escalation to database
  const { error: dbError } = await supabase.from("call_escalations").insert({
    call_id: callId,
    reason: trigger.reason,
    confidence_score: trigger.confidenceScore,
    agent_id: agent.agentId,
  });

  if (dbError) {
    console.error("❌ Failed to log escalation to DB:", dbError);
    // Continue attempt to transfer call despite logging failure
  }

  // 3. Notify agent (Placeholder - actual implementation in lib/notification-service.ts)
  // await notifyAgent(agent.agentId, callId, trigger.reason);
  console.log(`🔔 Agent ${agent.agentId} notified of incoming call.`);

  // 4. Transfer call via VAPI API
  const transferSuccess = await transferCall(callId, agent.phoneNumber);

  if (transferSuccess) {
    console.log(`✅ Call ${callId} successfully transferred to agent ${agent.agentId}.`);
  } else {
    console.error(`❌ Failed to transfer call ${callId} via VAPI.`);
  }

  return transferSuccess;
}