/**
 * lib/notification-service.ts
 * 
 * Service for sending notifications to human agents upon call escalation.
 * This is a mock implementation. In production, this would integrate with
 * services like Twilio (for SMS) or Slack/Teams (for chat alerts).
 */

interface NotificationDetails {
  agentId: string;
  callId: string;
  reason: string;
  customerNumber: string;
}

/**
 * Sends a notification to the specified agent about an incoming escalated call.
 * @param details The details of the escalated call and target agent.
 * @returns A promise that resolves when the notification attempt is complete.
 */
export async function notifyAgent(details: NotificationDetails): Promise<boolean> {
  console.log("========================================");
  console.log("🔔 [NOTIFICATION SERVICE] Alert Sent");
  console.log(`Agent ID: ${details.agentId}`);
  console.log(`Call ID: ${details.callId}`);
  console.log(`Customer: ${details.customerNumber}`);
  console.log(`Reason: ${details.reason}`);
  console.log("----------------------------------------");
  console.log("MOCK: Notification sent via SMS/Slack.");
  console.log("========================================");

  // MOCK IMPLEMENTATION: Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 50));

  // In a real implementation:
  // 1. Look up agent contact info (phone/slack ID) using agentId
  // 2. Call Twilio/Slack API to send message
  
  return true; // Assume success for mock
}

/**
 * Sends a notification to all available agents.
 * @param callId The ID of the escalated call.
 * @param reason The reason for escalation.
 * @returns A promise that resolves when all notification attempts are complete.
 */
export async function notifyAllAvailableAgents(callId: string, reason: string): Promise<boolean> {
  // NOTE: The escalation manager currently finds a single agent and transfers the call.
  // This function is reserved for future queue management where multiple agents might be alerted.
  console.log(`[NOTIFICATION SERVICE] Attempting to notify all available agents for call ${callId}. Reason: ${reason}`);
  return true;
}