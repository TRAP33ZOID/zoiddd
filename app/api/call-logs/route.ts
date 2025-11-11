import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * Call Logs API - Fetch and query VAPI call logs
 * 
 * GET /api/call-logs - List all calls with pagination
 * GET /api/call-logs?limit=20&offset=0&language=en-US
 * 
 * Returns call logs with message counts and full details
 */

interface CallLog {
  id: string;
  call_id: string;
  customer_number: string;
  started_at: string;
  duration_minutes: number;
  cost_total: number;
  status: string;
  language: string;
  message_count: number;
}

interface DailyStats {
  date: string;
  total_calls: number;
  total_duration_minutes: number;
  total_cost: number;
  avg_duration_seconds: number;
  avg_cost: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Parse query parameters
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const language = searchParams.get("language");
    const statsOnly = searchParams.get("stats") === "true";
    const daysBack = parseInt(searchParams.get("daysBack") || "7");
    
    // If stats only, return aggregated data
    if (statsOnly) {
      const { data: stats, error } = await supabase
        .rpc("get_daily_call_stats", { days_back: daysBack });
      
      if (error) {
        console.error("Error fetching daily stats:", error);
        return NextResponse.json(
          { error: "Failed to fetch stats", details: error.message },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        stats: stats as DailyStats[],
        daysBack,
      });
    }
    
    // Build query with filters
    let query = supabase
      .from("vapi_call_logs")
      .select(`
        id,
        call_id,
        customer_number,
        customer_name,
        started_at,
        ended_at,
        duration_minutes,
        duration_seconds,
        cost_total,
        status,
        language,
        summary,
        transcript,
        recording_url,
        ended_reason,
        model_latency_avg,
        voice_latency_avg,
        turn_latency_avg,
        llm_prompt_tokens,
        llm_completion_tokens,
        tts_characters
      `)
      .order("started_at", { ascending: false })
      .range(offset, offset + limit - 1);
    
    // Apply language filter if specified
    if (language) {
      query = query.eq("language", language);
    }
    
    const { data: calls, error: callsError } = await query;
    
    if (callsError) {
      console.error("Error fetching call logs:", callsError);
      return NextResponse.json(
        { error: "Failed to fetch call logs", details: callsError.message },
        { status: 500 }
      );
    }
    
    // Get message counts for each call
    const callIds = calls.map(c => c.id);
    const { data: messageCounts, error: countError } = await supabase
      .from("vapi_call_messages")
      .select("call_log_id")
      .in("call_log_id", callIds);
    
    if (countError) {
      console.error("Error fetching message counts:", countError);
      // Continue without message counts
    }
    
    // Count messages per call
    const messageCountMap = new Map<string, number>();
    if (messageCounts) {
      messageCounts.forEach((msg) => {
        const count = messageCountMap.get(msg.call_log_id) || 0;
        messageCountMap.set(msg.call_log_id, count + 1);
      });
    }
    
    // Attach message counts to calls
    const callsWithCounts = calls.map(call => ({
      ...call,
      message_count: messageCountMap.get(call.id) || 0,
    }));
    
    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from("vapi_call_logs")
      .select("*", { count: "exact", head: true });
    
    return NextResponse.json({
      calls: callsWithCounts,
      pagination: {
        limit,
        offset,
        total: totalCount || 0,
        hasMore: (offset + limit) < (totalCount || 0),
      },
    });
    
  } catch (error) {
    console.error("Call logs API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}