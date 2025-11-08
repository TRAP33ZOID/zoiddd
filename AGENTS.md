# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Critical Setup & Architecture

- **RAG Implementation:** The application uses a Retrieval-Augmented Generation (RAG) pattern. AI interactions flow through `app/api/chat/route.ts`, which calls `lib/rag.ts` to retrieve context from Supabase before generating a response via Gemini.
- **Supabase Setup:** The RAG system relies on a custom PostgreSQL function `match_documents` (SQL definition found in `lib/rag.ts`). This function must be manually created in the Supabase database for the RAG API to function.
- **Environment Variables:** Server-side Supabase access requires the sensitive `SUPABASE_SERVICE_ROLE_KEY`, not just the public key. `GEMINI_API_KEY` is also mandatory.
- **Path Aliases:** Use the `@/` alias for absolute imports from the project root (e.g., `@/lib/gemini`).

## Code Conventions

- **Class Names:** Always use the `cn()` utility function from `@/lib/utils.ts` when combining or conditionally applying Tailwind CSS classes.

## Testing

- **Testing Framework:** No dedicated testing framework (e.g., Jest, Vitest) is currently configured in `package.json`. Assume testing is manual or relies on integration tests run via `next dev`.