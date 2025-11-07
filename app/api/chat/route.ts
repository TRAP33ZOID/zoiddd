import { NextResponse } from "next/server";
import { ai, CHAT_MODEL } from "@/lib/gemini";
import { retrieveContext } from "@/lib/rag";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // 1. Retrieval Step (RAG)
    const contextChunks = await retrieveContext(query);
    const context = contextChunks.join("\n---\n");

    // 2. Augmentation and Generation Step
    const systemInstruction = `You are Zoid AI Support Agent, a helpful and friendly customer service representative.
    Your goal is to answer the user's question based ONLY on the provided context.
    Other wise answer "idk"
    
    CONTEXT:
    ---
    ${context}
    ---
    `;

    const response = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [
        { role: "user", parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const textResponse = response.text;

    return NextResponse.json({ response: textResponse, context: contextChunks });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}