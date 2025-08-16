 

 'use client';
import { useState, useRef } from 'react';

export default function VoiceToText({ onTranscription }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const createRecognition = () => {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true; // ✅ keeps it running
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      console.log('🎤 Listening...');
    };

    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        onTranscription(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);

      if (event.error === 'no-speech') {
        console.log('⚠ No speech detected. Restarting...');
        recognition.stop();
        setTimeout(() => recognition.start(), 500); // restart after 0.5s
      } 
      else if (event.error === 'audio-capture') {
        alert('No microphone found. Please check your device settings.');
        stopListening();
      } 
      else {
        stopListening();
      }
    };

    recognition.onend = () => {
      // Only restart if listening should continue
      if (listening) {
        console.log('🔄 Restarting recognition...');
        recognition.start();
      }
    };

    return recognition;
  };

  const startListening = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true }); // ✅ pre-ask permission
      recognitionRef.current = createRecognition();
      recognitionRef.current.start();
    } catch (err) {
      alert('Microphone permission denied.');
      console.error(err);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
    <div>
      <button
        onClick={listening ? stopListening : startListening}
        className={`px-4 py-2 rounded ${listening ? 'bg-red-500' : 'bg-blue-500'}`}
      >
        {listening ? '⏹ Stop Recording' : '🎤 Start Recording'}
      </button>
    </div>
  );
}
