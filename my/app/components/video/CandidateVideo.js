 

'use client';

export default function CandidateVideo() {
  return (
    <section
      aria-label="Candidate video feed"
      className="w-full h-full bg-black border border-blue-500 relative flex items-center justify-center"
    >
      {/* Fullscreen toggle button */}
      <div
        className="absolute top-3 left-3 bg-gray-800 rounded-full p-1 cursor-pointer hover:bg-gray-700"
        title="Toggle fullscreen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-16h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3"
          />
        </svg>
      </div>

      {/* Candidate feed placeholder */}
      <div className="w-full h-full bg-black/90 flex items-end justify-end p-4">
        <span className="bg-gray-800 bg-opacity-80 text-gray-100 font-bold text-sm px-3 py-1 rounded select-none">
          Simple Kumar
        </span>
      </div>
    </section>
  );
}
