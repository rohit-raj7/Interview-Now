


// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { askGeminiQuestion } from '@/app/interview/GeminiApi';
// import VoiceToText from '@/app/interview/VoiceToText.js';
// import InterviewerPanel from '../components/video/InterviewerPanel.js';
// import Header from '../components/video/Header.js';
// import CandidateVideo from '../components/video/CandidateVideo.js';
// import { useAppContext } from '../components/context/AppContext.js';

// const ELEVEN_API_KEY = 'sk_9af56462dc1d1c7e82f8bdfda993f16d82d9e7eb5d414fab';
// const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';


// export default function VoiceInterview({ onFinish }) {
//   const { questions, resumeSummary, interviewType } = useAppContext();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answer, setAnswer] = useState('');
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [interviewOver, setInterviewOver] = useState(false);
//   const [speaking, setSpeaking] = useState(false);
//   const audioRef = useRef(null);
//   const spokenIndices = useRef(new Set());

//   // Speak question with ElevenLabs (fallback → Web Speech)
//   const speakQuestion = async (text, index) => {
//     if (!text || spokenIndices.current.has(index)) return;
//     spokenIndices.current.add(index);

//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current = null;
//     }

//     try {
//       if (ELEVEN_API_KEY) {
//         setSpeaking(true);
//         const response = await fetch(
//           `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'xi-api-key': ELEVEN_API_KEY
//             },
//             body: JSON.stringify({
//               text,
//               voice_settings: { stability: 0.4, similarity_boost: 0.75 }
//             })
//           }
//         );

//         if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);

//         const audioData = await response.arrayBuffer();
//         const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' }));
//         const audio = new Audio(audioUrl);
//         audioRef.current = audio;
//         audio.onended = () => setSpeaking(false);
//         audio.play();
//         return;
//       }
//     } catch (err) {
//       console.warn('⚠ ElevenLabs failed, using fallback:', err);
//     }

//     if ('speechSynthesis' in window) {
//       setSpeaking(true);
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = 'en-US';
//       utter.onend = () => setSpeaking(false);
//       speechSynthesis.speak(utter);
//     }
//   };

//   const handleTranscription = (transcript) => {
//     setAnswer(transcript);
//     evaluateAnswer(transcript);
//   };

//   const evaluateAnswer = async (userAnswer) => {
//     if (!userAnswer.trim()) return;

//     const prompt = `
// You are a professional interviewer.
// Interview Type: ${interviewType}
// Question: ${questions[currentIndex]}
// Candidate's Answer: ${userAnswer}
// Candidate's Resume Summary: ${resumeSummary}

// Return ONLY:
// - Numeric score (0-10)
// - Short 1-line feedback.
//     `;

//     const modelResponse = await askGeminiQuestion(prompt, resumeSummary, interviewType);
//     const scoreMatch = modelResponse.match(/\d+/);
//     const scoreVal = scoreMatch ? parseInt(scoreMatch[0], 10) : 0;

//     setScore(prev => prev + scoreVal);
//     setFeedback(modelResponse);

//     setTimeout(() => {
//       if (currentIndex < questions.length - 1) {
//         setCurrentIndex(prev => prev + 1);
//         setAnswer('');
//         setFeedback('');
//       } else {
//         setInterviewOver(true);
//         if (onFinish) onFinish(score + scoreVal);
//       }
//     }, 2500);
//   };

//   useEffect(() => {
//     if (questions.length > 0) {
//       speakQuestion(questions[currentIndex], currentIndex);
//     }
//   }, [currentIndex, questions]);

//   if (!questions || questions.length === 0) {
//     return <div className="text-white text-center">⚠ No questions loaded. Please restart.</div>;
//   }

//   if (interviewOver) {
//     return (
//       <div className="text-center text-white">
//         <h2 className="text-2xl font-bold">Interview Finished</h2>
//         <p>Your Final Score: {score}</p>
//       </div>
//     );
//   }
// return (
//     <div className="bg-gray-900 text-white flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-col md:flex-row flex-1 h-full">
//         {/* Interviewer */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full">
//           <InterviewerPanel
//             speaking={speaking}
//             question={questions[currentIndex]}
//             currentIndex={currentIndex + 1}
//             totalQuestions={questions.length}
//           />
//         </div>

//         {/* Candidate */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
//           <CandidateVideo />

//           {/* Answer & Feedback */}
//           <div className="p-4 bg-gray-800 border-t border-gray-700">
//             <VoiceToText onTranscription={handleTranscription} />

//             {answer && (
//               <textarea
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 className="w-full p-2 text-black rounded mt-2"
//                 rows={3}
//               />
//             )}

//             {feedback && (
//               <div className="bg-green-800 p-2 rounded mt-2">
//                 <strong>Evaluation:</strong> {feedback}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

 
'use client';
import { useState, useEffect, useRef } from 'react';
import { askGeminiQuestion } from '@/app/interview/GeminiApi';
import { evaluateAnswerWithGemini } from '@/app/interview/GeminiEvaluate';
import VoiceToText from '@/app/interview/VoiceToText.js';
import InterviewerPanel from '../components/video/InterviewerPanel.js';
import Header from '../components/video/Header.js';
import CandidateVideo from '../components/video/CandidateVideo.js';
import { useAppContext } from '../components/context/AppContext.js';

const ELEVEN_API_KEY = 'your-elevenlabs-key';
const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

export default function VoiceInterview({ onFinish }) {
  const { questions, resumeSummary, interviewType } = useAppContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [interviewOver, setInterviewOver] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);
  const spokenIndices = useRef(new Set());

  // 🔊 Speak Question
  const speakQuestion = async (text, index) => {
    if (!text || spokenIndices.current.has(index)) return;
    spokenIndices.current.add(index);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      if (ELEVEN_API_KEY) {
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

        if (!response.ok) throw new Error(`TTS failed: ${response.status}`);

        const audioData = await response.arrayBuffer();
        const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' }));
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = () => setSpeaking(false);
        audio.play();
        return;
      }
    } catch (err) {
      console.warn('⚠ ElevenLabs failed, using fallback:', err);
    }

    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.onend = () => setSpeaking(false);
      speechSynthesis.speak(utter);
    }
  };

  // 🎤 Candidate Answer
  const handleTranscription = (transcript) => {
    setAnswer(transcript);
    evaluateAnswer(transcript);
  };

  // ✅ Evaluate
  const evaluateAnswer = async (userAnswer) => {
    if (!userAnswer.trim()) return;

    const modelResponse = await evaluateAnswerWithGemini(
      questions[currentIndex],
      userAnswer,
      resumeSummary,
      interviewType
    );

    const scoreMatch = modelResponse.match(/Score:\s*(\d+)/i);
    const scoreVal = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    setScore(prev => prev + scoreVal);
    setFeedback(modelResponse);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setAnswer('');
        setFeedback('');
      } else {
        setInterviewOver(true);
        if (onFinish) onFinish(score + scoreVal);
      }
    }, 2500);
  };

  useEffect(() => {
    if (questions.length > 0) {
      speakQuestion(questions[currentIndex], currentIndex);
    }
  }, [currentIndex, questions]);

  if (!questions || questions.length === 0) {
    return <div className="text-white text-center">⚠ No questions loaded. Please restart.</div>;
  }

  if (interviewOver) {
    return (
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold">Interview Finished ✅</h2>
        <p className="text-lg">Your Final Score: {score}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white flex flex-col h-screen">
      <Header />
      <div className="flex flex-col md:flex-row flex-1 h-full">
        {/* Interviewer */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <InterviewerPanel
            speaking={speaking}
            question={questions[currentIndex]}
            currentIndex={currentIndex + 1}
            totalQuestions={questions.length}
          />
        </div>

        {/* Candidate */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
          <CandidateVideo />

          {/* Answer & Feedback */}
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <VoiceToText onTranscription={handleTranscription} />

            {answer && (
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full p-2 text-black rounded mt-2"
                rows={3}
              />
            )}

            {feedback && (
              <div className="bg-green-800 p-3 rounded mt-3">
                <strong>Evaluation:</strong>
                <pre className="whitespace-pre-wrap">{feedback}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
