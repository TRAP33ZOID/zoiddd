import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface CallLog {
  duration_seconds: number;
  status: string;
  turn_latency_avg: number | null;
  started_at?: string;
  created_at?: string;
}

export async function GET() {
  try {

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch today's calls
    const { data: calls, error } = await supabase
      .from("vapi_call_logs")
      .select("duration_seconds, status, turn_latency_avg");

    if (error) throw error;

    // Filter for today's calls
    const today_calls = (calls || []).filter((call: CallLog) => {
      const callDate = new Date(call.started_at || call.created_at || new Date());
      callDate.setHours(0, 0, 0, 0);
      return callDate.getTime() === today.getTime();
    });

    // Calculate metrics
    const callsToday = today_calls.length;
    const successfulCalls = today_calls.filter(
      (c: CallLog) => c.status === "completed"
    ).length;
    const successRate =
      callsToday > 0 ? (successfulCalls / callsToday) * 100 : 0;
    const avgLatency =
      callsToday > 0
        ? today_calls.reduce(
            (sum: number, c: CallLog) => sum + (c.turn_latency_avg || 0),
            0
          ) / callsToday
        : 0;

    // Determine status
    const status =
      successRate < 90
        ? ("degraded" as const)
        : avgLatency > 500
          ? ("degraded" as const)
          : ("operational" as const);

    return NextResponse.json({
      status,
      callsToday,
      avgLatency: Math.round(avgLatency),
      successRate: Math.round(successRate),
      phoneNumber: "+1 (510) 370 5981",
      lastChecked: new Date().toISOString(),
    });
  } catch (error) {
    console.error("System status error:", error);
    return NextResponse.json(
      {
        status: "down",
        error: "Failed to fetch system status",
      },
      { status: 500 }
    );
  }
}
