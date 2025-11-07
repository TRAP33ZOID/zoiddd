import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { Writable } from "stream";
import { createSttStream } from "./stt.ts";
import { retrieveContext } from "./rag.ts";
import { ai, CHAT_MODEL } from "./gemini.ts";
import { synthesizeSpeechStream } from "./tts.ts";

// Global variable to hold the WebSocket server instance
// This is a common pattern in Next.js development environments to ensure
// the server is only initialized once across hot reloads.
let wss: WebSocketServer | undefined;

// System instruction for the RAG agent
const SYSTEM_INSTRUCTION = `You are Zoid AI Support Agent, a helpful and friendly customer service representative.
Your goal is to answer the user's question based ONLY on the provided context.
If the context does not contain the answer, you MUST politely state that you do not have the information and cannot assist with that specific query. DO NOT mention the context, the knowledge base, or your limitations.`;

/**
 * Handles a new WebSocket connection.
 * @param ws The WebSocket instance.
 */
function handleConnection(ws: WebSocket) {
  console.log("New WebSocket connection established.");

  let sttStream: ReturnType<typeof createSttStream> | null = null;
  let accumulatedText = "";

  // Function to handle a final transcription result
  const handleFinalTranscription = async (finalText: string) => {
    console.log(`Final Transcription: ${finalText}`);
    
    // 1. Retrieval Step (RAG)
    const contextChunks = await retrieveContext(finalText);
    const context = contextChunks.join("\n---\n");

    // 2. Augmentation and Generation Step
    const ragSystemInstruction = `${SYSTEM_INSTRUCTION}

    CONTEXT:
    ---
    ${context}
    ---
    `;

    try {
      const response = await ai.models.generateContent({
        model: CHAT_MODEL,
        contents: [
          { role: "user", parts: [{ text: finalText }] }
        ],
        config: {
          systemInstruction: ragSystemInstruction,
        },
      });

      const textResponse = response.text;
      console.log(`Agent Response: ${textResponse}`);

      // 3. Text-to-Speech (TTS) and streaming back to client
      // We use a custom Writable stream that pipes data directly to the WebSocket
      const wsStream = new Writable({
        write(chunk: Buffer, encoding: string, callback: (error?: Error | null) => void) {
          if (ws.readyState === ws.OPEN) {
            ws.send(chunk, { binary: true }, callback);
          } else {
            callback();
          }
        },
        final(callback: (error?: Error | null) => void) {
          // Optionally send a control message to the client indicating TTS is finished
          if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({ type: "tts_end" }));
          }
          callback();
        }
      });

      if (!textResponse) {
        console.warn("Gemini returned no text response.");
        return;
      }
      await synthesizeSpeechStream(textResponse, wsStream);

    } catch (error) {
      console.error("RAG/TTS Pipeline Error:", error);
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: "error", message: "Internal agent error." }));
      }
    }
  };

  // Handle incoming messages from the client
  ws.on("message", (message: Buffer) => {
    // The first message should be a control message to start the STT stream
    if (message.toString().startsWith("{")) {
      const data = JSON.parse(message.toString());
      if (data.type === "start_stream") {
        console.log("Starting STT stream...");
        
        // Initialize STT stream
        sttStream = createSttStream((text: string, isFinal: boolean) => {
          // Send interim results back to the client for display
          if (!isFinal) {
            ws.send(JSON.stringify({ type: "interim_text", text: text }));
          }
          
          // Accumulate text until a final result is received
          if (isFinal) {
            accumulatedText = text;
            // Close the STT stream after a final utterance is detected
            sttStream?.end();
            sttStream = null;
            
            // Process the final transcription
            handleFinalTranscription(accumulatedText);
            accumulatedText = ""; // Reset for next utterance
          }
        });
        
        // Send confirmation to client
        ws.send(JSON.stringify({ type: "stream_started" }));
      }
    } else if (sttStream) {
      // Pipe raw audio data to the STT stream
      sttStream.write(message);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed.");
    // Clean up STT stream if it's still active
    sttStream?.end();
  });

  ws.on("error", (error: Error) => {
    console.error("WebSocket Error:", error);
    sttStream?.end();
  });
}

/**
 * Initializes and returns the WebSocket server instance.
 * @param server The HTTP server instance from Next.js.
 */
export function initializeWebSocketServer(server: import("http").Server) {
  if (!wss) {
    console.log("Initializing WebSocket Server...");
    wss = new WebSocketServer({ noServer: true });

    wss.on("connection", handleConnection);
  }
  return wss;
}

/**
 * Handles the WebSocket upgrade request.
 * @param req The incoming HTTP request.
 * @param socket The network socket.
 * @param head The buffer of the first packet.
 */
export function handleUpgrade(req: IncomingMessage, socket: Socket, head: Buffer) {
  if (!wss) {
    console.error("WebSocket Server not initialized.");
    socket.destroy();
    return;
  }

  // Check if the request is for the specific voice path
  if (req.url === "/api/voice") {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss?.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
}