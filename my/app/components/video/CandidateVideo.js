'use client';
import { useEffect, useRef, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CandidateVideo() {
  const videoRef = useRef(null);
  const [error, setError] = useState(null);

  // ✅ Access context value
  const { user } = useContext(AppContext);

  useEffect(() => {
    const enableVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("❌ Error accessing media devices:", err);
        setError("Permission denied or no camera/microphone found.");
      }
    };

    enableVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

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
            d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-16h3a2 2 0 012 2v3m0 8v3a2 2 01-2 2h-3"
          />
        </svg>
      </div>

      {/* Candidate live feed */}
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}

      {/* Candidate name from context */}
      <div className="absolute bottom-4 right-4 bg-opacity-80 text-gray-100 font-bold text-sm px-3 py-1 rounded select-none">
        {user?.name || "Guest Candidate"}
      </div>
    </section>
  );
}
