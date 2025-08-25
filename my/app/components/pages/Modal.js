'use client';

import React from "react";
import { X } from "lucide-react"; // optional icon (lucide-react)

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className=" text-white w-[90%] max-w-md rounded-2xl shadow-lg p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>}

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
