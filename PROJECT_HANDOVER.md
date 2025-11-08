# 🚀 Zoid AI Support Agent - Master Project Handover Document

**Version:** 2.0 (Post-Phase 4A)  
**Last Updated:** November 8, 2025  
**Current Status:** ✅ Phase 4A Complete - Bilingual Voice Agent with Arabic Support  
**Maintained By:** AI Engineering Team  

> **FOR MASTER AGENTS**: This is a comprehensive handover document with critical architecture decisions, system dependencies, known constraints, and detailed roadmap options. Read completely before taking over.

---

## 1. Project Scope and Goal

*   **End Goal:** To build a dedicated, voice-based AI support agent application (similar to Retell AI) for general customer service.
*   **Target Region:** Middle East and North Africa (MENA). This implies future requirements for Arabic language support and regional data.
*   **Core Functionality (Long-Term):** Basic Q&A, Troubleshooting, Tool Use/Function Calling, and Human Handoff.
*   **Knowledge Base Strategy:** The agent must be restricted to a user-uploaded knowledge base (RAG).

## 2. Established Rules for Development

These rules MUST be followed by any subsequent AI agent working on this project:

*   **Browser Interaction:** NEVER use the `browser_action` tool. Instead, ask the user to perform tests and wait for their detailed report/screenshot.
*   **Version Control:** Commit changes to Git frequently to ensure rollback capability.
*   **Documentation:** Maintain this `PROJECT_HANDOVER.md` file to detail progress and context.
*   **Mode Switching:** Always switch to the appropriate mode before starting a major task.
*   **Baby Steps:** Make incremental changes; test each step before proceeding to the next.

## 3. System Instruction for Chat API

This is the exact system instruction used in [`app/api/chat/route.ts`](app/api/chat/route.ts:1):
```
You are Zoid AI Support Agent, a helpful and friendly customer service representative for the MENA region.
Your goal is to answer the user's question based ONLY on the provided context.
If the context does not contain the answer, you MUST politely state that you do not have the information and cannot assist with that specific query. DO NOT mention the context, the knowledge base, or your limitations.
```

---

## 4. Phase 1: Core RAG Chat Implementation (✅ Completed)

This phase established the foundational RAG intelligence using a text-based chat interface.

| Step | Description | Status |
| :--- | :--- | :--- |
| 1 | Define the scope and core features. | [x] |
| 2 | Select AI model (`gemini-2.5-flash`) and install `@google/genai`. | [x] |
| 3 | Set up Gemini client (`lib/gemini.ts`) and RAG logic (`lib/rag.ts`). | [x] |
| 4 | Implement simulated in-memory knowledge base and retrieval logic. | [x] |
| 5 | Set up backend API route (`app/api/chat/route.ts`). | [x] |
| 6 | Design and integrate minimal frontend chat interface (`components/chat-interface.tsx`). | [x] |
| 7 | Configure `GEMINI_API_KEY` in `.env.local` (excluded from Git). | [x] |
| 8 | Commit all changes to Git repository. | [x] |
| 9 | Test and verify RAG functionality. | [x] |

## 5. Phase 2: Persistent Knowledge Base & Ingestion (✅ Completed)

| Step | Description | Status |
| :--- | :--- | :--- |
| 1 | Select and configure persistent vector database (Supabase/pgvector). | [x] |
| 2 | Install dependencies (`@supabase/supabase-js`, `langchain`). | [x] |
| 3 | Create Supabase client (`lib/supabase.ts`) and `documents` table schema. | [x] |
| 4 | Design data ingestion API route (`app/api/ingest/route.ts`). | [x] |
| 5 | Implement document parsing and text chunking logic. | [x] |
| 6 | Implement embedding and vector storage logic. | [x] |
| 7 | Update `lib/rag.ts` for persistent retrieval. | [x] |
| 8 | Implement frontend UI for document upload. | [x] |
| 9 | Test and verify ingestion/retrieval security fix. | [x] |

## 6. Phase 3: Voice Integration (✅ Completed & Verified)

| Step | Description | Status |
| :--- | :--- | :--- |
| 1 | Select and install STT/TTS SDKs (Google Cloud Speech/Text-to-Speech). | [x] |
| 2 | Design the real-time voice API route (`/api/voice`). | [x] |
| 3 | Implement Speech-to-Text (STT) logic to convert user audio to text. | [x] |
| 4 | Integrate STT output with the existing RAG system (`lib/rag.ts`). | [x] |
| 5 | Implement Text-to-Speech (TTS) logic to convert the RAG response to audio. | [x] |
| 6 | Update the frontend chat interface to include microphone input and audio playback. | [x] |
| 7 | Test and verify real-time voice interaction. | [x] - **VERIFIED WORKING** |
| 8 | Commit Phase 3 progress to Git repository. | [x] |

**Key Features:**
- ✅ Real-time audio recording via Web Audio API with browser microphone
- ✅ Speech-to-Text conversion using Google Cloud Speech API (WebM/Opus @ 48kHz)
- ✅ Full RAG integration (transcribed text → context retrieval → AI response)
- ✅ Text-to-Speech conversion using Google Cloud TTS API (MP3 output)
- ✅ Audio playback with UI controls
- ✅ Visual feedback (recording timer, "Send Recording" button, transcription display)
- ✅ Backward compatible with text-based chat

## 7. Phase 4A: Arabic Language Support (✅ Completed & Ready for Testing)

This phase adds bilingual (English/Arabic) support to the entire application, enabling users to switch between languages seamlessly.

| Step | Description | Status |
| :--- | :--- | :--- |
| 1 | Create language configuration utility (`lib/language.ts`). | [x] |
| 2 | Add language codes, display names, and system instructions (EN + AR-SA). | [x] |
| 3 | Update `lib/voice.ts` to accept `languageCode` parameter for STT/TTS. | [x] |
| 4 | Update `app/api/voice/route.ts` to extract and pass language parameter. | [x] |
| 5 | Add language selector dropdown to chat interface UI. | [x] |
| 6 | Implement RTL (Right-to-Left) styling for Arabic messages. | [x] |
| 7 | Create sample English knowledge base (`knowledge-bases/sample-en.txt`). | [x] |
| 8 | Create sample Arabic knowledge base (`knowledge-bases/sample-ar.txt`). | [x] |
| 9 | Commit Phase 4A progress to Git repository. | [x] |

**Implementation Files:**
- **New:** [`lib/language.ts`](lib/language.ts:1) - Centralized language configuration
- **New:** [`knowledge-bases/sample-en.txt`](knowledge-bases/sample-en.txt:1) - English KB
- **New:** [`knowledge-bases/sample-ar.txt`](knowledge-bases/sample-ar.txt:1) - Arabic KB
- **Modified:** [`lib/voice.ts`](lib/voice.ts:1) - Dynamic language support
- **Modified:** [`app/api/voice/route.ts`](app/api/voice/route.ts:1) - Language parameter handling
- **Modified:** [`components/chat-interface.tsx`](components/chat-interface.tsx:1) - Language selector + RTL

**Key Features:**
- ✅ Language selector dropdown in chat header (English | العربية)
- ✅ Dynamic system instructions based on selected language
- ✅ Multilingual STT/TTS via Google Cloud (ar-SA)
- ✅ RTL text rendering for Arabic messages
- ✅ Sample knowledge bases in both languages
- ✅ Fully backward compatible (English default)

---

## 8. Critical Architecture & System Information

### Technology Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **AI**: Gemini 2.5 Flash (via `@google/genai`)
- **Embeddings**: `text-embedding-004` model
- **Vector DB**: Supabase with pgvector (PostgreSQL)
- **Voice**: Google Cloud Speech-to-Text & Text-to-Speech APIs
- **Runtime**: Node.js 18+, PostgreSQL 13+

### External Service Dependencies
| Service | Purpose | Criticality | Config |
|---------|---------|-------------|--------|
| Google Gemini API | AI response generation | CRITICAL | `GEMINI_API_KEY` in `.env.local` |
| Google Cloud STT | Voice transcription | CRITICAL | Service account JSON in `lib/google-cloud-key.json` |
| Google Cloud TTS | Audio generation | CRITICAL | Same service account as STT |
| Supabase PostgreSQL | Vector database + RAG storage | CRITICAL | Connection details in `.env.local` |
| Supabase Custom Function | `match_documents()` RPC | CRITICAL | Must exist in Supabase DB |

### Key Constraints & Limitations
- **Single User Session**: No multi-user support (Phase 4D planned)
- **English/Arabic Only**: Modern Standard Arabic (ar-SA); regional dialects in roadmap
- **RAG-Only**: No external web search capability
- **Audio Format**: WebM/Opus input (48kHz) → MP3 output
- **Embedding Dimension**: 768 dimensions (text-embedding-004)
- **Rate Limiting**: Not implemented (Phase 4E)
- **Error Recovery**: Limited (Phase 4E)

### Performance Characteristics
- **STT Latency**: 1-3 seconds (Google Cloud API)
- **Embedding Generation**: 0.5 seconds per query
- **RAG Retrieval**: 0.3-0.5 seconds (Supabase vector search)
- **AI Response**: 1-2 seconds (Gemini)
- **TTS Synthesis**: 0.5-1 second (Google Cloud API)
- **Total Round-Trip**: 3-7 seconds (voice → response → audio)

### Known Issues & Workarounds
1. **Google Cloud Credentials Path**: Must be absolute from `process.cwd()`
   - ✅ Workaround: Ensure `lib/google-cloud-key.json` exists
2. **RTL Text Rendering**: Arabic needs `dir="rtl"` attribute
   - ✅ Workaround: Implemented in [`components/chat-interface.tsx`](components/chat-interface.tsx:240)
3. **WebM/Opus Encoding**: Browser records at 48kHz
   - ✅ Workaround: Hardcoded in [`app/api/voice/route.ts`](app/api/voice/route.ts:23)
4. **Embedding Model Consistency**: Must use same model for all embeddings
   - ✅ Workaround: Centralized in [`lib/gemini.ts`](lib/gemini.ts:1) as `EMBEDDING_MODEL`
5. **Supabase Function**: Custom `match_documents()` RPC required
   - ✅ Workaround: SQL in [`lib/rag.ts`](lib/rag.ts:61) (must be created manually in Supabase)

---

## 9. Future Phases: Detailed Roadmap Options

### Phase 4B: Tool Use / Function Calling
**Priority**: HIGH | **Complexity**: MEDIUM | **Timeline**: 2-3 weeks  
**Goal**: Enable AI to call external functions/APIs

**Features**:
- Gemini function calling integration
- Tool registry system
- Actions: database queries, email, webhooks, CRM updates
- Execution confirmation flow (user approval)
- Audit logging

**Prerequisites**:
- Phase 4A complete ✅
- Design tool schemas

**Deliverables**:
- `lib/tools.ts` - Tool registry
- `lib/function-executor.ts` - Safe execution
- `app/api/execute-tool/route.ts` - Endpoint
- Updated system instruction
- Frontend confirmation UI

**Risks**:
- Function errors → add try-catch wrappers
- Malicious calls → strict validation + rate limiting
- Need audit trail → comprehensive logging

---

### Phase 4C: Human Handoff System
**Priority**: HIGH | **Complexity**: MEDIUM | **Timeline**: 2-3 weeks  
**Goal**: Escalate to humans when needed

**Features**:
- Confidence scoring on responses
- Escalation triggers
- Agent notification system
- Session transfer with history
- Warm handoff with context

**Prerequisites**:
- Phase 4A complete ✅
- External notification service access (Slack/email)

**Deliverables**:
- `lib/confidence-scorer.ts`
- `lib/escalation.ts`
- `app/api/escalate/route.ts`
- `app/api/notify-agent/route.ts`
- Frontend escalation UI
- Session export (PDF/JSON)

**Risks**:
- False escalations → tune confidence threshold
- Notification spam → backoff logic
- Lost context → ensure complete history transfer

---

### Phase 4D: Multi-Session Management
**Priority**: MEDIUM | **Complexity**: HIGH | **Timeline**: 3-4 weeks  
**Goal**: Support multiple concurrent users

**Features**:
- User authentication (JWT/OAuth)
- Session persistence
- Conversation history retrieval
- Session lifecycle management
- Analytics dashboard

**Prerequisites**:
- Phase 4A complete ✅
- DB tables: `users`, `sessions`, `chat_history`
- Auth library (NextAuth or JWT)

**Deliverables**:
- `lib/auth.ts` - Auth helpers
- `lib/session-manager.ts` - CRUD operations
- `app/api/auth/login` & `app/api/auth/logout`
- Session list sidebar
- History component
- Analytics dashboard
- Database migrations

**Risks**:
- Session hijacking → secure tokens, HTTPS only
- Data leakage → verify Supabase row-level security
- Database scaling → implement connection pooling

---

### Phase 4E: Production Hardening
**Priority**: HIGH | **Complexity**: HIGH | **Timeline**: 2-3 weeks  
**Goal**: Production-ready system

**Features**:
- Error recovery & retry logic
- Rate limiting per user/IP
- Request timeout handling
- Cost monitoring (API usage)
- Comprehensive logging/monitoring
- Performance optimization
- CI/CD pipeline
- Load testing

**Prerequisites**:
- Phase 4A complete ✅
- Hosting environment selected
- Monitoring service chosen

**Deliverables**:
- `lib/error-handler.ts`
- `lib/rate-limiter.ts`
- `lib/retry-logic.ts`
- `lib/logger.ts`
- `lib/cost-monitor.ts`
- `.github/workflows/ci-cd.yml`
- Load test scripts
- Deployment guide & ops runbook
- Monitoring alerts

**Risks**:
- Hidden costs → real-time cost alerts
- Rate limiting issues → monitor false positives
- Monitoring overhead → use sampling
- Deployment downtime → blue-green deployment

---

## 10. Testing Guide: Phase 4A Arabic Integration

### Prerequisites
1. Development server running: `npm run dev`
2. Browser open to `http://localhost:3000`
3. Sample knowledge bases uploaded to Supabase
4. Google Cloud credentials configured
5. Microphone permissions enabled

### Test Cases

#### Test 1: Language Selector Visibility
**Objective**: Verify language selector appears in chat interface

**Steps**:
1. Open chat interface in browser
2. Look at the card header (top of chat box)
3. Verify a dropdown selector appears next to "🎙️ Zoid AI Support Agent"
4. Verify dropdown contains: "English" and "العربية"

**Expected Result**: ✅ Dropdown visible with both language options

**Pass/Fail**: ___________

---

#### Test 2: Language Switching
**Objective**: Verify language can switch between English and Arabic

**Steps**:
1. Click on language dropdown
2. Select "العربية" (Arabic)
3. Verify placeholder text changes to Arabic
4. Verify message bubbles display RTL (right-aligned)
5. Select "English" again
6. Verify placeholder returns to English
7. Verify message bubbles display LTR (left-aligned)

**Expected Result**: ✅ Language switches, UI updates accordingly

**Pass/Fail**: ___________

---

#### Test 3: English Voice Recording & Response
**Objective**: Verify voice input works in English

**Steps**:
1. Set language to "English"
2. Click "Record" button
3. Speak clearly: "What are the product features?"
4. Wait 2 seconds, then click "Send Recording"
5. Observe transcription in blue bubble (user message)
6. Observe AI response in gray bubble
7. Verify "Play Audio" button appears
8. Click "Play Audio" and listen to response

**Expected Result**: ✅ 
- Transcription correct
- Response matches knowledge base
- Audio plays successfully
- LTR text rendering

**Pass/Fail**: ___________

---

#### Test 4: Arabic Voice Recording & Response
**Objective**: Verify voice input works in Arabic

**Steps**:
1. Set language to "العربية"
2. Click "Record" button
3. Speak in Modern Standard Arabic: "ما هي مميزات المنتج؟" (What are the product features?)
4. Wait 2 seconds, then click "Send Recording"
5. Observe transcription in blue bubble
6. Observe AI response in gray bubble (should be in Arabic)
7. Verify "Play Audio" button appears
8. Click "Play Audio" and listen to Arabic audio response

**Expected Result**: ✅
- Transcription in Arabic
- Response in Arabic
- Arabic audio generated
- RTL text rendering
- Arabic voice tone in audio

**Pass/Fail**: ___________

---

#### Test 5: Arabic RTL Text Rendering
**Objective**: Verify right-to-left text display for Arabic

**Steps**:
1. Set language to "العربية"
2. Record an Arabic message or type Arabic text
3. Examine message bubbles in chat
4. Verify text is right-aligned (RTL)
5. Switch to English
6. Verify English text is left-aligned (LTR)

**Expected Result**: ✅
- Arabic: right-aligned text
- English: left-aligned text
- Clear visual distinction

**Pass/Fail**: ___________

---

#### Test 6: Text-Based Chat in English
**Objective**: Verify text-only chat works in English

**Steps**:
1. Set language to "English"
2. Type in input field: "Tell me about pricing"
3. Click "Send" button
4. Observe response appears in gray bubble
5. Verify response addresses pricing question

**Expected Result**: ✅
- Text input processed
- Relevant response generated
- No errors in console

**Pass/Fail**: ___________

---

#### Test 7: Text-Based Chat in Arabic
**Objective**: Verify text-only chat works in Arabic

**Steps**:
1. Set language to "العربية"
2. Type in input field in Arabic: "أخبرني عن التسعير" (Tell me about pricing)
3. Click "Send" button
4. Observe response in gray bubble (should be in Arabic)
5. Verify response addresses pricing question

**Expected Result**: ✅
- Arabic text input processed
- Response in Arabic
- Relevant pricing information
- RTL rendering

**Pass/Fail**: ___________

---

#### Test 8: Knowledge Base Retrieval (English)
**Objective**: Verify English queries retrieve correct context

**Steps**:
1. Upload `knowledge-bases/sample-en.txt` via ingestion form
2. Set language to "English"
3. Ask: "What is Zoid?"
4. Observe response references company information
5. Ask: "What are the supported languages?"
6. Observe response mentions English and Arabic

**Expected Result**: ✅
- Knowledge base content retrieved
- Accurate answers from KB
- No hallucination outside KB

**Pass/Fail**: ___________

---

#### Test 9: Knowledge Base Retrieval (Arabic)
**Objective**: Verify Arabic queries retrieve correct context

**Steps**:
1. Upload `knowledge-bases/sample-ar.txt` via ingestion form
2. Set language to "العربية"
3. Ask in Arabic: "ما هو Zoid؟" (What is Zoid?)
4. Observe response in Arabic references company info
5. Ask in Arabic: "ما اللغات المدعومة؟" (What languages are supported?)
6. Observe response mentions Arabic and English

**Expected Result**: ✅
- Arabic KB content retrieved
- Accurate Arabic answers
- No hallucination outside KB

**Pass/Fail**: ___________

---

#### Test 10: Language Switching with Message History
**Objective**: Verify chat history persists across language switches

**Steps**:
1. Set language to "English"
2. Send a message: "Hello"
3. Observe response
4. Switch language to "العربية"
5. Verify previous English messages still visible
6. Send an Arabic message
7. Observe both English and Arabic messages in history
8. Switch back to English
9. Verify all message history intact

**Expected Result**: ✅
- Messages persist across language switches
- Mixed language chat history visible
- No messages lost
- Correct RTL/LTR rendering for each language

**Pass/Fail**: ___________

---

#### Test 11: Browser Console Error Check
**Objective**: Verify no critical errors in browser console

**Steps**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Perform all above tests
4. Check for red error messages
5. Document any errors found

**Expected Result**: ✅
- No red error messages
- Only warning messages acceptable (deprecations)
- No network errors

**Pass/Fail**: ___________

---

### Summary Checklist

| Test | English | Arabic | Status |
|------|---------|--------|--------|
| Language Selector | [ ] | [ ] | |
| Language Switching | [ ] | [ ] | |
| Voice Recording | [ ] | [ ] | |
| Voice Response | [ ] | [ ] | |
| RTL Rendering | N/A | [ ] | |
| Text Chat | [ ] | [ ] | |
| KB Retrieval | [ ] | [ ] | |
| Message History | [ ] | [ ] | |
| Console Errors | [ ] | [ ] | |

---

### Known Issues Found During Testing

(Document any issues discovered)

| Issue | Severity | Workaround |
|-------|----------|-----------|
| | | |

---

### Sign-Off

**Tested By**: _____________________  
**Date**: _____________________  
**Result**: [ ] PASS [ ] FAIL [ ] PARTIAL  
**Notes**: _________________________________________________

---

## 11. Getting Started for Next Agent

### Quick Start Commands
```bash
# 1. Verify dependencies
npm install

# 2. Ensure all env vars
cat .env.local  # Check: GEMINI_API_KEY, SUPABASE_*, GOOGLE_CLOUD_*

# 3. Check credentials file
ls -la lib/google-cloud-key.json

# 4. Start development
npm run dev

# 5. Test: http://localhost:3000
```

### Next Steps
1. **Read this document** top-to-bottom (you are here!)
2. **Run the testing guide** above for Phase 4A
3. **Choose Phase 4B-4E** based on priorities
4. **Plan** the chosen phase in Architect mode
5. **Implement** in Code mode
6. **Update this document** with new phase completion

### Quick Reference
- **Main Chat UI**: [`components/chat-interface.tsx`](components/chat-interface.tsx:1)
- **Voice Services**: [`lib/voice.ts`](lib/voice.ts:1)
- **Language Config**: [`lib/language.ts`](lib/language.ts:1)
- **RAG Logic**: [`lib/rag.ts`](lib/rag.ts:1)
- **API Routes**: `app/api/*/route.ts`

---

**End of Master Handover Document**  
*Last updated: November 8, 2025 | Phase 4A Complete*