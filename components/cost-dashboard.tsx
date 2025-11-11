"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { costMonitor, UsageMetrics } from "@/lib/cost-monitor";

interface VAPICosts {
  total: number;
  calls: number;
}

export function CostDashboard() {
  const [costs, setCosts] = useState({
    gemini: 0,
    stt: 0,
    tts: 0,
    total: 0,
  });
  const [vapiCosts, setVapiCosts] = useState<VAPICosts>({ total: 0, calls: 0 });
  const [usage, setUsage] = useState<UsageMetrics | null>(null);
  const [mounted, setMounted] = useState(false);

  // Fetch VAPI costs from database
  const fetchVAPICosts = async () => {
    try {
      const response = await fetch("/api/call-logs?stats=true&daysBack=1");
      const data = await response.json();
      
      if (data.stats && data.stats.length > 0) {
        const today = data.stats[0];
        setVapiCosts({
          total: Number(today.total_cost) || 0,
          calls: Number(today.total_calls) || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching VAPI costs:", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setMounted(true);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!mounted) return;

    const metric = costMonitor.getTodayMetrics();
    const calculatedCosts = costMonitor.calculateCosts(metric);
    setCosts(calculatedCosts);
    setUsage(metric);
    fetchVAPICosts();

    // Refresh every 5 seconds to show real-time updates
    const interval = setInterval(() => {
      const updated = costMonitor.getTodayMetrics();
      const updatedCosts = costMonitor.calculateCosts(updated);
      setCosts(updatedCosts);
      setUsage(updated);
      fetchVAPICosts();
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  const combinedTotal = costs.total + vapiCosts.total;

  return (
    <Card className="w-full max-w-md mx-auto mb-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          💰 Today&apos;s Costs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs text-gray-600 font-medium">
          {usage && new Date(usage.timestamp).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>

        {/* Web Chat Costs */}
        <div>
          <div className="text-xs font-semibold text-gray-600 mb-2">💬 Web Chat</div>
          <div className="space-y-2 ml-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">
                🤖 Gemini <span className="text-xs text-gray-500">({usage?.geminiTokens.toLocaleString() || 0} tokens)</span>
              </span>
              <span className="font-mono font-semibold text-amber-700">${costs.gemini.toFixed(4)}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">
                🎤 STT <span className="text-xs text-gray-500">({usage?.sttMinutes.toFixed(1) || 0} min)</span>
              </span>
              <span className="font-mono font-semibold text-amber-700">${costs.stt.toFixed(4)}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">
                🔊 TTS <span className="text-xs text-gray-500">({usage?.ttsCharacters.toLocaleString() || 0} chars)</span>
              </span>
              <span className="font-mono font-semibold text-amber-700">${costs.tts.toFixed(4)}</span>
            </div>

            <div className="flex justify-between items-center text-sm border-t border-amber-200 pt-2">
              <span className="text-gray-700 font-medium">Web Chat Subtotal</span>
              <span className="font-mono font-semibold text-amber-700">${costs.total.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* VAPI Phone Costs */}
        <div className="border-t border-amber-200 pt-2">
          <div className="text-xs font-semibold text-gray-600 mb-2">📞 Phone Calls (VAPI)</div>
          <div className="space-y-2 ml-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-700">
                Total Calls <span className="text-xs text-gray-500">({vapiCosts.calls} calls)</span>
              </span>
              <span className="font-mono font-semibold text-amber-700">${vapiCosts.total.toFixed(4)}</span>
            </div>
          </div>
        </div>

        {/* Combined Total */}
        <div className="border-t border-amber-200 pt-3 flex justify-between items-center font-bold bg-amber-100/50 px-3 py-2 rounded">
          <span className="text-gray-800">Total Today</span>
          <span className={`font-mono text-lg ${
            combinedTotal > 1 ? 'text-red-600' :
            combinedTotal > 0.50 ? 'text-orange-600' :
            'text-green-600'
          }`}>
            ${combinedTotal.toFixed(4)}
          </span>
        </div>

        {combinedTotal > 1 && (
          <div className="bg-red-50 border border-red-200 rounded px-2 py-1 text-xs text-red-700">
            ⚠️ High cost detected. Current rate: ~${(combinedTotal * 30).toFixed(0)}/month
          </div>
        )}
      </CardContent>
    </Card>
  );
}