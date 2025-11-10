import { ai, EMBEDDING_MODEL } from "./gemini";
import { supabase, DOCUMENTS_TABLE } from "./supabase";
import { checkRAGCache, cacheRAGResults } from "./rag-cache";

/**
 * Embeds a single text string using the Gemini embedding model.
 * @param text The text to embed.
 * @returns A promise that resolves to the embedding vector (number[]).
 */
async function embedText(text: string): Promise<number[]> {
  const response = await ai.models.embedContent({
    model: EMBEDDING_MODEL,
    contents: [text], // Use 'contents' array
  });
  // The response contains an array of embeddings, we take the first one.
  const embedding = response.embeddings?.[0]?.values;
  if (!embedding) {
    throw new Error("Failed to generate embedding for text.");
  }
  return embedding;
}

/**
 * Performs retrieval-augmented generation (RAG) by finding relevant context
 * for a given user query using Supabase vector search.
 * @param query The user's question.
 * @param k The number of top relevant chunks to retrieve.
 * @returns An array of relevant text chunks.
 */
export async function retrieveContext(query: string, language: string, k: number = 2): Promise<string[]> {
  // 0. Check cache first (target: <5ms)
  const cacheStartTime = Date.now();
  const cachedResults = checkRAGCache(query, language);
  if (cachedResults) {
    const cacheHitTime = Date.now() - cacheStartTime;
    console.log(`  📦 Cache HIT: ${cacheHitTime}ms`);
    return cachedResults;
  }

  // 1. Embed the user query
  const embedStartTime = Date.now();
  const queryVector = await embedText(query);
  const embedTime = Date.now() - embedStartTime;
  console.log(`  🔢 Embedding: ${embedTime}ms`);

  // 2. Perform vector similarity search in Supabase
  const searchStartTime = Date.now();
  const { data: documents, error } = await supabase.rpc("match_documents", {
    query_embedding: queryVector,
    match_count: k,
    language, // Pass the language parameter for filtering
    filter: {}, // Optional filter for metadata
  }).select("content");

  const searchTime = Date.now() - searchStartTime;
  console.log(`  🔍 Vector Search: ${searchTime}ms`);

  if (error) {
    console.error("Supabase retrieval error:", error);
    throw new Error("Failed to retrieve context from knowledge base.");
  }

  // Assert documents is an array for TypeScript
  const relevantDocuments = documents as { content: string }[] | null;

  if (!relevantDocuments || relevantDocuments.length === 0) {
    return ["No relevant documents found in the knowledge base."];
  }

  // 3. Extract and return the content chunks
  const relevantChunks = relevantDocuments.map(doc => doc.content);

  // 4. Cache results for future queries
  cacheRAGResults(query, language, relevantChunks);

  return relevantChunks;
}

// We no longer need initializeRAG() as the data is persistent.
// However, we need a SQL function for vector search.
// The user must execute the following SQL function in Supabase:
/*
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(768),
  match_count int,
  filter jsonb DEFAULT '{}'
)
RETURNS TABLE (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
BEGIN
  RETURN query
  SELECT
    id,
    content,
    metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE metadata @> filter
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
*/