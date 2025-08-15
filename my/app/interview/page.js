 
'use client';
import { useState, useEffect, useRef } from 'react';
import { askGeminiQuestion } from '@/app/interview/GeminiApi';
import VoiceToText from '@/app/interview/VoiceToText.js';
import InterviewerPanel from '../components/video/InterviewerPanel.js';
import Header from '../components/video/Header.js';
import CandidateVideo from '../components/video/CandidateVideo.js';

const ELEVEN_API_KEY = 'sk_9af56462dc1d1c7e82f8bdfda993f16d82d9e7eb5d414fab';
const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

export default function VoiceInterview({ questions, resumeSummary, interviewType, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [interviewOver, setInterviewOver] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);
  const spokenIndices = useRef(new Set());

  const speakQuestion = async (text, index) => {
    if (spokenIndices.current.has(index)) return;
    spokenIndices.current.add(index);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (ELEVEN_API_KEY && ELEVEN_API_KEY.startsWith('sk_')) {
      try {
        setSpeaking(true);
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': ELEVEN_API_KEY
            },
            body: JSON.stringify({
              text,
              voice_settings: { stability: 0.4, similarity_boost: 0.75 }
            })
          }
        );

        if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);

        const audioData = await response.arrayBuffer();
        const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => setSpeaking(false);
        audio.play();
        return;
      } catch (err) {
        console.warn('⚠ ElevenLabs failed, using fallback:', err);
      }
    }

    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 1;
      utter.pitch = 1;
      utter.onend = () => setSpeaking(false);
      speechSynthesis.speak(utter);
    }
  };

  const handleTranscription = (transcript) => {
    setAnswer(transcript);
    evaluateAnswer(transcript);
  };

  const evaluateAnswer = async (userAnswer) => {
    if (!userAnswer.trim()) return;

    const prompt = `
You are a professional interviewer.
Interview Type: ${interviewType}
Question: ${questions[currentIndex]}
Candidate's Answer: ${userAnswer}
Candidate's Resume Summary: ${resumeSummary}

Return ONLY:
- Numeric score (0-10)
- Short 1-line feedback.
    `;

    const modelResponse = await askGeminiQuestion(prompt, resumeSummary, interviewType);
    const scoreMatch = modelResponse.match(/\d+/);
    const scoreVal = scoreMatch ? parseInt(scoreMatch[0], 10) : 0;
    setScore(prev => prev + scoreVal);
    setFeedback(modelResponse);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setAnswer('');
        setFeedback('');
      } else {
        setInterviewOver(true);
        onFinish(score + scoreVal);
      }
    }, 2500);
  };

  useEffect(() => {
    if (questions.length > 0) {
      speakQuestion(questions[currentIndex], currentIndex);
    }
  }, [currentIndex, questions]);

  if (interviewOver) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">Interview Finished</h2>
        <p>Your Final Score: {score}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white flex flex-col">
      {/* Top Bar */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 gap-4 p-4">
        {/* Left: Interviewer */}
        <div className="flex-1 rounded-lg border border-gray-700">
          <InterviewerPanel
            speaking={speaking}
            question={questions[currentIndex]}
            currentIndex={currentIndex + 1}
            totalQuestions={questions.length}
          />
        </div>

        {/* Right: Candidate */}
        <div className="flex-1 flex flex-col gap-4">
          <CandidateVideo />

          {/* Answer + Feedback */}
          <div className="bg-gray-800 p-3 rounded-lg flex-1 flex flex-col">
            <VoiceToText onTranscription={handleTranscription} />

            {answer && (
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 text-black rounded mt-2"
                rows={3}
                placeholder="Your answer will also appear here..."
              />
            )}

            {feedback && (
              <div className="bg-green-800 p-2 rounded mt-2">
                <strong>Evaluation:</strong> {feedback}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 