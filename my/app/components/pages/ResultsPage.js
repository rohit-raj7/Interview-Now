 
 

'use client';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function ResultsPage({ evaluations }) {
  const { user, questions, resumeData } = useAppContext(); 
  const [error, setError] = useState(null);

  const API_URL="https://interview-node-eta.vercel.app" || "http://localhost:4000";

  const handleExit = () => {
    window.location.href = '/';
  };

  // Save result
  useEffect(() => {
    const saveResult = async () => {
      try {
        if (!user?._id && !user?.email) {
          setError("⚠️ User not logged in.");
          return;
        }

        const response = await fetch(`${API_URL}/api/results`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?._id || null,
            email: user?.email || null,
            questions,
            answers: resumeData?.answers || [],
            evaluations
          })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to save result");
        }

        console.log("✅ Result saved successfully!");
      } catch (err) {
        console.error("❌ Error saving result:", err);
        setError(err.message);
      }
    };

    saveResult();
  }, [user, evaluations, questions, resumeData]);

  

  return (
    <div className="p-4 sm:p-6 text-white bg-gray-900 min-h-screen">
      <button
        onClick={handleExit}
        className="fixed top-3 right-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 
                   text-white font-semibold px-3 py-1.5 sm:px-5 sm:py-2.5 
                   rounded-full shadow-md transition-all duration-300 z-50"
      >
        Exit ✖
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center pt-12">📊 Interview Results</h2>

      {error && (
        <div className="bg-red-600 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}

      <pre className="whitespace-pre-wrap bg-gray-800 p-3 rounded-lg shadow-md text-sm sm:text-base overflow-x-auto">
        {evaluations}
      </pre>
 
    </div>
  );
}
