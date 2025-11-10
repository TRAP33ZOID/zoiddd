# 🐛 Phase 4.1 Debug Report

## Issue #1: Document List API - Column Missing

**Error:**
```
column documents.created_at does not exist
code: '42703'
```

**Root Cause:**
The `/api/documents` GET endpoint tries to SELECT `created_at`, but this column doesn't exist in the actual Supabase `documents` table.

**Solution:**
Remove `created_at` from the SELECT, or make it optional. The table might not have had this column when documents were first ingested.

---

## Issue #2: Cost Monitoring - Showing $0.0000

**Analysis:**
✅ Cost tracking IS working on the server (logs show):
```
📊 [COST] STT: +0.02 minutes
📊 [COST] Gemini: +453 tokens (input: 432, output: 21)
📊 [COST] TTS: +71 characters
```

**Problem:**
Server-side cost tracking calls `localStorage.setItem()` but `window` is undefined on Node.js server!

```typescript
if (typeof window !== 'undefined') {
  localStorage.setItem(this.storageName, JSON.stringify(this.metrics));
}
```

This condition prevents server from writing to localStorage.

**Solution:**
Move cost tracking to CLIENT side. Return costs in API response, track on browser.

---

## Quick Fixes Required

### Fix #1: Remove created_at from documents API

Change SELECT from:
```typescript
.select('id, content, metadata, language, created_at')
```

To:
```typescript
.select('id, content, metadata, language')
```

### Fix #2: Move cost tracking to client-side

Instead of tracking on server in `/api/voice` and `/api/chat`:
1. Return cost data in API response
2. Client-side component tracks using CostMonitor
3. CostMonitor writes to localStorage

---

## Status

✅ Session Persistence: **WORKING** (confirmed in screenshots)
✅ Voice RAG: **WORKING** (both English & Arabic)
❌ Document List: **NEEDS FIX** (API column error)
❌ Cost Dashboard: **NEEDS FIX** (no client-side tracking)
