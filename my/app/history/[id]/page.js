"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function HistoryDetailPage() {
  const { id } = useParams(); // ✅ Get ID from URL
  const router = useRouter();
  const [history, setHistory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://interview-node-eta.vercel.app";

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/results/detail/${id}`);
        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("❌ Error fetching detail:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHistory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-300">
        Loading history...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-400">
        ⚠️ {error}
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!history) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-400">
        No history found.
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-2xl font-bold">Interview Detail</h1>
      </div>

      {/* Date */}
      <p className="text-gray-400 mb-6">
        📅 {new Date(history.date).toLocaleString()}
      </p>

      {/* Questions & Answers */}
      <div className="space-y-4">
        {history.questions && history.questions.length > 0 ? (
          history.questions.map((q, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-gray-800 border border-gray-700"
            >
              <p className="font-semibold text-blue-400">
                Q{i + 1}: {q}
              </p>
              <p className="mt-2 text-gray-300">
                <span className="font-semibold text-green-400">Answer:</span>{" "}
                {history.answers?.[i] || "N/A"}
              </p>
              <p className="mt-2 text-gray-400">
                <span className="font-semibold text-yellow-400">Evaluation:</span>{" "}
                {history.evaluations?.[i] || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No questions available.</p>
        )}
      </div>
    </div>
  );
}



 