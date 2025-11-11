"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone, Clock, DollarSign, MessageSquare, Globe, TrendingUp } from "lucide-react";

interface CallLog {
  id: string;
  call_id: string;
  customer_number: string;
  customer_name?: string;
  started_at: string;
  ended_at: string;
  duration_minutes: number;
  duration_seconds: number;
  cost_total: number;
  status: string;
  language: string;
  summary?: string;
  transcript?: string;
  recording_url?: string;
  ended_reason?: string;
  model_latency_avg?: number;
  voice_latency_avg?: number;
  turn_latency_avg?: number;
  llm_prompt_tokens?: number;
  llm_completion_tokens?: number;
  tts_characters?: number;
  message_count: number;
}

interface DailyStat {
  date: string;
  total_calls: number;
  total_duration_minutes: number;
  total_cost: number;
  avg_duration_seconds: number;
  avg_cost: number;
}

export function CallLogsDashboard() {
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [stats, setStats] = useState<DailyStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const limit = 20;

  // Fetch call logs
  const fetchCalls = async (pageNum: number) => {
    try {
      setLoading(true);
      const offset = pageNum * limit;
      const response = await fetch(`/api/call-logs?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      
      if (data.calls) {
        setCalls(data.calls);
        setHasMore(data.pagination.hasMore);
      }
    } catch (error) {
      console.error("Error fetching call logs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch daily stats
  const fetchStats = async () => {
    try {
      const response = await fetch("/api/call-logs?stats=true&daysBack=7");
      const data = await response.json();
      
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchCalls(page);
    fetchStats();
  }, [page]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get language flag
  const getLanguageFlag = (lang: string) => {
    return lang.includes("ar") ? "🇸🇦" : "🇺🇸";
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "failed":
        return "bg-red-500";
      case "busy":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Calculate total stats
  const totalStats = stats.reduce(
    (acc, stat) => ({
      calls: acc.calls + Number(stat.total_calls),
      duration: acc.duration + Number(stat.total_duration_minutes),
      cost: acc.cost + Number(stat.total_cost),
    }),
    { calls: 0, duration: 0, cost: 0 }
  );

  if (loading && calls.length === 0) {
    return (
      <Card className="w-full max-w-6xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 mb-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Calls (7d)</p>
                <p className="text-2xl font-bold">{totalStats.calls}</p>
              </div>
              <Phone className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Duration</p>
                <p className="text-2xl font-bold">{totalStats.duration.toFixed(1)}m</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold">${totalStats.cost.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Duration</p>
                <p className="text-2xl font-bold">
                  {totalStats.calls > 0
                    ? ((totalStats.duration / totalStats.calls) * 60).toFixed(0)
                    : 0}s
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Recent Calls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Lang</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Messages</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500">
                    No calls yet. Make a test call to +1 (510) 370 5981
                  </TableCell>
                </TableRow>
              ) : (
                calls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-mono text-sm">
                      {call.customer_number || "Unknown"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(call.started_at)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {formatDuration(call.duration_seconds)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      ${call.cost_total.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <span className="text-lg">{getLanguageFlag(call.language)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(call.status)}>
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{call.message_count}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCall(call)}
                          >
                            View
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Call Details</SheetTitle>
                            <SheetDescription>
                              {call.customer_number} • {formatDate(call.started_at)}
                            </SheetDescription>
                          </SheetHeader>
                          <div className="space-y-6 mt-6">
                            {/* Call Info */}
                            <div className="space-y-2">
                              <h3 className="font-semibold">Call Information</h3>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Duration:</span>{" "}
                                  {formatDuration(call.duration_seconds)}
                                </div>
                                <div>
                                  <span className="text-gray-600">Cost:</span> $
                                  {call.cost_total.toFixed(4)}
                                </div>
                                <div>
                                  <span className="text-gray-600">Language:</span>{" "}
                                  {call.language}
                                </div>
                                <div>
                                  <span className="text-gray-600">Status:</span>{" "}
                                  {call.status}
                                </div>
                              </div>
                            </div>

                            {/* Performance Metrics */}
                            {call.model_latency_avg && (
                              <div className="space-y-2">
                                <h3 className="font-semibold">Performance</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">Model:</span>{" "}
                                    {call.model_latency_avg}ms
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Voice:</span>{" "}
                                    {call.voice_latency_avg}ms
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Turn:</span>{" "}
                                    {call.turn_latency_avg}ms
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Token Usage */}
                            {call.llm_prompt_tokens && (
                              <div className="space-y-2">
                                <h3 className="font-semibold">Token Usage</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">Prompt:</span>{" "}
                                    {call.llm_prompt_tokens.toLocaleString()}
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Completion:</span>{" "}
                                    {call.llm_completion_tokens?.toLocaleString() || 0}
                                  </div>
                                  <div>
                                    <span className="text-gray-600">TTS Chars:</span>{" "}
                                    {call.tts_characters?.toLocaleString() || 0}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Summary */}
                            {call.summary && (
                              <div className="space-y-2">
                                <h3 className="font-semibold">Summary</h3>
                                <p className="text-sm text-gray-700">{call.summary}</p>
                              </div>
                            )}

                            {/* Transcript */}
                            {call.transcript && (
                              <div className="space-y-2">
                                <h3 className="font-semibold">Transcript</h3>
                                <div className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                                  {call.transcript}
                                </div>
                              </div>
                            )}

                            {/* Recording */}
                            {call.recording_url && (
                              <div className="space-y-2">
                                <h3 className="font-semibold">Recording</h3>
                                <audio controls className="w-full">
                                  <source src={call.recording_url} type="audio/wav" />
                                  Your browser does not support audio playback.
                                </audio>
                              </div>
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">Page {page + 1}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={!hasMore}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}