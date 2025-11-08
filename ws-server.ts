import { WebSocketServer } from "ws";
import { handleVoiceConnection } from "./lib/voice-handler.ts";

const WS_PORT = 3001;

// Initialize the WebSocket Server
const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(`WebSocket Server listening on ws://localhost:${WS_PORT}`);
});

wss.on("connection", handleVoiceConnection);

wss.on("error", (error) => {
  console.error("WebSocket Server Error:", error);
});

console.log("Starting dedicated WebSocket Server...");