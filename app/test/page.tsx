import { ChatInterface } from "@/components/chat-interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <Card className="mb-6 border-yellow-500 bg-yellow-50 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-5 h-5" />
            Internal Testing Only
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-800">
            This interface is for developer testing and prototyping only. 
            <strong> Customers do not use this page.</strong> Instead, customers call the phone system at{" "}
            <strong>+1 (510) 370 5981</strong> to speak with the AI agent.
          </p>
          <p className="text-sm text-yellow-800 mt-2">
            This chat interface was used to develop and test the AI engine before the live phone system was deployed.
          </p>
        </CardContent>
      </Card>
      <ChatInterface />
    </div>
  );
}
