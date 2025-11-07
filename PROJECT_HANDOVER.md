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

## 3. Phase 1: Core RAG Chat Implementation (Completed)

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

## 4. Phase 2: Persistent Knowledge Base & Ingestion (In Progress)

| Step | Description | Status |
| :--- | :--- | :--- |
| 1 | Select and configure persistent vector database (Supabase/pgvector). | [x] |
| 2 | Install dependencies (`@supabase/supabase-js`, `langchain`). | [x] |
| 3 | Create Supabase client (`lib/supabase.ts`) and `documents` table schema. | [x] |
| 4 | Design data ingestion API route (`app/api/ingest/route.ts`). | [-] |
| 5 | Implement document parsing and text chunking logic. | [ ] |
| 6 | Implement embedding and vector storage logic. | [ ] |
| 7 | Update `lib/rag.ts` for persistent retrieval. | [ ] |
| 8 | Implement frontend UI for document upload. | [ ] |

## 5. Next Steps (Future Phases)

The next agent taking over should focus on these priorities:

1.  **Voice Integration:** Begin integrating real-time voice capabilities (Speech-to-Text and Text-to-Speech) to fulfill the Retell AI-like voice agent goal.