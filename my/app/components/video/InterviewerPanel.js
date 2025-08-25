 
 


'use client'

import Image from "next/image";

export default function InterviewerPanel({ speaking, question, currentIndex, totalQuestions }) {
  return (
    <section
      aria-label="Interviewer video and status"
      className="w-full h-full bg-black border border-gray-700 relative flex flex-col items-center justify-center text-center"
    >
      {/* Top Right Status */}
      <span className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold text-green-400 flex items-center space-x-1 select-none">
        <span className={`w-2 h-2 rounded-full ${speaking ? "bg-green-500 animate-pulse" : "bg-gray-500"} block`}></span>
        <span>{speaking ? "Speaking" : "Listening"}</span>
      </span>

      {/* Interviewer Face */}
      <Image
        src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0b6bfcdd-23ca-41b4-a872-efcab9ef63ed.png"
        alt="Professional interviewer portrait"
        width={256}
        height={256}
        className="rounded-full object-cover shadow-xl"
        onError={(e) =>
          (e.target.src =
            "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/33e3909c-75d7-403e-aa89-bcc3ff75601c.png")
        }
      />

      {/* Question (Overlay Bottom) */}
      <div className="absolute bottom-20 bg-gray-900 bg-opacity-80 px-4 py-2 rounded text-sm max-w-[80%]">
        <p className="font-semibold text-gray-200">Q{currentIndex}/{totalQuestions}:</p>
        <p className="text-white">{question}</p>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-80 text-xs font-semibold text-gray-200 px-3 py-1 rounded">
         AI
      </div>
    </section>
  );
}
