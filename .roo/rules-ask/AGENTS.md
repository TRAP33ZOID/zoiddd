# Project Documentation Rules (Non-Obvious Only)

- **RAG Context:** The AI's knowledge is strictly limited to the documents ingested into the Supabase vector store. If an answer is not found, the system instruction in `app/api/chat/route.ts` mandates stating that the information cannot be found.
- **Supabase Function:** The core vector search logic is implemented via the `match_documents` PostgreSQL function, whose SQL definition is documented in `lib/rag.ts`.