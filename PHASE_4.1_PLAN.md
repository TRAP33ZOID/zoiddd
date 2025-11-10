# 🛠️ Phase 4.1: Bug Fixes & Foundation - Detailed Implementation Plan

**Status:** DRAFT FOR REVIEW  
**Timeline:** Week 1 (5 working days)  
**Priority:** CRITICAL - Blocking issues for production

---

## 📋 Overview

Phase 4.1 addresses 4 critical bugs discovered in the master audit that must be fixed before advancing to telephony integration (Phase 4.5).

### Current Issues

| Bug | Severity | Impact | Status |
|-----|----------|--------|--------|
| Language-Aware Ingestion | CRITICAL | Arabic KB doesn't work properly | ❌ BROKEN |
| Document Management | MEDIUM | Can't view/delete docs | ❌ MISSING |
| Session Persistence | MEDIUM | History lost on refresh | ❌ MISSING |
| Cost Monitoring | HIGH | Untracked $2,800/month costs | ❌ MISSING |

---

## 🐛 Bug #1: Language-Aware Ingestion (CRITICAL)

### Problem Statement
- **Current:** Documents uploaded without language metadata
- **Result:** Arabic queries retrieve English documents (vector space contamination)
- **Root Cause:** `app/api/ingest/route.ts` doesn't accept language parameter

### Current Code Issue
```typescript
// app/api/ingest/route.ts (line 49-54)
documentsToInsert.push({
  content: chunks[i],
  metadata: { filename: filename, chunk_index: i },  // ❌ NO language field
  embedding: embeddings[i].values,
});
```

### Required Changes

#### 1.1 Update Ingestion API (`app/api/ingest/route.ts`)
**Changes:**
- Extract `language` parameter from request body
- Validate language against supported languages (en-US, ar-SA)
- Add `language` field to document insert

```typescript
// BEFORE
const { text, filename } = await req.json();

// AFTER
const { text, filename, language } = await req.json();
const validLanguage = isValidLanguage(language) ? language : 'en-US';

// Then when inserting:
documentsToInsert.push({
  content: chunks[i],
  metadata: { filename, chunk_index: i },
  language: validLanguage,  // ✅ ADD THIS
  embedding: embeddings[i].values,
});
```

**Implementation Details:**
- File: `app/api/ingest/route.ts`
- Lines to modify: 13 (parse language), 51 (add language field)
- Add import: `import { isValidLanguage } from '@/lib/language';`

#### 1.2 Update Ingestion Form (`components/ingestion-form.tsx`)
**Changes:**
- Add language selector dropdown (English | العربية)
- Pass language to API when submitting

```typescript
// Add state
const [language, setLanguage] = useState<string>('en-US');

// Add UI selector before filename input
<select value={language} onChange={(e) => setLanguage(e.target.value)}>
  <option value="en-US">English</option>
  <option value="ar-SA">العربية (Arabic)</option>
</select>

// Include in fetch body
body: JSON.stringify({ text, filename, language })
```

**Implementation Details:**
- File: `components/ingestion-form.tsx`
- Add language state (line ~12)
- Add select UI (before filename input, ~line 57)
- Update fetch body (line 30)

### Verification Checklist
- [ ] Upload English document → check `documents` table has `language: 'en-US'`
- [ ] Upload Arabic document → check `documents` table has `language: 'ar-SA'`
- [ ] Query in English → retrieves English docs only
- [ ] Query in Arabic → retrieves Arabic docs only
- [ ] Confirm no cross-language mixing

---

## 📂 Bug #2: Document Management (MEDIUM)

### Problem Statement
- **Current:** No way to view, edit, or delete documents
- **Result:** Can't clean up mistaken uploads or manage knowledge base
- **Missing:** Document list viewer, delete API, admin UI

### Required Changes

#### 2.1 Create Documents API (`app/api/documents/route.ts`)
**Features:**
- GET: List all documents with metadata
- DELETE: Remove document by ID

```typescript
// GET /api/documents
// Returns: { documents: [{ id, content (truncated), filename, language, created_at }, ...], total }

// DELETE /api/documents?id=123
// Returns: { success: true, message: "Document deleted" }
```

**Implementation:**
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
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "Document ID required" }, { status: 400 });
    }
    
    const { error } = await supabase
      .from(DOCUMENTS_TABLE)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return NextResponse.json({ success: true, message: "Document deleted" });
  } catch (error) {
    console.error("Delete document error:", error);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}
```

#### 2.2 Create Document List Component (`components/document-list.tsx`)
**Features:**
- Display table of uploaded documents
- Show: filename, language, date, preview
- Delete button for each document

```typescript
// Key UI:
// - Table with columns: Filename | Language | Date | Preview | Delete
// - Loading state while fetching
// - Confirmation before delete
// - Auto-refresh after delete
// - Empty state message
```

#### 2.3 Add Document List to Main Page
**Changes:**
- Add `<DocumentList />` component to `app/page.tsx`
- Can add before or after ingestion form
- Suggested: Between ingestion form and chat interface

**File changes:**
- `app/page.tsx` (import and add component)

### Verification Checklist
- [ ] Navigate to document list page
- [ ] See all uploaded documents in table
- [ ] Verify filename, language, and date display correctly
- [ ] Delete a document → removed from table and DB
- [ ] Confirm document no longer retrievable in RAG

---

## 💾 Bug #3: Session Persistence (MEDIUM)

### Problem Statement
- **Current:** All messages stored in React state only
- **Result:** Conversation lost on page refresh
- **Impact:** Poor user experience, can't resume conversations

### Current Code Issue
```typescript
// components/chat-interface.tsx (line 19)
const [messages, setMessages] = useState<Message[]>([]);  // ❌ Lost on refresh
```

### Solution: localStorage (Phase 1)
**Why localStorage?**
- Quick to implement (30 minutes)
- Doesn't require database setup
- Works for single-user web session
- Bridge to Phase 4D (multi-user DB sessions)

### Required Changes

#### 3.1 Update Chat Interface (`components/chat-interface.tsx`)

**Add constants:**
```typescript
const STORAGE_KEY = 'zoid_chat_messages';
const LANGUAGE_STORAGE_KEY = 'zoid_preferred_language';
```

**On mount - Load from localStorage:**
```typescript
useEffect(() => {
  const savedMessages = localStorage.getItem(STORAGE_KEY);
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  
  if (savedMessages) {
    try {
      setMessages(JSON.parse(savedMessages));
    } catch (e) {
      console.error('Failed to parse messages:', e);
    }
  }
  
  if (savedLanguage) {
    setCurrentLanguage(savedLanguage);
  }
}, []);
```

**After state changes - Save to localStorage:**
```typescript
// In handleSendMessage and handleVoiceInput, after setMessages:
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}, [messages]);

useEffect(() => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
}, [currentLanguage]);
```

**Add clear button (optional):**
```typescript
const clearHistory = () => {
  if (confirm('Clear all chat history?')) {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }
};
```

### Verification Checklist
- [ ] Send a message
- [ ] Refresh page
- [ ] Message still visible
- [ ] Language selection persists after refresh
- [ ] Multiple messages persist
- [ ] Clear history button works if added

---

## 💰 Bug #4: Cost Monitoring (HIGH)

### Problem Statement
- **Current:** Zero visibility into API costs
- **Estimated Monthly Cost:** $2,800 (unmonitored!)
- **Risk:** Unexpected bills without alerts

### Cost Breakdown (per 1000 calls/day)
| Service | Cost | Quantity | Monthly |
|---------|------|----------|---------|
| Gemini API | $0.075/1M tokens | 500K tokens/day | $1,125 |
| Google STT | $0.016/min | 600 min/day | $288 |
| Google TTS | $16/1M chars | 6M chars/day | $288 |
| **Total** | | | **$1,701** |

### Required Changes

#### 4.1 Create Cost Monitor Library (`lib/cost-monitor.ts`)

```typescript
/**
 * Cost monitoring and tracking for API usage
 * Tracks Gemini, STT, TTS, and database operations
 */

export interface ApiMetrics {
  geminiTokens: number;
  sttMinutes: number;
  ttsCharacters: number;
  timestamp: number;
}

export class CostMonitor {
  private static instance: CostMonitor;
  private metrics: ApiMetrics[] = [];
  private storageName = 'zoid_api_metrics';
  
  private constructor() {
    this.loadMetrics();
  }
  
  static getInstance(): CostMonitor {
    if (!CostMonitor.instance) {
      CostMonitor.instance = new CostMonitor();
    }
    return CostMonitor.instance;
  }
  
  // Track Gemini tokens
  trackGeminiTokens(inputTokens: number, outputTokens: number): void {
    console.log(`📊 Gemini: +${inputTokens} input, +${outputTokens} output tokens`);
    const metric = this.getOrCreateTodayMetric();
    metric.geminiTokens += (inputTokens + outputTokens);
    this.save();
  }
  
  // Track STT duration
  trackSTT(durationMs: number): void {
    const minutes = durationMs / 60000;
    console.log(`📊 STT: +${minutes.toFixed(2)} minutes`);
    const metric = this.getOrCreateTodayMetric();
    metric.sttMinutes += minutes;
    this.save();
  }
  
  // Track TTS characters
  trackTTS(characters: number): void {
    console.log(`📊 TTS: +${characters} characters`);
    const metric = this.getOrCreateTodayMetric();
    metric.ttsCharacters += characters;
    this.save();
  }
  
  // Calculate costs
  calculateCosts(metric: ApiMetrics) {
    const geminiCost = (metric.geminiTokens / 1000000) * 0.075;
    const sttCost = metric.sttMinutes * 0.016;
    const ttsCost = (metric.ttsCharacters / 1000000) * 16;
    return {
      gemini: geminiCost,
      stt: sttCost,
      tts: ttsCost,
      total: geminiCost + sttCost + ttsCost
    };
  }
  
  // Get today's metrics
  getTodayMetrics(): ApiMetrics {
    return this.getOrCreateTodayMetric();
  }
  
  // Get all metrics
  getAllMetrics(): ApiMetrics[] {
    return this.metrics;
  }
  
  // Private helpers
  private getOrCreateTodayMetric(): ApiMetrics {
    const today = new Date().toDateString();
    let metric = this.metrics.find(m => 
      new Date(m.timestamp).toDateString() === today
    );
    
    if (!metric) {
      metric = {
        geminiTokens: 0,
        sttMinutes: 0,
        ttsCharacters: 0,
        timestamp: Date.now()
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

#### 4.2 Add Tracking to API Routes

**In `app/api/chat/route.ts`:**
```typescript
import { costMonitor } from '@/lib/cost-monitor';

// After generating response with Gemini:
const tokensUsed = response.usageMetadata?.totalTokenCount || 0;
costMonitor.trackGeminiTokens(
  response.usageMetadata?.inputTokenCount || 0,
  response.usageMetadata?.outputTokenCount || 0
);
```

**In `app/api/voice/route.ts`:**
```typescript
import { costMonitor } from '@/lib/cost-monitor';

// After STT conversion:
const sttDurationMs = Date.now() - sttStartTime;
costMonitor.trackSTT(sttDurationMs);

// After TTS conversion:
costMonitor.trackTTS(responseText.length);
```

#### 4.3 Create Cost Dashboard Component (`components/cost-dashboard.tsx`)

**Features:**
- Show today's estimated costs
- Breakdown by service (Gemini, STT, TTS)
- Daily trend chart (if time permits)
- Cost alert if exceeds daily budget

```typescript
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { costMonitor } from '@/lib/cost-monitor';

export function CostDashboard() {
  const [costs, setCosts] = useState({ gemini: 0, stt: 0, tts: 0, total: 0 });

  useEffect(() => {
    const metric = costMonitor.getTodayMetrics();
    const calculatedCosts = costMonitor.calculateCosts(metric);
    setCosts(calculatedCosts);
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>💰 Today's API Costs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Gemini:</span>
          <span className="font-mono">${costs.gemini.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span>STT:</span>
          <span className="font-mono">${costs.stt.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span>TTS:</span>
          <span className="font-mono">${costs.tts.toFixed(4)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total:</span>
          <span className="font-mono text-lg">${costs.total.toFixed(4)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### 4.4 Add Dashboard to Main Page
**File:** `app/page.tsx`
- Import `<CostDashboard />`
- Add to sidebar or main content area
- Position: Top right corner or after ingestion form

### Verification Checklist
- [ ] Send messages and verify token tracking
- [ ] Make voice calls and verify STT/TTS tracking
- [ ] Check localStorage for metrics data
- [ ] Verify cost calculation accuracy
- [ ] Dashboard displays realistic costs
- [ ] Metrics persist across page refreshes

---

## 📊 Implementation Timeline

| Task | Priority | Days | Owner |
|------|----------|------|-------|
| Fix Language Ingestion | CRITICAL | 1 | Code Mode |
| Add Document Management | MEDIUM | 1.5 | Code Mode |
| Session Persistence | MEDIUM | 0.5 | Code Mode |
| Cost Monitoring | HIGH | 1 | Code Mode |
| Testing & Validation | - | 1 | Code Mode |
| **Total** | | **5** | |

---

## ✅ Success Criteria

### Bug #1: Language-Aware Ingestion
- ✅ Documents stored with language field
- ✅ Arabic queries don't retrieve English docs
- ✅ Language selector works in ingestion form

### Bug #2: Document Management
- ✅ Document list shows all uploads
- ✅ Delete button removes docs from DB
- ✅ Deleted docs not retrievable in RAG

### Bug #3: Session Persistence
- ✅ Messages persist after page refresh
- ✅ Language preference persists
- ✅ Clear history works (if implemented)

### Bug #4: Cost Monitoring
- ✅ API calls tracked in localStorage
- ✅ Dashboard shows realistic costs
- ✅ No production deployed without cost cap

---

## 🚀 Next Steps

1. **Review this plan** - Confirm with stakeholder
2. **Switch to Code Mode** - Implement all 4 fixes
3. **Test thoroughly** - Verify each fix independently
4. **Git commit** - Track progress with meaningful commits
5. **Document results** - Update PROJECT_HANDOVER.md
6. **Proceed to Phase 4.5** - Telephony integration (Week 2)

---

## 📝 Notes

- **localStorage limitation:** 5-10MB per domain; sufficient for most use cases
- **Cost tracking accuracy:** Based on publicly available pricing; may need adjustment
- **Document deletion:** Consider soft-delete vs hard-delete in future (audit trail)
- **Multi-language future:** Phase 4D will add Persian, Turkish, etc.
