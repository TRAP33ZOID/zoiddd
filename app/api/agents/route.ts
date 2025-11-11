/**
 * app/api/agents/route.ts
 * 
 * API endpoint to fetch human agent status and the queue of escalated calls.
 */

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export interface AgentUser {
  id: string;
  name: string;
  email: string;
  status: 'available' | 'busy' | 'offline';
  phone_number: string;
}

export interface CallEscalation {
  id: string;
  call_id: string;
  reason: string;
  confidence_score: number;
  escalated_at: string;
  agent_id: string | null;
  resolution_notes: string | null;
  customer_number: string; // Joined from vapi_call_logs
}

export interface AgentQueueData {
  agents: AgentUser[];
  escalations: CallEscalation[];
}

export async function GET() {
  try {
    // 1. Fetch Agent Users
    const { data: agents, error: agentError } = await supabase
      .from("agent_users")
      .select("id, name, email, status, phone_number")
      .order("status", { ascending: false }); // Show available agents first

    if (agentError) throw agentError;

    // 2. Fetch Active Call Escalations (unresolved)
    const { data: escalations, error: escalationError } = await supabase
      .from("call_escalations")
      .select(`
        id,
        call_id,
        reason,
        confidence_score,
        escalated_at,
        agent_id,
        resolution_notes,
        vapi_call_logs (customer_number)
      `)
      .is("resolved_at", null) // Only show active/unresolved escalations
      .order("escalated_at", { ascending: true }); // Oldest escalations first

    if (escalationError) throw escalationError;

    // Map and flatten the data structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedEscalations: CallEscalation[] = (escalations as any[]).map((e) => ({
      id: e.id,
      call_id: e.call_id,
      reason: e.reason,
      confidence_score: e.confidence_score,
      escalated_at: e.escalated_at,
      agent_id: e.agent_id,
      resolution_notes: e.resolution_notes,
      // Supabase join returns the joined table data under the table name
      customer_number: e.vapi_call_logs?.customer_number || 'N/A',
    }));

    return NextResponse.json({
      agents: agents as AgentUser[],
      escalations: formattedEscalations,
    } as AgentQueueData);

  } catch (error) {
    console.error("Error fetching agent queue data:", error);
    return NextResponse.json(
      { error: "Failed to fetch agent queue data" },
      { status: 500 }
    );
  }
}