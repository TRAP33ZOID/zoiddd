# Project Architecture Rules (Non-Obvious Only)

- **RAG Flow:** The core AI interaction is a two-step RAG process: 1) `retrieveContext` (vector search via Supabase RPC) followed by 2) `generateContent` (Gemini API call augmented with context).
- **Supabase Client:** The client in `lib/supabase.ts` is initialized with the `SUPABASE_SERVICE_ROLE_KEY` for server-side access, meaning it has elevated permissions and should only be used in API routes.
- **Embedding Model:** The project uses `text-embedding-004` for vector generation, as defined in `lib/gemini.ts`. All new ingestion or vector operations must use this model.