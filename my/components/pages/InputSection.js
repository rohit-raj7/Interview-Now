"use client";

import { useState } from "react";

export default function InputSection() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      console.log("Send:", input);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl">
        <p className="mb-4 text-sm sm:text-base text-gray-400 select-none">
          💬 <span className="font-medium">Ask me for interview tips</span>
        </p>

        <div className="flex items-center gap-3">
          {/* Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 sm:py-2.5 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder:text-gray-500 text-sm sm:text-base"
          />

          {/* Send Button */}

          <button
            onClick={handleSend}
            type="button"
            aria-label="Send message"
            className="relative group p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
          >
            <span className="block w-3 h-3 border-t-2 border-r-2 rotate-45 transform origin-center group-hover:scale-110 transition duration-200"></span>
          </button>


        </div>
      </div>
    </div>
  );
}
