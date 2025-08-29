
 'use client';

import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [time, setTime] = useState(new Date());
  const [countdown, setCountdown] = useState(10);

  // Digital clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (countdown === 0) {
      // Restart countdown after reaching 0
      setTimeout(() => setCountdown(10), 1000);
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Stylish circular timer with radial progress */}
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Background Circle */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="90"
            stroke="gray"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="90"
            stroke="url(#gradient)"
            strokeWidth="10"
            fill="none"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={(countdown / 10) * 2 * Math.PI * 90}
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">



              <stop offset="0%" stopColor="#3B82F6" />   {/* Blue-500 */}
              <stop offset="50%" stopColor="#6366F1" />  {/* Indigo-500 */}
              <stop offset="100%" stopColor="#ef4444" />


            </linearGradient>
          </defs>
        </svg>

        {/* Countdown number with flip animation */}
        <span
          key={countdown}
          className="text-4xl font-extrabold animate-flip text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          {countdown}
        </span>
      </div>

      {/* Text */}
      <h1 className="mt-8 text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-400 to-red-500 bg-clip-text text-transparent animate-pulse">
        Loading your score...
      </h1>

      {/* Bouncing dots */}
      <div className="flex space-x-2 mt-4">
        <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-300"></span>
      </div>

      {/* Flip animation keyframes */}
      <style jsx>{`
        @keyframes flip {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        .animate-flip {
          display: inline-block;
          animation: flip 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
