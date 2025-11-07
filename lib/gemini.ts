import { GoogleGenAI } from "@google/genai";

// Ensure the GEMINI_API_KEY environment variable is set
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

// Initialize the GoogleGenAI client
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Define the models we will use
export const CHAT_MODEL = "gemini-2.5-flash";
export const EMBEDDING_MODEL = "text-embedding-004";