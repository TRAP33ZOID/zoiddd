import { ai, EMBEDDING_MODEL } from "./gemini";

// 1. Simulated Knowledge Base (KB)
// In a real application, this data would be loaded from user-uploaded files (PDFs, docs, etc.)
// and chunked into smaller, manageable pieces.
const KNOWLEDGE_BASE_CHUNKS = [
  "Our product, Zoid, is a cutting-edge data visualization platform.",
  "To reset your password, navigate to the 'Settings' page and click 'Change Password'.",
  "Zoid's premium subscription includes unlimited data storage and priority support.",
  "The free tier of Zoid is limited to 5 projects and 1GB of storage.",
  "For technical support, please call 1-800-ZOID-HELP or use the in-app chat feature.",
];

// 2. In-Memory Vector Store Simulation
// This array will hold the embeddings for the knowledge base chunks.
let knowledgeBaseVectors: number[][] = [];

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
 * Calculates the cosine similarity between two vectors.
 * @param vecA First vector.
 * @param vecB Second vector.
 * @returns The cosine similarity score (0 to 1).
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Initializes the RAG system by embedding all knowledge base chunks.
 * This should be run once on application startup.
 */
export async function initializeRAG(): Promise<void> {
  console.log("Initializing RAG system...");
  const embeddingPromises = KNOWLEDGE_BASE_CHUNKS.map(chunk => embedText(chunk));
  knowledgeBaseVectors = await Promise.all(embeddingPromises);
  console.log(`RAG system initialized with ${knowledgeBaseVectors.length} vectors.`);
}

/**
 * Performs retrieval-augmented generation (RAG) by finding relevant context
 * for a given user query.
 * @param query The user's question.
 * @param k The number of top relevant chunks to retrieve.
 * @returns An array of relevant text chunks.
 */
export async function retrieveContext(query: string, k: number = 2): Promise<string[]> {
  if (knowledgeBaseVectors.length === 0) {
    await initializeRAG();
  }

  // 1. Embed the user query
  const queryVector = await embedText(query);

  // 2. Calculate similarity between the query and all KB vectors
  const similarities = knowledgeBaseVectors.map((kbVector, index) => ({
    index,
    score: cosineSimilarity(queryVector, kbVector),
  }));

  // 3. Sort by score and select the top K chunks
  similarities.sort((a, b) => b.score - a.score);
  const topKIndices = similarities.slice(0, k).map(s => s.index);

  // 4. Retrieve the original text chunks
  const relevantChunks = topKIndices.map(index => KNOWLEDGE_BASE_CHUNKS[index]);

  return relevantChunks;
}