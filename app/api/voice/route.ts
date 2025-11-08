import { NextResponse } from "next/server";
import { speechToText, textToAudio } from "@/lib/voice";
import { retrieveContext } from "@/lib/rag";
import { ai, CHAT_MODEL } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    // 1. Extract audio from request
    const formData = await req.formData();
    const audioBlob = formData.get("audio") as Blob;

    if (!audioBlob) {
      return NextResponse.json(
        { error: "Audio blob is required" },
        { status: 400 }
      );
    }

    const audioBuffer = Buffer.from(await audioBlob.arrayBuffer());

    // 2. Convert speech to text (STT)
    const userQuery = await speechToText(audioBuffer, "LINEAR16");
    console.log("Transcribed query:", userQuery);

    // 3. Retrieve context using RAG
    const contextChunks = await retrieveContext(userQuery);
    const context = contextChunks.join("\n---\n");

    // 4. Generate AI response using Gemini
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
      contents: [{ role: "user", parts: [{ text: userQuery }] }],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const aiResponse = response.text || "Sorry, I could not generate a response.";
    console.log("AI response:", aiResponse);

    // 5. Convert AI response to speech (TTS)
    const audioResponseBuffer = await textToAudio(aiResponse, "en-US");

    // 6. Return both text and audio to client
    return NextResponse.json({
      transcript: userQuery,
      response: aiResponse,
      audioBuffer: audioResponseBuffer.toString("base64"),
      context: contextChunks,
    });
  } catch (error) {
    console.error("Voice API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during voice processing" },
      { status: 500 }
    );
  }
}