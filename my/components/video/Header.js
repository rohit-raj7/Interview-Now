export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-800 px-6 py-3 border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <button aria-label="info" className="bg-gray-700 hover:bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M12 12h.01" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold lowercase tracking-wide">software engineer</h1>
        <span className="px-2 py-0.5 rounded-md text-xs font-semibold text-blue-600 bg-blue-200 select-none">HR</span>
      </div>

      <div className="flex items-center space-x-4">
        <button aria-label="Code view" className="bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-gray-300 text-sm flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="bg-gray-700 rounded px-3 py-1 text-xs font-semibold text-gray-200">
          08:48
        </div>
        <button 
          aria-label="Record"
          className="flex items-center gap-2 bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-white text-sm font-semibold">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
          Rec
        </button>
        <button 
          aria-label="End Interview" 
          className="bg-red-600 hover:bg-red-700 rounded px-4 py-1 text-white font-semibold text-sm transition-shadow shadow-red-800"
        >
          End Interview
        </button>
      </div>
    </header>
  );
}
