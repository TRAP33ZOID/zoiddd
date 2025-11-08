import speech from "@google-cloud/speech";
import textToSpeech from "@google-cloud/text-to-speech";
import * as fs from "fs";
import * as path from "path";

// Get the credentials from the JSON file
const credentialsPath = path.join(process.cwd(), "lib", "google-cloud-key.json");
if (!fs.existsSync(credentialsPath)) {
  throw new Error(`Google Cloud credentials not found at ${credentialsPath}`);
}

// Initialize Google Cloud clients
const speechClient = new speech.SpeechClient({
  keyFilename: credentialsPath,
});

const ttsClient = new textToSpeech.TextToSpeechClient({
  keyFilename: credentialsPath,
});

/**
 * Converts audio buffer (WAV/MP3) to text using Google Cloud Speech-to-Text
 * @param audioBuffer The audio data as a Buffer
 * @param encoding Audio encoding (LINEAR16, MP3, etc.)
 * @returns Promise resolving to transcribed text
 */
export async function speechToText(
  audioBuffer: Buffer,
  encoding: string = "LINEAR16"
): Promise<string> {
  const audio = {
    content: audioBuffer,
  };

  const config = {
    encoding: encoding,
    languageCode: "en-US",
    model: "latest_long",
  };

  const request = {
    config,
    audio,
  };

  try {
    const [response] = await speechClient.recognize(request as any);
    const transcription = response.results
      ?.map(
        (result: any) =>
          result.alternatives?.[0]?.transcript || ""
      )
      .join("\n");

    if (!transcription) {
      throw new Error("No transcription result from Google Cloud Speech");
    }

    return transcription;
  } catch (error) {
    console.error("STT Error:", error);
    throw new Error("Failed to convert speech to text");
  }
}

/**
 * Converts text to speech audio using Google Cloud Text-to-Speech
 * @param text The text to convert to speech
 * @param languageCode Language code (default: en-US)
 * @returns Promise resolving to audio content as Buffer
 */
export async function textToAudio(
  text: string,
  languageCode: string = "en-US"
): Promise<Buffer> {
  const request = {
    input: { text },
    voice: {
      languageCode,
      ssmlGender: "NEUTRAL",
    },
    audioConfig: {
      audioEncoding: "MP3",
      pitch: 0,
      speakingRate: 1,
    },
  };

  try {
    const [response] = await ttsClient.synthesizeSpeech(request as any);
    const audioContent = response.audioContent;

    if (!audioContent) {
      throw new Error("No audio content from Google Cloud Text-to-Speech");
    }

    // Convert to Buffer if it's a Uint8Array
    return Buffer.isBuffer(audioContent)
      ? audioContent
      : Buffer.from(audioContent);
  } catch (error) {
    console.error("TTS Error:", error);
    throw new Error("Failed to convert text to speech");
  }
}