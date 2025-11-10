"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { costMonitor, UsageMetrics } from "@/lib/cost-monitor";

export function CostDashboard() {
  const [costs, setCosts] = useState({
    gemini: 0,
    stt: 0,
    tts: 0,
    total: 0,
  });
  const [usage, setUsage] = useState<UsageMetrics | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const metric = costMonitor.getTodayMetrics();
    const calculatedCosts = costMonitor.calculateCosts(metric);
    setCosts(calculatedCosts);
    setUsage(metric);

    // Refresh every 5 seconds to show real-time updates
    const interval = setInterval(() => {
      const updated = costMonitor.getTodayMetrics();
      const updatedCosts = costMonitor.calculateCosts(updated);
      setCosts(updatedCosts);
      setUsage(updated);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          💰 Today's API Costs
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

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              🤖 Gemini <span className="text-xs text-gray-500">({usage?.geminiTokens.toLocaleString() || 0} tokens)</span>
            </span>
            <span className="font-mono font-semibold text-amber-700">${costs.gemini.toFixed(4)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              🎤 Speech-to-Text <span className="text-xs text-gray-500">({usage?.sttMinutes.toFixed(1) || 0} min)</span>
            </span>
            <span className="font-mono font-semibold text-amber-700">${costs.stt.toFixed(4)}</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">
              🔊 Text-to-Speech <span className="text-xs text-gray-500">({usage?.ttsCharacters.toLocaleString() || 0} chars)</span>
            </span>
            <span className="font-mono font-semibold text-amber-700">${costs.tts.toFixed(4)}</span>
          </div>
        </div>

        <div className="border-t border-amber-200 pt-3 flex justify-between items-center font-bold bg-amber-100/50 px-3 py-2 rounded">
          <span className="text-gray-800">Total Today</span>
          <span className={`font-mono text-lg ${
            costs.total > 1 ? 'text-red-600' : 
            costs.total > 0.50 ? 'text-orange-600' : 
            'text-green-600'
          }`}>
            ${costs.total.toFixed(4)}
          </span>
        </div>

        {costs.total > 1 && (
          <div className="bg-red-50 border border-red-200 rounded px-2 py-1 text-xs text-red-700">
            ⚠️ High cost detected. Current rate: ~${(costs.total * 30).toFixed(0)}/month
          </div>
        )}
      </CardContent>
    </Card>
  );
}