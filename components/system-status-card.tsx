"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Activity, Clock, CheckCircle, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface SystemStats {
  status: "operational" | "degraded" | "down";
  callsToday: number;
  avgLatency: number;
  successRate: number;
  phoneNumber: string;
  lastChecked: string;
}

export function SystemStatusCard() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/system-status");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch system status:", error);
      setStats({
        status: "down",
        callsToday: 0,
        avgLatency: 0,
        successRate: 0,
        phoneNumber: "+1 (510) 370 5981",
        lastChecked: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  const statusColor =
    stats.status === "operational"
      ? "bg-green-100 text-green-800"
      : stats.status === "degraded"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";

  const statusIcon =
    stats.status === "operational"
      ? "🟢"
      : stats.status === "degraded"
        ? "🟡"
        : "🔴";

  const statusLabel =
    stats.status === "operational"
      ? "Operational"
      : stats.status === "degraded"
        ? "Degraded"
        : "Down";

  return (
    <Card className="mb-6 border-2 border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Phone Agent Status
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchStats}
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Phone Number */}
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Customer Support Line</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.phoneNumber}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Status Card */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600 font-medium">Status</p>
              </div>
              <Badge className={`${statusColor} px-2 py-1`}>
                {statusIcon} {statusLabel}
              </Badge>
            </div>

            {/* Calls Today */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600 font-medium">Calls Today</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.callsToday}
              </p>
            </div>

            {/* Avg Latency */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600 font-medium">Avg Latency</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.avgLatency}
                <span className="text-xs ml-1">ms</span>
              </p>
            </div>

            {/* Success Rate */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-gray-600" />
                <p className="text-xs text-gray-600 font-medium">Success</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.successRate}
                <span className="text-xs ml-1">%</span>
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <p className="text-xs text-gray-500 text-center">
            Last updated: {new Date(stats.lastChecked).toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
