import { ChatInterface } from "@/components/chat-interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestDemoPage() {
  return (
    <div className="container mx-auto p-8">
      <Card className="mb-6 border-yellow-500 bg-yellow-50 border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-5 h-5" />
            Internal Testing Only (Demo Mode)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-800">
            This interface is for developer testing and prototyping only. 
            <strong> Customers do not use this page.</strong> Instead, customers call the phone system at{" "}
            <strong>+1 (510) 370 5981</strong> to speak with the AI agent.
          </p>
          <p className="text-sm text-yellow-800 mt-2">
            This page is configured to load with demo data or specific test scenarios.
          </p>
          <div className="mt-4 flex space-x-2">
            <Button variant="secondary" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Quick Test: English
            </Button>
            <Button variant="secondary" size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Quick Test: Arabic
            </Button>
          </div>
        </CardContent>
      </Card>
      <ChatInterface />
    </div>
  );
}