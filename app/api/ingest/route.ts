import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ai, EMBEDDING_MODEL } from "@/lib/gemini";
import { supabase, DOCUMENTS_TABLE } from "@/lib/supabase";

// Define chunking parameters
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

export async function POST(req: Request) {
  try {
    // 1. Handle File Upload (assuming text content for simplicity)
    const { text, filename } = await req.json();

    if (!text || !filename) {
      return NextResponse.json({ error: "Missing text or filename" }, { status: 400 });
    }

    // 2. Chunk the Document
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    });

    const chunks = await splitter.splitText(text);
    console.log(`Split document into ${chunks.length} chunks.`);

    // 3. Embed and Store Chunks
    const documentsToInsert = [];
    const chunkTexts = [];

    for (const chunk of chunks) {
      chunkTexts.push(chunk);
    }

    // Batch embed all chunks
    const embedResponse = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: chunkTexts,
    });

    const embeddings = embedResponse.embeddings;

    if (!embeddings) {
      throw new Error("Failed to generate embeddings for document chunks.");
    }

    for (let i = 0; i < chunks.length; i++) {
      documentsToInsert.push({
        content: chunks[i],
        metadata: { filename: filename, chunk_index: i },
        embedding: embeddings[i].values,
      });
    }

    // 4. Insert into Supabase
    const { error } = await supabase.from(DOCUMENTS_TABLE).insert(documentsToInsert);

    if (error) {
      console.error("Supabase insertion error:", error);
      return NextResponse.json({ error: "Failed to insert documents into database." }, { status: 500 });
    }

    return NextResponse.json({ message: `Successfully ingested ${chunks.length} document chunks.`, count: chunks.length });
  } catch (error) {
    console.error("Ingestion API Error:", error);
    return NextResponse.json({ error: "Internal Server Error during ingestion." }, { status: 500 });
  }
}