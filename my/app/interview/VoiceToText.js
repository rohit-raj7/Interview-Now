 
'use client';
import { useState, useRef } from 'react';

export default function VoiceToText({ onTranscription }) {
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
    recognition.interimResults = true; // live updates

    recognition.onstart = () => {
      console.log('🎤 Listening...');
      setListening(true);
      setTranscript(''); // ✅ clear old transcript at start
    };

    recognition.onresult = (event) => {
      let liveTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        liveTranscript += event.results[i][0].transcript;
      }
      setTranscript(liveTranscript.trim());

      // 🔑 Send the full current transcript to parent
      if (onTranscription) {
        onTranscription(liveTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.warn('⚠ Error:', event.error);
      if (event.error === 'no-speech') return; // ignore silence
      stopListening();
    };

    recognition.onend = () => {
      console.log('🛑 Recognition ended');
      setListening(false);
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

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null; // reset instance
      setListening(false);
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

      {/* ✅ Always display transcript in one place */}
      {/* <div className="mt-3 p-2 border rounded bg-gray-100 text-gray-800 min-h-[50px]">
        {transcript || '🎙️ Speak to see transcript here...'}
      </div> */}
    </div>
  );
}

 

 