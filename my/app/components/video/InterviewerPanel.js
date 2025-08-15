 

'use client'

import Image from "next/image";

export default function InterviewerPanel() {
  return (
    <section
      aria-label="Interviewer video and status"
      className="flex-1 rounded-lg bg-black border border-gray-700 relative flex flex-col items-center justify-center text-center p-6"
    >
      <span className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold text-green-400 flex items-center space-x-1 select-none">
        <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
        <span>Listening</span>
      </span>

      <Image
        src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0b6bfcdd-23ca-41b4-a872-efcab9ef63ed.png"
        alt="Professional interviewer portrait"
        width={128}
        height={128}
        className="rounded-full object-cover shadow-lg"
        onError={(e) =>
          (e.target.src =
            "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/33e3909c-75d7-403e-aa89-bcc3ff75601c.png")
        }
      />

      <div className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-80 text-xs font-semibold text-gray-200 px-3 py-1 rounded">
        ACEINT AI
      </div>
    </section>
  );
}
 