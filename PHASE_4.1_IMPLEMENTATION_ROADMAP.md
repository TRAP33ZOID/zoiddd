# 🚀 Phase 4.1 Implementation Roadmap - FINAL

**Status:** ✅ BLOCKERS FIXED - Ready for Core Work  
**Updated:** November 9, 2025  
**Verified:** Voice working in English & Arabic (PC + Laptop)

---

## ✅ Fixed: Immediate Blockers

### Blocker #1: Credentials File ✅ FIXED
- **Before:** `lib/google-cloud-key.json.json` → 500 errors
- **After:** `lib/google-cloud-key.json` → Voice API working ✨
- **Verification:** UI shows working English + Arabic voice with audio playback

### Blocker #2: PC Microphone ✅ NOT NEEDED
- **Status:** Voice recording works on PC now
- **Decision:** Skip mic device selector - system works fine
- **Updated Plan:** Full 3 days for core Phase 4.1 work

---

## 🎯 Phase 4.1 Core Work - 3 Tasks (3 Days Total)

### Task 1: Document Management (1.5 Days)

**Goal:** View, list, and delete uploaded documents

#### 1.1 Backend: `app/api/documents/route.ts`

```typescript
import { NextResponse } from "next/server";
import { supabase, DOCUMENTS_TABLE } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { data, error } = await supabase
      .from(DOCUMENTS_TABLE)
      .select('id, content, metadata, language, created_at')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json({
      documents: data.map(doc => ({
        id: doc.id,
        preview: doc.content.substring(0, 100) + '...',
        filename: doc.metadata?.filename || 'Unknown',
        language: doc.language,
        created_at: doc.created_at
      })),
      total: data.length
    });
  } catch (error) {
    console.error("Fetch documents error:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Document ID required" },
        { status: 400 }
      );
    }
    
    const { error } = await supabase
      .from(DOCUMENTS_TABLE)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      message: "Document deleted successfully"
    });
  } catch (error) {
    console.error("Delete document error:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
```

#### 1.2 Frontend: `components/document-list.tsx`

```typescript
"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: number;
  filename: string;
  language: string;
  preview: string;
  created_at: string;
}

export function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      
      if (res.ok) {
        setDocuments(data.documents);
      } else {
        toast.error("Failed to load documents");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Error loading documents");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      const res = await fetch(`/api/documents?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
        toast.success("Document deleted");
      } else {
        toast.error("Failed to delete document");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-8">
      <CardHeader>
        <CardTitle>📂 Knowledge Base Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-500">Loading documents...</p>
        ) : documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Filename</th>
                  <th className="text-left py-2 px-2">Language</th>
                  <th className="text-left py-2 px-2">Preview</th>
                  <th className="text-left py-2 px-2">Date</th>
                  <th className="text-left py-2 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-2">{doc.filename}</td>
                    <td className="py-2 px-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {doc.language}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-gray-600 text-xs">
                      {doc.preview}
                    </td>
                    <td className="py-2 px-2 text-gray-600 text-xs">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

#### 1.3 Integration

Add to `app/page.tsx`:
```typescript
import { DocumentList } from "@/components/document-list";

// Add after IngestionForm component:
<DocumentList />
```

---

### Task 2: Session Persistence (0.5 Days)

**Goal:** Save and restore chat history + language preference

#### 2.1 Update `components/chat-interface.tsx`

Add constants at top:
```typescript
const STORAGE_KEY = 'zoid_chat_messages';
const LANGUAGE_STORAGE_KEY = 'zoid_preferred_language';
```

Add useEffect for loading on mount (after other useEffects):
```typescript
useEffect(() => {
  // Load messages from localStorage
  const savedMessages = localStorage.getItem(STORAGE_KEY);
  if (savedMessages) {
    try {
      setMessages(JSON.parse(savedMessages));
    } catch (e) {
      console.error('Failed to parse saved messages:', e);
    }
  }

  // Load saved language preference
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage) {
    setCurrentLanguage(savedLanguage);
  }
}, []);
```

Add useEffect for saving messages:
```typescript
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}, [messages]);
```

Add useEffect for saving language:
```typescript
useEffect(() => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
}, [currentLanguage]);
```

Optional: Add clear history button
```typescript
const clearHistory = () => {
  if (confirm('Clear all chat history? This cannot be undone.')) {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Chat history cleared");
  }
};

// Add button to UI:
<Button onClick={clearHistory} variant="outline" size="sm">
  Clear History
</Button>
```

---

### Task 3: Cost Monitoring (1 Day)

**Goal:** Track API usage and display daily costs

#### 3.1 Create `lib/cost-monitor.ts`

```typescript
export interface UsageMetrics {
  geminiTokens: number;
  sttMinutes: number;
  ttsCharacters: number;
  timestamp: number;
}

export class CostMonitor {
  private static instance: CostMonitor;
  private metrics: UsageMetrics[] = [];
  private readonly storageName = 'zoid_usage_metrics';

  private constructor() {
    this.loadMetrics();
  }

  static getInstance(): CostMonitor {
    if (!CostMonitor.instance) {
      CostMonitor.instance = new CostMonitor();
    }
    return CostMonitor.instance;
  }

  trackGeminiTokens(inputTokens: number, outputTokens: number): void {
    const total = inputTokens + outputTokens;
    console.log(`📊 Gemini: +${total} tokens (in: ${inputTokens}, out: ${outputTokens})`);
    
    const metric = this.getOrCreateTodayMetric();
    metric.geminiTokens += total;
    this.save();
  }

  trackSTT(durationMs: number): void {
    const minutes = durationMs / 60000;
    console.log(`📊 STT: +${minutes.toFixed(2)} minutes`);
    
    const metric = this.getOrCreateTodayMetric();
    metric.sttMinutes += minutes;
    this.save();
  }

  trackTTS(characters: number): void {
    console.log(`📊 TTS: +${characters} characters`);
    
    const metric = this.getOrCreateTodayMetric();
    metric.ttsCharacters += characters;
    this.save();
  }

  calculateCosts(metric: UsageMetrics) {
    // Pricing as of Nov 2025
    const geminiCost = (metric.geminiTokens / 1_000_000) * 0.075;
    const sttCost = metric.sttMinutes * 0.016;
    const ttsCost = (metric.ttsCharacters / 1_000_000) * 16;

    return {
      gemini: geminiCost,
      stt: sttCost,
      tts: ttsCost,
      total: geminiCost + sttCost + ttsCost,
    };
  }

  getTodayMetrics(): UsageMetrics {
    return this.getOrCreateTodayMetric();
  }

  getAllMetrics(): UsageMetrics[] {
    return this.metrics;
  }

  private getOrCreateTodayMetric(): UsageMetrics {
    const today = new Date().toDateString();
    
    let metric = this.metrics.find(
      (m) => new Date(m.timestamp).toDateString() === today
    );

    if (!metric) {
      metric = {
        geminiTokens: 0,
        sttMinutes: 0,
        ttsCharacters: 0,
        timestamp: Date.now(),
      };
      this.metrics.push(metric);
    }

    return metric;
  }

  private save(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageName, JSON.stringify(this.metrics));
    }
  }

  private loadMetrics(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.storageName);
      if (stored) {
        try {
          this.metrics = JSON.parse(stored);
        } catch (e) {
          console.error('Failed to load metrics:', e);
        }
      }
    }
  }
}

export const costMonitor = CostMonitor.getInstance();
```

#### 3.2 Create `components/cost-dashboard.tsx`

```typescript
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

  useEffect(() => {
    const metric = costMonitor.getTodayMetrics();
    const calculatedCosts = costMonitor.calculateCosts(metric);
    setCosts(calculatedCosts);
    setUsage(metric);

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      const updated = costMonitor.getTodayMetrics();
      const updatedCosts = costMonitor.calculateCosts(updated);
      setCosts(updatedCosts);
      setUsage(updated);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle>💰 Today's API Costs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-xs text-gray-500 mb-4">
          {usage && new Date(usage.timestamp).toLocaleDateString()}
        </div>

        <div className="flex justify-between text-sm">
          <span>Gemini ({usage?.geminiTokens || 0} tokens)</span>
          <span className="font-mono">${costs.gemini.toFixed(4)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>STT ({usage?.sttMinutes.toFixed(1) || 0} min)</span>
          <span className="font-mono">${costs.stt.toFixed(4)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>TTS ({usage?.ttsCharacters || 0} chars)</span>
          <span className="font-mono">${costs.tts.toFixed(4)}</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold">
          <span>Total Today</span>
          <span className="font-mono text-lg">${costs.total.toFixed(4)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### 3.3 Add Tracking to API Routes

**In `app/api/chat/route.ts`:**
```typescript
import { costMonitor } from '@/lib/cost-monitor';

// After Gemini response generation:
if (response.usageMetadata) {
  costMonitor.trackGeminiTokens(
    response.usageMetadata.inputTokenCount || 0,
    response.usageMetadata.outputTokenCount || 0
  );
}
```

**In `app/api/voice/route.ts`:**
```typescript
import { costMonitor } from '@/lib/cost-monitor';

// After STT (line ~47):
const sttDurationMs = Date.now() - sttStartTime;
costMonitor.trackSTT(sttDurationMs);

// After TTS generation:
costMonitor.trackTTS(responseText.length);
```

#### 3.4 Add Dashboard to UI

In `app/page.tsx`:
```typescript
import { CostDashboard } from "@/components/cost-dashboard";

// Add after ChatInterface:
<CostDashboard />
```

---

## 📋 Implementation Checklist

### Task 1: Document Management
- [ ] Create `app/api/documents/route.ts` (GET + DELETE)
- [ ] Create `components/document-list.tsx`
- [ ] Add DocumentList import to `app/page.tsx`
- [ ] Test: List documents → see table
- [ ] Test: Delete document → removed from DB
- [ ] Test: Deleted doc no longer in RAG retrieval

### Task 2: Session Persistence
- [ ] Add localStorage constants to chat-interface
- [ ] Add useEffect for loading messages on mount
- [ ] Add useEffect for saving messages
- [ ] Add useEffect for saving language
- [ ] Test: Send message → refresh → message still there
- [ ] Test: Change language → refresh → language persists
- [ ] Optional: Add clear history button

### Task 3: Cost Monitoring
- [ ] Create `lib/cost-monitor.ts`
- [ ] Create `components/cost-dashboard.tsx`
- [ ] Add tracking to `app/api/chat/route.ts`
- [ ] Add tracking to `app/api/voice/route.ts`
- [ ] Add CostDashboard to `app/page.tsx`
- [ ] Test: Send message → cost increases
- [ ] Test: Make voice call → cost increases
- [ ] Verify localStorage persists metrics

---

## ✅ Success Criteria

**Document Management:**
- All documents visible in table with filename, language, date, preview
- Delete button works and removes from DB
- Deleted documents not retrievable in chat

**Session Persistence:**
- Messages visible after page refresh
- Language preference persists
- Conversation history preserved across sessions

**Cost Monitoring:**
- Costs calculated correctly per API pricing
- Dashboard updates in real-time
- Metrics persist in localStorage
- Can track daily spending patterns

---

## 🎯 Next Phase

After Phase 4.1 complete:
- **Phase 4.5:** Telephony Integration (VAPI.ai)
- **Phase 4D:** Multi-User & Database Sessions
- **Phase 4C:** Human Handoff
- **Phase 4B:** Tool Use / Function Calling
- **Phase 4E:** Production Hardening

---

## 📝 Git Workflow

```bash
# After each task:
git add .
git commit -m "Phase 4.1: Add [task name]"
git push origin main

# Example commits:
# - "Phase 4.1: Add document management API and UI"
# - "Phase 4.1: Add session persistence with localStorage"
# - "Phase 4.1: Add cost monitoring and dashboard"
```
