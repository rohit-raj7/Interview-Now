 

//  'use client';
// import { useState, useEffect, useRef } from 'react';
// import { evaluateAllAnswersWithGemini } from '@/app/interview/GeminiEvaluate';
// import VoiceToText from '@/app/interview/VoiceToText.js';
// import InterviewerPanel from '../components/video/InterviewerPanel.js';
// import Header from '../components/video/Header.js';
// import CandidateVideo from '../components/video/CandidateVideo.js';
// import { useAppContext } from '../components/context/AppContext.js';
// import ResultsPage from '../components/pages/ResultsPage.js';

// const ELEVEN_API_KEY = 'sk_9af56462dc1d1c7e82f8bdfda993f16d82d9e7eb5d414fab';
// const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

// export default function VoiceInterview({ onFinish }) {
//   const { questions, resumeSummary, interviewType } = useAppContext();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState([]); // ✅ store all answers
//   const [interviewOver, setInterviewOver] = useState(false);
//   const [evaluations, setEvaluations] = useState(null); // ✅ final results

//   const [speaking, setSpeaking] = useState(false);
//   const audioRef = useRef(null);
//   const spokenIndices = useRef(new Set());
//   const micRef = useRef(null);

//   // 🔊 Ask Question with TTS
//   const speakQuestion = async (text, index) => {
//     if (!text || spokenIndices.current.has(index)) return;
//     spokenIndices.current.add(index);

//     micRef.current?.stopListening();

//     try {
//       if (ELEVEN_API_KEY) {
//         setSpeaking(true);
//         const response = await fetch(
//           `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'xi-api-key': ELEVEN_API_KEY,
//             },
//             body: JSON.stringify({ text }),
//           }
//         );

//         const audioData = await response.arrayBuffer();
//         const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' }));
//         const audio = new Audio(audioUrl);
//         audioRef.current = audio;

//         audio.onended = () => {
//           setSpeaking(false);
//           micRef.current?.startListening();
//         };

//         audio.play();
//         return;
//       }
//     } catch (err) {
//       console.warn('⚠ TTS failed, fallback → browser speechSynthesis', err);
//     }

//     if ('speechSynthesis' in window) {
//       setSpeaking(true);
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = 'en-US';
//       utter.onend = () => {
//         setSpeaking(false);
//         micRef.current?.startListening();
//       };
//       speechSynthesis.speak(utter);
//     }
//   };

//   // 🎤 Candidate Answer Received
//   const handleTranscription = (finalTranscript) => {
//     if (!finalTranscript) return;

//     setAnswers((prev) => {
//       const updated = [...prev];
//       updated[currentIndex] = finalTranscript; // save Q&A
//       return updated;
//     });

//     if (currentIndex < questions.length - 1) {
//       setTimeout(() => setCurrentIndex((prev) => prev + 1), 1000);
//     } else {
//       setInterviewOver(true);
//       evaluateAll(); // ✅ run Gemini only once
//     }
//   };

//   // 📊 Run Gemini Evaluation after interview
//   const evaluateAll = async () => {
//     const results = await evaluateAllAnswersWithGemini(
//       questions,
//       answers,
//       resumeSummary,
//       interviewType
//     );
//     setEvaluations(results);
//     if (onFinish) onFinish(results);
//   };

//   // 🔄 Ask question on index change
//   useEffect(() => {
//     if (questions.length > 0 && !interviewOver) {
//       speakQuestion(questions[currentIndex], currentIndex);
//     }
//   }, [currentIndex, questions, interviewOver]);

//   if (!questions || questions.length === 0) {
//     return <div className="text-white text-center">⚠ No questions loaded.</div>;
//   }

//   if (interviewOver && evaluations) {
//     return <ResultsPage evaluations={evaluations} />;
//   }

//   return (
//     <div className="bg-gray-900 text-white flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-col md:flex-row flex-1 h-full">
//         <div className="w-full md:w-1/2 h-1/2 md:h-full">
//           <InterviewerPanel
//             speaking={speaking}
//             question={questions[currentIndex]}
//             currentIndex={currentIndex + 1}
//             totalQuestions={questions.length}
//           />
//         </div>

//         <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
//           <CandidateVideo />
//           <div className="p-4 bg-gray-800 border-t border-gray-700">
//             <VoiceToText ref={micRef} onTranscription={handleTranscription} />

//             {answers[currentIndex] && (
//               <div className="mt-3 p-2 border rounded bg-gray-100 text-gray-800">
//                 {answers[currentIndex]}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




//  'use client';
// import { useState, useEffect, useRef } from 'react';
// import { evaluateAllAnswersWithGemini } from '@/app/interview/GeminiEvaluate';
// import VoiceToText from '@/app/interview/VoiceToText.js';
// import InterviewerPanel from '../components/video/InterviewerPanel.js';
// import Header from '../components/video/Header.js';
// import CandidateVideo from '../components/video/CandidateVideo.js';
// import { useAppContext } from '../components/context/AppContext.js';
// import ResultsPage from '../components/pages/ResultsPage.js';

// const ELEVEN_API_KEY = 'sk_9af56462dc1d1c7e82f8bdfda993f16d82d9e7eb5d414fab';
// const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

// export default function VoiceInterview({ onFinish }) {
//   const { questions, resumeSummary, interviewType, duration } = useAppContext();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState([]); 
//   const [interviewOver, setInterviewOver] = useState(false);
//   const [evaluations, setEvaluations] = useState(null); 

//   const [speaking, setSpeaking] = useState(false);
//   const audioRef = useRef(null);
//   const spokenIndices = useRef(new Set());
//   const micRef = useRef(null);
//   const timerRef = useRef(null);

//   // 🔊 Ask Question with TTS
//   const speakQuestion = async (text, index) => {
//     if (!text || spokenIndices.current.has(index)) return;
//     spokenIndices.current.add(index);

//     micRef.current?.stopListening();

//     try {
//       if (ELEVEN_API_KEY) {
//         setSpeaking(true);
//         const response = await fetch(
//           `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'xi-api-key': ELEVEN_API_KEY,
//             },
//             body: JSON.stringify({ text }),
//           }
//         );

//         const audioData = await response.arrayBuffer();
//         const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' }));
//         const audio = new Audio(audioUrl);
//         audioRef.current = audio;

//         audio.onended = () => {
//           setSpeaking(false);
//           micRef.current?.startListening();
//         };

//         audio.play();
//         return;
//       }
//     } catch (err) {
//       console.warn('⚠ TTS failed, fallback → browser speechSynthesis', err);
//     }

//     if ('speechSynthesis' in window) {
//       setSpeaking(true);
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = 'en-US';
//       utter.onend = () => {
//         setSpeaking(false);
//         micRef.current?.startListening();
//       };
//       speechSynthesis.speak(utter);
//     }
//   };

//   // 🎤 Candidate Answer Received
//   const handleTranscription = (finalTranscript) => {
//     if (!finalTranscript) return;

//     setAnswers((prev) => {
//       const updated = [...prev];
//       updated[currentIndex] = finalTranscript; 
//       return updated;
//     });

//     if (currentIndex < questions.length - 1 && !interviewOver) {
//       setTimeout(() => setCurrentIndex((prev) => prev + 1), 1000);
//     } else {
//       setInterviewOver(true);
//       evaluateAll(); 
//     }
//   };

//   // 📊 Run Gemini Evaluation after interview
//   const evaluateAll = async () => {
//     if (evaluations) return; // ✅ prevent duplicate runs
//     const results = await evaluateAllAnswersWithGemini(
//       questions,
//       answers,
//       resumeSummary,
//       interviewType
//     );
//     setEvaluations(results);
//     if (onFinish) onFinish(results);
//   };

//   // ⏳ Auto-end after duration
//   useEffect(() => {
//     if (!duration) return;
//     const ms = duration * 60 * 1000;
//     timerRef.current = setTimeout(() => {
//       console.log("⏰ Interview duration ended");
//       setInterviewOver(true);
//       evaluateAll();
//     }, ms);

//     return () => clearTimeout(timerRef.current);
//   }, [duration]);

//   // 🔄 Ask question on index change
//   useEffect(() => {
//     if (questions.length > 0 && !interviewOver) {
//       speakQuestion(questions[currentIndex], currentIndex);
//     }
//   }, [currentIndex, questions, interviewOver]);

//   if (!questions || questions.length === 0) {
//     return <div className="text-white text-center">⚠ No questions loaded.</div>;
//   }

//   if (interviewOver && evaluations) {
//     return <ResultsPage evaluations={evaluations} />;
//   }

//   return (
//     <div className="bg-gray-900 text-white flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-col md:flex-row flex-1 h-full">
//         <div className="w-full md:w-1/2 h-1/2 md:h-full">
//           <InterviewerPanel
//             speaking={speaking}
//             question={questions[currentIndex]}
//             currentIndex={currentIndex + 1}
//             totalQuestions={questions.length}
//           />
//         </div>

//         <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
//           <CandidateVideo />
//           <div className="p-4 bg-gray-800 border-t border-gray-700">
//             <VoiceToText ref={micRef} onTranscription={handleTranscription} />

//             {answers[currentIndex] && (
//               <div className="mt-3 p-2 border rounded bg-gray-100 text-gray-800">
//                 {answers[currentIndex]}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import { evaluateAllAnswersWithGemini } from '@/app/interview/GeminiEvaluate';
// import VoiceToText from '@/app/interview/VoiceToText.js';
// import InterviewerPanel from '../components/video/InterviewerPanel.js';
// import Header from '../components/video/Header.js';
// import CandidateVideo from '../components/video/CandidateVideo.js';
// import { useAppContext } from '../components/context/AppContext.js';
// import ResultsPage from '../components/pages/ResultsPage.js';

// const ELEVEN_API_KEY = 'sk_9af56462dc1d1c7e82f8bdfda993f16d82d9e7eb5d414fab';
// const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

// export default function VoiceInterview({ onFinish }) {
//   const { questions, resumeSummary, interviewType, duration } = useAppContext();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [answers, setAnswers] = useState([]); 
//   const [interviewOver, setInterviewOver] = useState(false);
//   const [evaluations, setEvaluations] = useState(null); 

//   const [speaking, setSpeaking] = useState(false);
//   const [waitingToAnswer, setWaitingToAnswer] = useState(false); // 🕑 candidate thinking time
//   const audioRef = useRef(null);
//   const spokenIndices = useRef(new Set());
//   const micRef = useRef(null);
//   const timerRef = useRef(null);
//   const answerTimerRef = useRef(null);

//   // ⏳ Thinking time before mic opens
//   const THINK_TIME = 5 * 1000; // 5s to think
//   const MAX_ANSWER_TIME = 60 * 1000; // 60s max per answer

//   // 🔊 Ask Question with TTS
//   const speakQuestion = async (text, index) => {
//     if (!text || spokenIndices.current.has(index)) return;
//     spokenIndices.current.add(index);

//     micRef.current?.stopListening();

//     try {
//       if (ELEVEN_API_KEY) {
//         setSpeaking(true);
//         const response = await fetch(
//           `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_VOICE_ID}`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'xi-api-key': ELEVEN_API_KEY,
//             },
//             body: JSON.stringify({ text }),
//           }
//         );

//         const audioData = await response.arrayBuffer();
//         const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' }));
//         const audio = new Audio(audioUrl);
//         audioRef.current = audio;

//         audio.onended = () => {
//           setSpeaking(false);
//           startAnswerPhase(); // 🎤 give candidate time to think
//         };

//         audio.play();
//         return;
//       }
//     } catch (err) {
//       console.warn('⚠ TTS failed, fallback → browser speechSynthesis', err);
//     }

//     if ('speechSynthesis' in window) {
//       setSpeaking(true);
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = 'en-US';
//       utter.onend = () => {
//         setSpeaking(false);
//         startAnswerPhase();
//       };
//       speechSynthesis.speak(utter);
//     }
//   };

//   // 🕑 Give time before enabling mic
//   const startAnswerPhase = () => {
//     setWaitingToAnswer(true);
//     setTimeout(() => {
//       setWaitingToAnswer(false);
//       micRef.current?.startListening();

//       // ⏳ auto-stop after MAX_ANSWER_TIME
//       answerTimerRef.current = setTimeout(() => {
//         micRef.current?.stopListening();
//       }, MAX_ANSWER_TIME);

//     }, THINK_TIME);
//   };

//   // 🎤 Candidate Answer Received
//   const handleTranscription = (finalTranscript) => {
//     clearTimeout(answerTimerRef.current); // ✅ stop auto-stop timer

//     if (!finalTranscript) return;
//     setAnswers((prev) => {
//       const updated = [...prev];
//       updated[currentIndex] = finalTranscript; 
//       return updated;
//     });

//     if (currentIndex < questions.length - 1 && !interviewOver) {
//       setTimeout(() => setCurrentIndex((prev) => prev + 1), 1000);
//     } else {
//       setInterviewOver(true);
//       evaluateAll(); 
//     }
//   };

//   // 📊 Run Gemini Evaluation after interview
//   const evaluateAll = async () => {
//     if (evaluations) return; 
//     const results = await evaluateAllAnswersWithGemini(
//       questions,
//       answers,
//       resumeSummary,
//       interviewType
//     );
//     setEvaluations(results);
//     if (onFinish) onFinish(results);
//   };

//   // ⏳ Auto-end after duration
//   useEffect(() => {
//     if (!duration) return;
//     const ms = duration * 60 * 1000;
//     timerRef.current = setTimeout(() => {
//       console.log("⏰ Interview duration ended");
//       setInterviewOver(true);
//       evaluateAll();
//     }, ms);

//     return () => clearTimeout(timerRef.current);
//   }, [duration]);

//   // 🔄 Ask question on index change
//   useEffect(() => {
//     if (questions.length > 0 && !interviewOver) {
//       speakQuestion(questions[currentIndex], currentIndex);
//     }
//   }, [currentIndex, questions, interviewOver]);

//   if (!questions || questions.length === 0) {
//     return <div className="text-white text-center">⚠ No questions loaded.</div>;
//   }

//   if (interviewOver && evaluations) {
//     return <ResultsPage evaluations={evaluations} />;
//   }

//   return (
//     <div className="bg-gray-900 text-white flex flex-col h-screen">
//       <Header />
//       <div className="flex flex-col md:flex-row flex-1 h-full">
//         <div className="w-full md:w-1/2 h-1/2 md:h-full">
//           <InterviewerPanel
//             speaking={speaking}
//             question={questions[currentIndex]}
//             currentIndex={currentIndex + 1}
//             totalQuestions={questions.length}
//           />

//           {waitingToAnswer && (
//             <div className="text-yellow-400 text-center mt-4">
//               🕑 Take a few seconds to think...
//             </div>
//           )}
//         </div>

//         <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
//           <CandidateVideo />
//           <div className="p-4 bg-gray-800 border-t border-gray-700">
//             <VoiceToText ref={micRef} onTranscription={handleTranscription} />

//             {answers[currentIndex] && (
//               <div className="mt-3 p-2 border rounded bg-gray-100 text-gray-800">
//                 {answers[currentIndex]}
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
import { evaluateAllAnswersWithGemini } from '@/app/interview/GeminiEvaluate';
import VoiceToText from '@/app/interview/VoiceToText.js';
import InterviewerPanel from '../components/video/InterviewerPanel.js';
import Header from '../components/video/Header.js';
import CandidateVideo from '../components/video/CandidateVideo.js';
import { useAppContext } from '../components/context/AppContext.js';
import ResultsPage from '../components/pages/ResultsPage.js';

const ELEVEN_API_KEY = process.env.NEXT_PUBLIC_ELEVEN_API_KEY;
const ELEVEN_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

export default function VoiceInterview({ onFinish }) {
  const { questions, resumeSummary, interviewType, duration } = useAppContext();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [interviewOver, setInterviewOver] = useState(false);
  const [evaluations, setEvaluations] = useState(null);

  const [speaking, setSpeaking] = useState(false);
  const [waitingToAnswer, setWaitingToAnswer] = useState(false);

  const audioRef = useRef(null);
  const spokenIndices = useRef(new Set());
  const micRef = useRef(null);
  const timerRef = useRef(null);
  const answerTimerRef = useRef(null);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds

  // ⏳ Thinking & Answering
  const THINK_TIME = 3 * 1000;
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
            headers: { 'Content-Type': 'application/json', 'xi-api-key': ELEVEN_API_KEY },
            body: JSON.stringify({ text }),
          }
        );
        const audioData = await res.arrayBuffer();
        const audioUrl = URL.createObjectURL(new Blob([audioData], { type: 'audio/mpeg' }));
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = () => { setSpeaking(false); startAnswerPhase(); };
        audio.play();
        return;
      }
    } catch (err) {
      console.warn('⚠ TTS failed → fallback speechSynthesis', err);
    }

    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.onend = () => { setSpeaking(false); startAnswerPhase(); };
      speechSynthesis.speak(utter);
    }
  };

  // 🕑 Thinking phase → then mic
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
    const results = await evaluateAllAnswersWithGemini(
      questions, answers, resumeSummary, interviewType
    );
    setEvaluations(results);
    if (onFinish) onFinish(results);
  };

  // 🔚 End interview
  const endInterview = () => {
    setInterviewOver(true);
    micRef.current?.stopListening();
    evaluateAll();
  };

  // Global countdown timer
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

  // Format time mm:ss
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!questions || questions.length === 0) {
    return <div className="text-white text-center">⚠ No questions loaded.</div>;
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
              🕑 Take a few seconds to think...
            </div>
          )}
        </div>

        {/* Candidate */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
          <CandidateVideo />
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <VoiceToText ref={micRef} onTranscription={handleTranscription} />
            {answers[currentIndex] && (
              <div className="mt-3 p-2 border rounded bg-gray-100 text-gray-800">
                {answers[currentIndex]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
