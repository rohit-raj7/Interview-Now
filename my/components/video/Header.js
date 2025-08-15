 

// Header.jsx
export default function Header({ interviewTitle = "software engineer", timer = "08:48" }) {
  return (
    <header className="flex items-center justify-between bg-gray-800 px-6 py-3 border-b border-gray-700 shadow-md">
      <div className="flex items-center space-x-3">
        {/* Info Button */}
        <button
          aria-label="Info"
          className="bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-gray-300 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M12 12h.01" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-lg font-semibold capitalize tracking-wide">{interviewTitle}</h1>

        {/* Role Badge */}
        <span className="px-2 py-0.5 rounded-md text-xs font-semibold text-blue-600 bg-blue-200 select-none">
          HR
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Timer */}
        <div className="bg-gray-700 rounded px-3 py-1 text-xs font-semibold text-gray-200">
          {timer}
        </div>

        {/* Record Button */}
        <button
          aria-label="Record"
          className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-white text-sm font-semibold transition"
        >
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          Rec
        </button>

        {/* End Interview */}
        <button
          aria-label="End Interview"
          className="bg-red-600 hover:bg-red-700 rounded px-4 py-1 text-white font-semibold text-sm shadow-md transition"
        >
          End Interview
        </button>
      </div>
    </header>
  );
}

