"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function IngestionForm() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !filename.trim() || isLoading) {
      setStatus("Please provide both text content and a filename.");
      return;
    }

    setIsLoading(true);
    setStatus("Ingesting document... This may take a moment.");

    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, filename }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(`Ingestion Failed: ${data.error || "Unknown error."}`);
      } else {
        setStatus(`Ingestion Successful! ${data.count} chunks processed.`);
        setText("");
        setFilename("");
      }
    } catch (error) {
      console.error("Ingestion Error:", error);
      setStatus("Network Error: Could not reach the ingestion API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto mb-8">
      <CardHeader>
        <CardTitle>Knowledge Base Ingestion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleIngest} className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Document Filename (e.g., manual.txt)"
            value={filename}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilename(e.target.value)}
            disabled={isLoading}
            required
          />
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Paste document content here..."
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            disabled={isLoading}
            rows={10}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Ingest Document"}
          </Button>
        </form>
        {status && (
          <p className={`mt-4 text-sm ${status.includes("Failed") || status.includes("Error") ? "text-red-500" : "text-green-500"}`}>
            {status}
          </p>
        )}
      </CardContent>
    </Card>
  );
}