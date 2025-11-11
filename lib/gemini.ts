import { GoogleGenAI, Content, GenerateContentParameters } from "@google/genai";

// Ensure the GEMINI_API_KEY environment variable is set
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

// Initialize the GoogleGenAI client
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the models we will use
export const CHAT_MODEL = "gemini-2.5-flash";
export const EMBEDDING_MODEL = "text-embedding-004";

export interface StructuredResponse {
  response: string;
  confidence_score: number;
}

/**
 * Generates content from the model, requesting a structured JSON output.
 * @param contents The conversation history and user prompt.
 * @param systemInstruction The system instruction including RAG context.
 * @returns A promise that resolves to the structured response object.
 */
export async function generateStructuredContent(
  contents: Content[],
  systemInstruction: string
): Promise<StructuredResponse> {
  const response = await ai.models.generateContent({
    model: CHAT_MODEL,
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          response: {
            type: "string",
            description: "The concise, natural language response to the user's query, based on the provided context. Must be 2-3 sentences maximum.",
          },
          confidence_score: {
            type: "number",
            description: "A score from 0.0 to 1.0 indicating the AI's confidence that the response is accurate and fully addresses the user's query using the provided CONTEXT. Use 0.0 if the answer is not in the context, and 1.0 if it is perfectly answered.",
          },
        },
        required: ["response", "confidence_score"],
      },
    },
  });

  if (!response.text) {
    console.error("AI response text was undefined.");
    return {
      response: "I'm sorry, the AI failed to generate a response. Please try again.",
      confidence_score: 0.0,
    };
  }

  try {
    // The response text is a JSON string when responseMimeType is set
    const jsonText = response.text.trim();
    const structuredResponse: StructuredResponse = JSON.parse(jsonText);
    return structuredResponse;
  } catch (e) {
    console.error("Failed to parse structured AI response:", response.text, e);
    // Fallback to a default low-confidence response if parsing fails
    return {
      response: "I'm sorry, I encountered an internal error while generating my response. Please try again.",
      confidence_score: 0.0,
    };
  }
}