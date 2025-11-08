# Project Debug Rules (Non-Obvious Only)

- **RAG Debugging:** To debug the RAG flow, inspect the `context` returned by the `app/api/chat/route.ts` API endpoint, which contains the retrieved document chunks.
- **Supabase Service Key:** Ensure `SUPABASE_SERVICE_ROLE_KEY` is correctly set in the server environment, as `lib/supabase.ts` requires it for server-side operations and will throw an error otherwise.