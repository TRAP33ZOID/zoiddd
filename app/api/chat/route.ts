import { NextResponse } from "next/server";
import { ai, CHAT_MODEL } from "@/lib/gemini";
import { retrieveContext } from "@/lib/rag";
import { getDefaultLanguage, isValidLanguage } from "@/lib/language";

export async function POST(req: Request) {
  try {
    const { query, language: languageParam } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }
    
    const language = isValidLanguage(languageParam) ? languageParam : getDefaultLanguage();

    // 1. Retrieval Step (RAG)
    const contextChunks = await retrieveContext(query, language);
    const context = contextChunks.join("\n---\n");

    // 2. Augmentation and Generation Step
    const systemInstruction = `You are Zoid AI Support Agent, a helpful and friendly customer service representative.
    Your goal is to answer the user's question based ONLY on the provided context.
    If the context does not contain the answer, state clearly that you cannot find the information.
    
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

    return NextResponse.json({
      response: textResponse,
      context: contextChunks,
      usageMetadata: response.usageMetadata ? {
        promptTokenCount: response.usageMetadata.promptTokenCount || 0,
        candidatesTokenCount: response.usageMetadata.candidatesTokenCount || 0,
      } : null
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}