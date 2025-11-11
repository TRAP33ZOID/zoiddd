import { AppSidebar } from "@/components/app-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import { IngestionForm } from "@/components/ingestion-form"
import { DocumentList } from "@/components/document-list"
import { CostDashboard } from "@/components/cost-dashboard"
import { CallLogsDashboard } from "@/components/call-logs-dashboard"
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
          <IngestionForm />
          <DocumentList />
          <CostDashboard />
          <CallLogsDashboard />
          <ChatInterface />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
