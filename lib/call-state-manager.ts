/**
 * Call State Manager
 * Manages conversation state for VAPI calls
 * Production version uses Redis for distributed systems
 * Development version uses in-memory Map
 */

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface CallState {
  callId: string;
  language: string;
  messages: ConversationMessage[];
  startTime: number;
  lastUpdated: number;
  metadata?: Record<string, unknown>;
}

/**
 * In-memory call state store (development/testing)
 * In production, replace with Redis
 */
class InMemoryCallStateStore {
  private store = new Map<string, CallState>();
  private ttlMs = 3600000; // 1 hour TTL

  set(callId: string, state: CallState): void {
    this.store.set(callId, state);
    // Schedule cleanup after TTL
    setTimeout(() => this.delete(callId), this.ttlMs);
  }

  get(callId: string): CallState | null {
    return this.store.get(callId) || null;
  }

  delete(callId: string): void {
    this.store.delete(callId);
  }

  has(callId: string): boolean {
    return this.store.has(callId);
  }

  clear(): void {
    this.store.clear();
  }

  getSize(): number {
    return this.store.size;
  }
}

// Singleton instance
const inMemoryStore = new InMemoryCallStateStore();

/**
 * Initialize a new call
 */
export function initializeCall(
  callId: string,
  language: string,
  metadata?: Record<string, unknown>
): CallState {
  const state: CallState = {
    callId,
    language,
    messages: [],
    startTime: Date.now(),
    lastUpdated: Date.now(),
    metadata,
  };
  inMemoryStore.set(callId, state);
  return state;
}

/**
 * Get call state
 */
export function getCallState(callId: string): CallState | null {
  return inMemoryStore.get(callId);
}

/**
 * Add message to call conversation
 */
export function addMessage(
  callId: string,
  role: "user" | "assistant",
  content: string
): CallState | null {
  const state = inMemoryStore.get(callId);
  if (!state) return null;

  state.messages.push({
    role,
    content,
    timestamp: Date.now(),
  });

  state.lastUpdated = Date.now();
  return state;
}

/**
 * Get conversation history for a call
 */
export function getConversationHistory(callId: string): ConversationMessage[] {
  const state = inMemoryStore.get(callId);
  return state?.messages || [];
}

/**
 * Clear conversation history (keep call state)
 */
export function clearConversationHistory(callId: string): boolean {
  const state = inMemoryStore.get(callId);
  if (!state) return false;

  state.messages = [];
  state.lastUpdated = Date.now();
  return true;
}

/**
 * End call and cleanup
 */
export function endCall(callId: string): void {
  inMemoryStore.delete(callId);
}

/**
 * Get all active calls (for monitoring)
 */
export function getActiveCalls(): string[] {
  const calls: string[] = [];
  inMemoryStore.getSize();
  // In a real implementation, iterate over store
  return calls;
}

/**
 * Get store size
 */
export function getStoreSize(): number {
  return inMemoryStore.getSize();
}

/**
 * Clear all calls (for testing/reset)
 */
export function clearAllCalls(): void {
  inMemoryStore.clear();
}