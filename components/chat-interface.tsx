"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mic, Send, StopCircle } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

interface RecorderReferences {
  stream: MediaStream;
  processor: ScriptProcessorNode;
  source: MediaStreamAudioSourceNode;
}

// Constants for audio recording
const AUDIO_SAMPLE_RATE = 16000;
const AUDIO_MIME_TYPE = "audio/webm; codecs=opus"; // Common format, but we need to convert to LINEAR16 on the client or server

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<RecorderReferences | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const isPlayingRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, interimText]);

  // --- Audio Playback Logic ---
  const playNextChunk = useCallback(() => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) {
      return;
    }

    const audioBuffer = audioQueueRef.current.shift();
    if (!audioBuffer) return;

    isPlayingRef.current = true;
    const source = audioContextRef.current!.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current!.destination);
    
    source.onended = () => {
      isPlayingRef.current = false;
      playNextChunk(); // Play the next chunk immediately
    };

    audioSourceRef.current = source;
    source.start();
  }, []);

  const handleAudioChunk = useCallback((chunk: ArrayBuffer) => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext({ sampleRate: AUDIO_SAMPLE_RATE });
    }

    audioContextRef.current.decodeAudioData(chunk, (buffer) => {
      audioQueueRef.current.push(buffer);
      if (!isPlayingRef.current) {
        playNextChunk();
      }
    }, (e) => {
      console.error("Error decoding audio data:", e);
    });
  }, [playNextChunk]);

  // --- WebSocket Logic ---
  const connectWebSocket = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return wsRef.current;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    // Use a dedicated port for the WebSocket server (3001)
    const host = window.location.hostname;
    const url = `${protocol}//${host}:3001`;
    
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected.");
      toast.success("Voice channel connected.");
    };

    ws.onmessage = async (event) => {
      if (typeof event.data === "string") {
        const data = JSON.parse(event.data);
        
        if (data.type === "interim_text") {
          setInterimText(data.text);
        } else if (data.type === "tts_end") {
          // TTS finished, stop loading state
          setIsLoading(false);
          setInterimText("");
        } else if (data.type === "error") {
          toast.error(`Voice Error: ${data.message}`);
          setIsLoading(false);
          setInterimText("");
        }
      } else if (event.data instanceof ArrayBuffer) {
        // Incoming audio chunk from TTS
        handleAudioChunk(event.data);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed.");
      toast.warning("Voice channel disconnected.");
      setIsLoading(false);
      setIsRecording(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast.error("WebSocket connection failed.");
      setIsLoading(false);
      setIsRecording(false);
    };
    
    return ws;
  }, [handleAudioChunk]);

  useEffect(() => {
    connectWebSocket();
    return () => {
      wsRef.current?.close();
    };
  }, [connectWebSocket]);

  // --- Recording Logic ---
  const startRecording = async () => {
    if (isRecording || isLoading) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { sampleRate: AUDIO_SAMPLE_RATE } });
      const ws = connectWebSocket();
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        toast.error("WebSocket not ready. Please try again.");
        return;
      }

      // Use AudioContext to convert microphone audio to raw LINEAR16 PCM
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      
      // Use a ScriptProcessorNode to get raw audio data
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const inputBuffer = e.inputBuffer.getChannelData(0);
        
        // Convert float32 to Int16 (LINEAR16)
        const int16Array = new Int16Array(inputBuffer.length);
        for (let i = 0; i < inputBuffer.length; i++) {
          int16Array[i] = Math.min(1, inputBuffer[i]) * 0x7FFF;
        }
        
        // Send raw audio data over WebSocket
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(int16Array.buffer);
          console.log(`Sending audio chunk of size: ${int16Array.buffer.byteLength}`);
        }
      };

      source.connect(processor);
      processor.connect(audioContextRef.current.destination);
      
      mediaRecorderRef.current = { stream, processor, source }; // Store references to prevent garbage collection

      // Send control message to server to start STT stream
      ws.send(JSON.stringify({ type: "start_stream" }));
      
      setIsRecording(true);
      setIsLoading(true);
      setInterimText("Listening...");
      
      // Add user message placeholder
      const userMessage: Message = { id: Date.now(), text: "...", sender: "user" };
      setMessages((prev) => [...prev, userMessage]);

    } catch (error) {
      console.error("Microphone access error:", error);
      toast.error("Failed to access microphone. Ensure permissions are granted.");
      setIsRecording(false);
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;

    // Stop microphone stream and disconnect nodes
    const { stream, processor, source } = mediaRecorderRef.current!;
    stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    source.disconnect();
    processor.disconnect();
    
    // Send control message to server to stop STT stream (by closing the stream)
    // Note: The server logic currently relies on the STT stream closing when the client stops sending audio,
    // but sending a control message is safer if we were using MediaRecorder.
    // Since we are using ScriptProcessorNode, stopping the stream stops the audio process.
    // We rely on the server detecting the end of the audio stream.
    
    setIsRecording(false);
    setInterimText("Processing...");
    
    // The final transcription will be received via WebSocket, which will update the message.
  };

  // --- Text Chat Logic (Modified to handle voice transcription) ---
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Standard text chat logic (existing RAG API)
    const userMessage: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const aiMessage: Message = {
      id: Date.now() + 1,
      text: "Connecting to AI agent...",
      sender: "ai",
    };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage.text }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from AI agent.");
      }

      const data = await res.json();
      const responseText = data.response || "Sorry, I couldn't find an answer.";

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = responseText;
        return newMessages;
      });
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = "Error: Could not connect to the support agent.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
          message.sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {message.text}
      </div>
    </div>
  );

  // Update the last user message with the final transcription when received
  useEffect(() => {
    if (interimText && messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setMessages(prev => {
        const newMessages = [...prev];
        // Update the text of the last user message placeholder
        newMessages[newMessages.length - 1].text = interimText;
        return newMessages;
      });
    }
  }, [interimText]);


  return (
    <Card className="w-full max-w-3xl mx-auto h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle>Zoid AI Support Agent (Voice Enabled)</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-4">
        <div className="h-full overflow-y-auto pr-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {(isLoading || isRecording) && (
            <MessageBubble 
              message={{ 
                id: 999, 
                text: isRecording ? interimText || "Listening..." : "Agent is responding...", 
                sender: "ai" 
              }} 
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSend} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Ask a question or click the mic to speak..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isRecording}
          />
          
          {/* Voice Button */}
          <Button 
            type="button" 
            onClick={isRecording ? stopRecording : startRecording} 
            disabled={isLoading}
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          {/* Send Button (for text input) */}
          <Button type="submit" disabled={isLoading || isRecording || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}