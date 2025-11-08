# Phase 4A Debug Handoff: Arabic Language Support

**Status:** UI/API Implementation Complete ✅ | RAG Filtering Incomplete ❌ | **BLOCKING ISSUE**

**Critical Finding:** Arabic text queries are NOT retrieving context from knowledge base. English queries work fine. Root cause identified: **Vector space contamination + missing language-aware filtering in RAG retrieval.**

---

## 🎯 The Problem (Confirmed via Supabase CSV Export)

**Database State:**
- 30 total documents stored with embeddings
- Rows 1-3: Junk test data (delete these)
- Rows 4-19: English content (16 documents) ✅
- Rows 20-29: Arabic content (10 documents) ❌ Not retrieving

**Why Arabic Fails:**
1. Single vector embedding space contains mixed English + Arabic documents
2. When Arabic query is embedded and searched, it compares against ALL 30 docs (not just Arabic)
3. Cross-language semantic alignment breaks down
4. No language metadata in table → no way to filter
5. PostgreSQL `match_documents()` function has NO language parameter

**Why English Works:**
- More English documents (16 vs 10)
- Base embedding model likely better at English
- By chance, similarity search still finds matches

---

## 🔧 4-Step Fix Required (Critical Path: ~60 min)

### **STEP 1: Modify `lib/rag.ts` - Add Language Parameter** (10 min)

**Current Function:**
```typescript
export async function retrieveContext(query: string, k = 2) {
  const embedding = await generateEmbedding(query);
  const { data: documents, error } = await supabase.rpc("match_documents", {
    embedding,
    match_threshold: 0.5,
    match_count: k,
  });
```

**Required Change:**
```typescript
export async function retrieveContext(query: string, language: string, k = 2) {
  const embedding = await generateEmbedding(query);
  const { data: documents, error } = await supabase.rpc("match_documents", {
    embedding,
    match_threshold: 0.5,
    match_count: k,
    language, // ← ADD THIS
  });
```

**Update All Callers:**
- `app/api/chat/route.ts` - line where `retrieveContext()` called → add `language` parameter
- `app/api/voice/route.ts` - line where `retrieveContext()` called → add `language` parameter

---

### **STEP 2: Add Language Column to Supabase Schema** (15 min)

**Execute in Supabase SQL Editor:**

```sql
-- Add language column
ALTER TABLE documents ADD COLUMN language VARCHAR(10) DEFAULT 'en-US';

-- Create index for efficient filtering
CREATE INDEX idx_documents_language ON documents(language);

-- Set language for existing data:
-- Rows 4-19 are English (IDs assume auto-increment)
UPDATE documents SET language = 'en-US' WHERE id BETWEEN 4 AND 19;
-- Rows 20-29 are Arabic
UPDATE documents SET language = 'ar-SA' WHERE id BETWEEN 20 AND 29;

-- Verify:
SELECT id, language, content FROM documents ORDER BY id;
```

---

### **STEP 3: Update PostgreSQL `match_documents()` Function** (20 min)

**In Supabase SQL Editor, find and replace the `match_documents()` RPC function:**

**Current function (WITHOUT language filtering):**
- Located in Supabase database settings under SQL functions
- Named `match_documents(embedding, match_threshold, match_count)`

**Required Enhancement:**
```sql
CREATE OR REPLACE FUNCTION match_documents(
  p_embedding vector(768),
  p_match_threshold float,
  p_match_count int,
  p_language varchar DEFAULT 'en-US'
)
RETURNS TABLE (
  id bigint,
  content text,
  similarity float
) LANGUAGE sql STABLE AS $$
  SELECT
    documents.id,
    documents.content,
    1 - (documents.embedding <=> p_embedding) AS similarity
  FROM documents
  WHERE language = p_language  -- ← ADD THIS FILTER
    AND 1 - (documents.embedding <=> p_embedding) > p_match_threshold
  ORDER BY similarity DESC
  LIMIT p_match_count;
$$;
```

---

### **STEP 4: Clean Junk Data** (5 min)

**In Supabase SQL Editor:**
```sql
DELETE FROM documents WHERE id IN (1, 2, 3);
-- Should now have 27 documents (19 English + 8 Arabic)
```

---

## ✅ Verification Steps (Do These After Fixes)

**Test 1 - English Query:**
1. UI: Select "English" from language dropdown
2. Type: "How do I upload documents?"
3. Check console: Should retrieve rows from range 4-19 (English only)
4. Response should include ingestion API details

**Test 2 - Arabic Query:**
1. UI: Select "العربية" from language dropdown
2. Type: "كيف يمكنني تحميل المستندات؟" (How can I upload documents in Arabic?)
3. Check console: Should retrieve rows from range 20-29 (Arabic only)
4. Response should be in Arabic

**Test 3 - Language Isolation:**
- Verify English query does NOT return Arabic chunks
- Verify Arabic query does NOT return English chunks
- Different row IDs in retrieved context per language

---

## 📋 Files Modified So Far (All Working - No Changes Needed)

✅ `lib/language.ts` - Language config & system instructions  
✅ `lib/voice.ts` - STT/TTS language routing  
✅ `components/chat-interface.tsx` - Language selector UI & RTL styling  
✅ `app/api/chat/route.ts` - Language parameter acceptance  
✅ `app/api/voice/route.ts` - Language parameter routing  

---

## 🚫 Blockers (Must Fix Before Proceeding to Phase 4B)

- [ ] Step 1: `lib/rag.ts` language parameter added
- [ ] Step 2: Supabase schema updated with language column & index
- [ ] Step 3: PostgreSQL function enhanced with language filtering
- [ ] Step 4: Junk data (rows 1-3) deleted
- [ ] Verification: Both English & Arabic queries retrieve correct context

---

## 📚 Reference

**Root Cause Analysis:**
- **Vector Space Contamination:** Mixed language embeddings in single space
- **Missing Language Metadata:** No way to distinguish doc language
- **No Filter Logic:** PostgreSQL function searches all documents regardless

**Architecture Decision:** Language-aware retrieval (filter documents by language BEFORE vector similarity search) rather than monolithic multilingual embedding space.

---

## Next Agent Instructions

1. Read this document completely
2. Execute Steps 1-4 in order (use apply_diff, write_to_file, and Supabase SQL editor)
3. Run verification tests per user feedback
4. Mark Phase 4A complete when both languages retrieve context correctly
5. Document fixes in PROJECT_HANDOVER.md Phase 4A section
6. Prepare for Phase 4B (Tool Use / Function Calling) or other next steps

**Estimated Time:** 60 minutes to complete + 15 minutes testing

**Git Status:** Remember to commit after steps 1-4 with message: "Fix: Language-aware RAG retrieval for Phase 4A Arabic support"
