import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { Writable } from "stream";

// Initialize the Text-to-Speech client
const ttsClient = new TextToSpeechClient();

// Define the voice configuration for MENA region (Arabic/English)
// We'll use a standard English voice for now, but this should be configurable.
const voiceConfig = {
  languageCode: "en-US",
  name: "en-US-Standard-C", // A standard female voice
};

// Define the audio configuration
const audioConfig = {
  audioEncoding: "LINEAR16" as const, // Raw audio format for streaming
  sampleRateHertz: 16000, // Match STT sample rate
};

/**
 * Converts text to speech and streams the audio data to a Writable stream.
 * @param text The text to synthesize.
 * @param outputStream The Writable stream to pipe the audio data to (e.g., a WebSocket).
 * @returns A promise that resolves when the synthesis is complete.
 */
export async function synthesizeSpeechStream(
  text: string,
  outputStream: Writable
): Promise<void> {
  const request = {
    input: { text: text },
    voice: voiceConfig,
    audioConfig: audioConfig,
  };

  try {
    // The synthesizeSpeech API returns the full audio content as a buffer.
    // For true streaming, we would need a different API or a custom chunking mechanism.
    // Since Google Cloud TTS standard API returns a single buffer, we will chunk it manually
    // to simulate streaming over the WebSocket.
    const [response] = await ttsClient.synthesizeSpeech(request);

    if (response.audioContent) {
      const audioBuffer = response.audioContent as Buffer;
      const chunkSize = 4096; // 4KB chunks
      
      for (let i = 0; i < audioBuffer.length; i += chunkSize) {
        const chunk = audioBuffer.slice(i, i + chunkSize);
        // Write the chunk to the output stream
        outputStream.write(chunk);
        // Introduce a small delay to simulate real-time streaming latency
        await new Promise(resolve => setTimeout(resolve, 10)); 
      }
    }
    
    // Signal the end of the audio stream
    outputStream.end();

  } catch (error) {
    console.error("TTS Synthesis Error:", error);
    outputStream.end(); // Ensure the stream is closed on error
    throw error;
  }
}