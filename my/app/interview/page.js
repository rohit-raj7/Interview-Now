 
 'use client';
import { useState, useEffect, useRef } from 'react';
import { evaluateAllAnswersWithGemini } from '@/app/interview/GeminiEvaluate';
import VoiceToText from '@/app/interview/VoiceToText.js';
import InterviewerPanel from '../components/video/InterviewerPanel.js';
import Header from '../components/video/Header.js';
import CandidateVideo from '../components/video/CandidateVideo.js';
import { useAppContext } from '../components/context/AppContext.js';
import ResultsPage from '../components/pages/ResultsPage.js';
import ErrorAleart from './ErrorAlert.js'
import LoadingScreen from './LoadingScreen.js'

const ELEVEN_API_KEY = 'sk_9af56462dc1d1c7e82f8bdfda993f16d82d9e7eb5d414fab';
const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

export default function VoiceInterview({ onFinish }) {
  const { questions, resumeSummary, interviewType, duration } = useAppContext();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [interviewOver, setInterviewOver] = useState(false);
  const [evaluations, setEvaluations] = useState(null);
  const [loadingScore, setLoadingScore] = useState(false);

  const [speaking, setSpeaking] = useState(false);
  const [waitingToAnswer, setWaitingToAnswer] = useState(false);

  const audioRef = useRef(null);
  const spokenIndices = useRef(new Set());
  const micRef = useRef(null);
  const timerRef = useRef(null);
  const answerTimerRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const THINK_TIME = 500;
  const MAX_ANSWER_TIME = 60 * 1000;

  // 🔊 Ask Question
  const speakQuestion = async (text, index) => {
    if (!text || spokenIndices.current.has(index)) return;
    spokenIndices.current.add(index);

    micRef.current?.stopListening();

    try {
      if (ELEVEN_API_KEY) {
        setSpeaking(true);
        const res = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': ELEVEN_API_KEY,
            },
            body: JSON.stringify({
              text,
              voice_settings: { stability: 0.5, similarity_boost: 0.7 },
            }),
          }
        );

        if (!res.ok) throw new Error(`TTS API failed: ${res.status}`);

        const audioData = await res.arrayBuffer();
        const audioUrl = URL.createObjectURL(
          new Blob([audioData], { type: 'audio/mpeg' })
        );
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setSpeaking(false);
          startAnswerPhase();
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn('⚠ ElevenLabs TTS failed → using default voice', err);
    }

    // 🌐 Default browser fallback
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.pitch = 1;
      utter.rate = 1;
      utter.onend = () => {
        setSpeaking(false);
        startAnswerPhase();
      };
      speechSynthesis.speak(utter);
    } else {
      console.error('❌ No speechSynthesis support in this browser.');
      startAnswerPhase(); // fallback text-only
    }
  };

  // 🕑 Mic auto-start
  const startAnswerPhase = () => {
    setWaitingToAnswer(true);
    setTimeout(() => {
      setWaitingToAnswer(false);
      micRef.current?.startListening();
      answerTimerRef.current = setTimeout(() => {
        micRef.current?.stopListening();
      }, MAX_ANSWER_TIME);
    }, THINK_TIME);
  };

  // 🎤 Answer transcription
  const handleTranscription = (finalTranscript) => {
    clearTimeout(answerTimerRef.current);
    if (!finalTranscript) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = finalTranscript;
      return updated;
    });

    if (currentIndex < questions.length - 1 && !interviewOver) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 1000);
    } else {
      endInterview();
    }
  };

  // 📊 Run Gemini Evaluation
  const evaluateAll = async () => {
    if (evaluations) return;
    setLoadingScore(true);
    const results = await evaluateAllAnswersWithGemini(
      questions,
      answers,
      resumeSummary,
      interviewType
    );
    setEvaluations(results);
    setLoadingScore(false);
    if (onFinish) onFinish(results);
  };

  // 🔚 End interview
  const endInterview = () => {
    setInterviewOver(true);
    micRef.current?.stopListening();
    evaluateAll();
  };

  // Timer
  useEffect(() => {
    if (!duration) return;
    setTimeLeft(duration * 60);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          endInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [duration]);

  // Auto-ask question
  useEffect(() => {
    if (questions.length > 0 && !interviewOver) {
      speakQuestion(questions[currentIndex], currentIndex);
    }
  }, [currentIndex, questions, interviewOver]);

  // Warm up mic
  useEffect(() => {
    if (micRef.current) {
      micRef.current.startListening();
      setTimeout(() => micRef.current?.stopListening(), 500);
    }
  }, []);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
 
  if (loadingScore) {
    return ( 
       <>
       <LoadingScreen />
       </>
    );
  }

  if (!questions || questions.length === 0) {
   return ( 
    <div>
      Quesiont not loading
    <ErrorAleart/>
  </div>
);
}
 
  if (interviewOver && evaluations) {
    return <ResultsPage evaluations={evaluations} />;
  }

  return (
    <div className="bg-gray-900 text-white flex flex-col h-screen">
      <Header onEndInterview={endInterview} timeLeft={formatTime(timeLeft)} />

      <div className="flex flex-col md:flex-row flex-1 h-full">
        {/* Interviewer */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <InterviewerPanel
            speaking={speaking}
            question={questions[currentIndex]}
            currentIndex={currentIndex + 1}
            totalQuestions={questions.length}
          />
          {waitingToAnswer && (
            <div className="text-yellow-400 text-center mt-4">
              🕑 Take a moment to think...
            </div>
          )}
        </div>

        {/* Candidate */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
          <CandidateVideo />
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <VoiceToText ref={micRef} onTranscription={handleTranscription} />
            {/* {answers[currentIndex] && (
              <div className="t-2 text-gray-200 bg-gray-700 p-2 rounded">
                {answers[currentIndex]}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

 