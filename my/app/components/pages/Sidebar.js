 
'use client';

import { useAppContext } from "../context/AppContext.js";
import { LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar({ isVisible, onClose }) {
  const { user, setUser } = useAppContext();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setUser(null);

    // ✅ Safe for Next.js
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    onClose();
  };

  // ✅ Fetch history client-side only
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!user) return;
        const API_URL = "https://interview-node-eta.vercel.app";
        const identifier = user._id || user.email;

        const res = await fetch(`${API_URL}/api/results/${identifier}`);
        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
        setError(err.message);
      }
    };

    if (mounted) {
      fetchHistory();
    }
  }, [user, mounted]);

  if (!mounted) {
    return null; // ✅ Don’t render until client
  }

  return (
    <>
      {/* Backdrop Overlay */}
      {isVisible && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 max-w-[80%] sm:max-w-[60%] 
        bg-gray-800 text-white border-r border-gray-700 z-40 
        transform transition-transform duration-300
        ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Interview History</h2>
          <button onClick={onClose} className="text-white hover:text-red-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="flex flex-col items-center gap-2 mb-6">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        )}

        {/* History */}
        <div className="px-4 overflow-y-auto max-h-[60vh]">
          {error && (
            <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>
          )}

          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No past results found.</p>
          ) : (
            <ul className="space-y-2 mb-6">
              {history.map((res) => (
                <li
                  key={res._id}
                  className="p-2 rounded hover:bg-gray-700 cursor-pointer transition text-sm"
                >
                  {/* ✅ Date rendered only on client */}
                  <p className="text-gray-300">
                    📅 {new Date(res.date).toLocaleString()}
                  </p>
                  <p className="font-medium truncate">
                    {res.evaluations.slice(0, 80)}...
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Divider */}
        {user && <hr className="border-gray-700 my-4" />}

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-left 
              rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        )}
      </aside>
    </>
  );
}
