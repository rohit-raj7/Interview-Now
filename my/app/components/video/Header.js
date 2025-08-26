 

 'use client';
import { useAppContext } from '../context/AppContext';

export default function Header({ onEndInterview, timeLeft }) {
  const { interviewType } = useAppContext();

  return (
    <header className="flex flex-wrap items-center justify-between bg-gray-800 px-4 sm:px-6 py-2 sm:py-3 border-b border-gray-700 shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          aria-label="Info"
          className="bg-gray-700 hover:bg-gray-600 rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-300 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 12h.01" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-sm sm:text-base md:text-lg font-semibold capitalize tracking-wide text-gray-100">
          {interviewType || "Interview"}
        </h1>

        {/* Role Badge */}
        <span className="px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-200 select-none">
          AI
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
        {/* Timer */}
        <div className="bg-gray-700 rounded px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold text-gray-200">
          {timeLeft}
        </div>

        {/* Record Button */}
        <div
          aria-label="Record"
          className="flex items-center gap-1 sm:gap-2 bg-red-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded text-white text-[10px] sm:text-sm font-semibold"
        >
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse"></div>
          Rec
        </div>

        {/* End Interview */}
        <button
          aria-label="End Interview"
          onClick={onEndInterview}
          className="bg-red-600 hover:bg-red-400 cursor-pointer rounded px-2 sm:px-4 py-0.5 sm:py-1 text-white font-semibold text-[10px] sm:text-sm shadow-md transition"
        >
          End
        </button>
      </div>
    </header>
  );
}
