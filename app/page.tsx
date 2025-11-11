import { AppSidebar } from "@/components/app-sidebar"
import { IngestionForm } from "@/components/ingestion-form"
import { DocumentList } from "@/components/document-list"
import { CostDashboard } from "@/components/cost-dashboard"
import { CallLogsDashboard } from "@/components/call-logs-dashboard"
import { SystemStatusCard } from "@/components/system-status-card"
import { AgentQueueDashboard } from "@/components/agent-queue-dashboard"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col items-center p-4 overflow-y-auto">
          <div className="w-full max-w-7xl space-y-6">
            <h1 className="text-4xl font-bold">Phone Agent Admin Dashboard</h1>
            <SystemStatusCard />
            <AgentQueueDashboard />
            <CallLogsDashboard />
            <CostDashboard />
            <DocumentList />
            <IngestionForm />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
