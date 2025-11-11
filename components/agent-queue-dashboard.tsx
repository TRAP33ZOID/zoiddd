"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, User, PhoneCall, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentQueueData, AgentUser, CallEscalation } from "@/app/api/agents/route";
import { formatDistanceToNow } from "date-fns";

/**
 * Helper to format agent status badge
 */
const AgentStatusBadge = ({ status }: { status: AgentUser['status'] }) => {
  let colorClass = "bg-gray-500";
  let text = "Offline";

  switch (status) {
    case 'available':
      colorClass = "bg-green-500 hover:bg-green-600";
      text = "Available";
      break;
    case 'busy':
      colorClass = "bg-yellow-500 hover:bg-yellow-600";
      text = "Busy (On Call)";
      break;
    case 'offline':
    default:
      colorClass = "bg-gray-500 hover:bg-gray-600";
      text = "Offline";
      break;
  }

  return <Badge className={colorClass}>{text}</Badge>;
};

/**
 * Agent Queue Dashboard Component
 * Displays human agent status and active call escalations.
 */
export function AgentQueueDashboard() {
  const [data, setData] = useState<AgentQueueData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/agents");
      if (!response.ok) {
        throw new Error("Failed to fetch agent data");
      }
      const result: AgentQueueData = await response.json();
      setData(result);
    } catch (e) {
      setError("Could not load agent queue data.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // Refresh every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const availableAgents = data?.agents.filter(a => a.status === 'available').length || 0;
  const totalAgents = data?.agents.length || 0;
  const queueSize = data?.escalations.length || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <PhoneCall className="w-6 h-6" /> Human Handoff System
          </CardTitle>
          <Button onClick={fetchData} variant="outline" size="icon" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 border rounded-lg">
              <p className="text-3xl font-extrabold text-green-600">{availableAgents}</p>
              <p className="text-sm text-muted-foreground">Agents Available</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-3xl font-extrabold text-blue-600">{totalAgents}</p>
              <p className="text-sm text-muted-foreground">Total Agents</p>
            </div>
            <div className={`p-4 border rounded-lg ${queueSize > 0 ? 'border-red-500 bg-red-50' : ''}`}>
              <p className={`text-3xl font-extrabold ${queueSize > 0 ? 'text-red-600' : 'text-gray-600'}`}>{queueSize}</p>
              <p className="text-sm text-muted-foreground">Calls in Queue</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Status Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Agent Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    {agent.name}
                  </TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>{agent.phone_number}</TableCell>
                  <TableCell>
                    <AgentStatusBadge status={agent.status} />
                  </TableCell>
                </TableRow>
              ))}
              {isLoading && data?.agents.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">Loading agents...</TableCell></TableRow>
              )}
              {!isLoading && data?.agents.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No agents configured.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Escalation Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" /> Escalation Queue ({queueSize} Active)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Call ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Time in Queue</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.escalations.map((escalation) => (
                <TableRow key={escalation.id} className={escalation.agent_id ? "bg-yellow-50" : ""}>
                  <TableCell className="font-mono text-xs">{escalation.call_id.substring(0, 10)}...</TableCell>
                  <TableCell>{escalation.customer_number}</TableCell>
                  <TableCell>{escalation.reason}</TableCell>
                  <TableCell className={escalation.confidence_score < 0.6 ? "text-red-500 font-medium" : ""}>
                    {(escalation.confidence_score * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell>
                    <Clock className="w-4 h-4 inline mr-1" />
                    {formatDistanceToNow(new Date(escalation.escalated_at), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm" disabled={!!escalation.agent_id}>
                      {escalation.agent_id ? "In Progress" : "Assign Agent"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {isLoading && data?.escalations.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Loading queue...</TableCell></TableRow>
              )}
              {!isLoading && data?.escalations.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">Queue is empty. All clear!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}