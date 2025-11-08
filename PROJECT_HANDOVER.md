# AI Support Agent Project Handover Document

This document summarizes the project's scope, established rules, completed work (Phase 1: Core RAG Chat), and the plan for future development.

## 1. Project Scope and Goal

*   **End Goal:** To build a dedicated, voice-based AI support agent application (similar to Retell AI) for general customer service.
*   **Target Region:** Middle East and North Africa (MENA). This implies future requirements for Arabic language support and regional data.
*   **Core Functionality (Long-Term):** Basic Q&A, Troubleshooting, Tool Use/Function Calling, and Human Handoff.
*   **Knowledge Base Strategy:** The agent must be restricted to a user-uploaded knowledge base (RAG).

## 2. Established Rules for Development

These rules must be followed by any subsequent AI agent working on this project:

*   **Browser Interaction:** NEVER use the `browser_action` tool. Instead, ask the user to perform tests (e.g., visiting a URL, typing, clicking) and wait for their detailed report/screenshot.
*   **Version Control:** Commit changes to Git frequently to ensure rollback capability.
*   **Documentation:** Maintain this `PROJECT_HANDOVER.md` file to detail progress and context.
*   **Mode Switching:** Always switch to the appropriate mode (e.g., `code` for implementation, `architect` for planning) before starting a new major task.

## 3. System Instruction for Chat API

This is the exact system instruction used in `app/api/chat/route.ts` to govern the AI's behavior:
```
You are Zoid AI Support Agent, a helpful and friendly customer service representative for the MENA region.
Your goal is to answer the user's question based ONLY on the provided context.
If the context does not contain the answer, you MUST politely state that you do not have the information and cannot assist with that specific query. DO NOT mention the context, the knowledge base, or your limitations.
```

## 4. Phase 1: Core RAG Chat Implementation (Completed)

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

## 5. Phase 2: Persistent Knowledge Base & Ingestion (Completed)

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

## 6. Phase 3: Voice Integration (Completed)

| Step | Description | Status |
| :--- | :--- | :--- |
| 1 | Select and install STT/TTS SDKs (Google Cloud Speech/Text-to-Speech). | [x] |
| 2 | Design the real-time voice API route (`/api/voice`). | [x] |
| 3 | Implement Speech-to-Text (STT) logic to convert user audio to text. | [x] |
| 4 | Integrate STT output with the existing RAG system (`lib/rag.ts`). | [x] |
| 5 | Implement Text-to-Speech (TTS) logic to convert the RAG response to audio. | [x] |
| 6 | Update the frontend chat interface to include microphone input and audio playback. | [x] |
| 7 | Test and verify real-time voice interaction. | [x] |
| 8 | Commit Phase 3 progress to Git repository. | [x] |

### Phase 3 Implementation Details

**New Files Created:**
- `lib/google-cloud-key.json` - Google Cloud service account credentials
- `lib/voice.ts` - Voice service layer (STT & TTS helper functions)
- `app/api/voice/route.ts` - Real-time voice processing endpoint

**Modified Files:**
- `.env.local` - Added Google Cloud environment variables
- `components/chat-interface.tsx` - Enhanced with voice recording & playback UI
- `package.json` - Added `@google-cloud/speech` & `@google-cloud/text-to-speech`

**Key Features:**
- Real-time audio recording via Web Audio API with browser microphone
- Speech-to-Text conversion using Google Cloud Speech API
- Full RAG integration (transcribed text → context retrieval → AI response)
- Text-to-Speech conversion using Google Cloud TTS API
- Audio playback with UI controls
- Visual feedback (recording timer, processing indicators)
- Backward compatible with text-based chat

## 7. Next Steps (Future Phases)

### Current Handover Context
The last prompt used to initiate the current phase (Phase 2) was:
```
I am continuing the AI Support Agent project. Please read the contents of the PROJECT_HANDOVER.md file.

Based on the file, please provide:
1. A summary of the completed work.
2. The three prioritized next steps listed in the document.
3. Confirmation that you understand the rule regarding browser interaction.

Then, switch to Architect mode to begin planning the next steps.
```

The next agent taking over should focus on these priorities:

1.  **Voice Integration:** Continue integrating real-time voice capabilities (Speech-to-Text and Text-to-Speech) to fulfill the Retell AI-like voice agent goal.