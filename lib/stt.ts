import { SpeechClient } from "@google-cloud/speech";

// Initialize the Speech-to-Text client
// Assumes GOOGLE_APPLICATION_CREDENTIALS or similar environment variables are set
const sttClient = new SpeechClient();

// Configuration for the streaming recognition request
// We assume the client will send 16000 Hz, single-channel, 16-bit linear PCM audio
const streamingRequestConfig = {
  config: {
    encoding: "LINEAR16" as const,
    sampleRateHertz: 16000,
    languageCode: "en-US", // Default to English, will need to be dynamic for MENA
    // Enable interim results for real-time feedback
    interimResults: true,
  },
  singleUtterance: false, // Allow continuous speech
};

/**
 * Creates a streaming recognition request to Google Cloud STT.
 * @param onTranscription A callback function to handle transcription results.
 * @returns A Writable stream to send audio chunks to.
 */
export function createSttStream(
  onTranscription: (text: string, isFinal: boolean) => void
) {
  const recognizeStream = sttClient
    .streamingRecognize(streamingRequestConfig)
    .on("error", (error) => {
      console.error("STT Stream Error:", error);
    })
    .on("data", (data) => {
      const result = data.results[0];
      if (result && result.alternatives[0]) {
        const transcription = result.alternatives[0].transcript;
        const isFinal = result.isFinal;
        onTranscription(transcription, isFinal);
      }
    });

  // The first message sent to the stream must be the configuration.
  // The SDK handles this internally when calling streamingRecognize.
  // We just return the stream to pipe audio data into it.
  return recognizeStream;
}