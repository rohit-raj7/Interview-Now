'use client';
import { useState, useRef } from 'react';

export default function VoiceToText() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const createRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('❌ Speech Recognition not supported. Use Chrome/Edge or fallback API.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('🎤 Listening...');
      setListening(true);
    };

    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        const text = event.results[event.results.length - 1][0].transcript.trim();
        setTranscript((prev) => prev + ' ' + text);
        console.log('📝 Transcript:', text);
      }
    };

    recognition.onerror = (event) => {
      console.warn('⚠ Error:', event.error);
      stopListening();
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start(); // keep alive until user stops
      }
    };

    return recognition;
  };

  const startListening = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!recognitionRef.current) {
        recognitionRef.current = createRecognition();
      }
      recognitionRef.current?.start();
    } catch (err) {
      alert('❌ Microphone permission denied.');
      console.error(err);
    }
  };

  const stopListening = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }

    if (transcript.trim() !== '') {
      try {
        console.log('📤 Sending to API:', transcript);
        const res = await fetch('/api/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: transcript }),
        });
        const data = await res.json();
        console.log('✅ API Response:', data);
      } catch (error) {
        console.error('❌ API Error:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={listening ? stopListening : startListening}
        className={`px-4 py-2 rounded text-white ${
          listening ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        {listening ? '⏹ Stop Recording' : '🎤 Start Recording'}
      </button>

      {transcript && (
        <p className="mt-3 p-2 border rounded bg-gray-100 text-gray-800">
          {transcript}
        </p>
      )}
    </div>
  );
}
