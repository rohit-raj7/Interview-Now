 

'use client';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

const VoiceToText = forwardRef(({ onTranscription }, ref) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(''); // ✅ keeps live transcript safe

  const createRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('❌ Speech Recognition not supported.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false; // record per question
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
      setTranscript('');
      transcriptRef.current = '';
    };

    recognition.onresult = (event) => {
      let live = '';
      for (let i = 0; i < event.results.length; i++) {
        live += event.results[i][0].transcript;
      }
      transcriptRef.current = live.trim(); // ✅ latest words
      setTranscript(live.trim());
    };

    recognition.onend = () => {
      setListening(false);
      if (transcriptRef.current && onTranscription) {
        onTranscription(transcriptRef.current); // ✅ final safe value
      }
    };

    recognition.onerror = (event) => {
      console.warn('⚠ Error:', event.error);
      setListening(false);
    };

    return recognition;
  };

  const startListening = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current = createRecognition();
      recognitionRef.current?.start();
    } catch (err) {
      console.error('❌ Mic permission denied.', err);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  };

  useImperativeHandle(ref, () => ({
    startListening,
    stopListening,
  }));

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

      {/* Optional live transcript preview */}
      {/* {transcript && (
        <div className="mt-2 text-gray-200 bg-gray-700 p-2 rounded">
          {transcript}
        </div>
      )} */}
    </div>
  );
});

export default VoiceToText;
