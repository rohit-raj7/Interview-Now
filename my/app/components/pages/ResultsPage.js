 
 

// // 'use client';
// // import { useEffect, useState } from 'react';
// // import { useAppContext } from '../context/AppContext';

// // export default function ResultsPage({ evaluations }) {
// //   const { user, questions, resumeData } = useAppContext(); 
// //   const [error, setError] = useState(null);

// //   const API_URL="https://interview-node-eta.vercel.app" || "http://localhost:4000";

// //   const handleExit = () => {
// //     window.location.href = '/';
// //   };

// //   // Save result
// //   useEffect(() => {
// //     const saveResult = async () => {
// //       try {
// //         if (!user?._id && !user?.email) {
// //           setError("⚠️ User not logged in.");
// //           return;
// //         }

// //         const response = await fetch(`${API_URL}/api/results`, {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             userId: user?._id || null,
// //             email: user?.email || null,
// //             questions,
// //             answers: resumeData?.answers || [],
// //             evaluations
// //           })
// //         });

// //         if (!response.ok) {
// //           const errData = await response.json();
// //           throw new Error(errData.error || "Failed to save result");
// //         }

// //         console.log("✅ Result saved successfully!");
// //       } catch (err) {
// //         console.error("❌ Error saving result:", err);
// //         setError(err.message);
// //       }
// //     };

// //     saveResult();
// //   }, [user, evaluations, questions, resumeData]);

  

// //   return (
// //     <div className="p-4 sm:p-6 text-white bg-gray-900 min-h-screen">
// //       <button
// //         onClick={handleExit}
// //         className="fixed top-3 right-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 
// //                    text-white font-semibold px-3 py-1.5 sm:px-5 sm:py-2.5 
// //                    rounded-full shadow-md transition-all duration-300 z-50"
// //       >
// //         Exit ✖
// //       </button>

// //       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center pt-12">📊 Interview Results</h2>

// //       {error && (
// //         <div className="bg-red-600 text-white p-3 rounded mb-4">
// //           {error}
// //         </div>
// //       )}

// //       <pre className="whitespace-pre-wrap bg-gray-800 p-3 rounded-lg shadow-md text-sm sm:text-base overflow-x-auto">
// //         {evaluations}
// //       </pre>
 
// //     </div>
// //   );
// // }

// 'use client';
// import { useEffect, useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
//   BarChart, Bar, PieChart, Pie, Cell
// } from 'recharts';

// export default function ResultsPage({ evaluations }) {
//   const { user, questions, resumeData } = useAppContext();
//   const [error, setError] = useState(null);

//   const API_URL = "https://interview-node-eta.vercel.app" || "http://localhost:4000";

//   const handleExit = () => {
//     window.location.href = '/';
//   };

//   // Save result
//   useEffect(() => {
//     const saveResult = async () => {
//       try {
//         if (!user?._id && !user?.email) {
//           setError("⚠️ User not logged in.");
//           return;
//         }

//         const response = await fetch(`${API_URL}/api/results`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: user?._id || null,
//             email: user?.email || null,
//             questions,
//             answers: resumeData?.answers || [],
//             evaluations
//           })
//         });

//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errData.error || "Failed to save result");
//         }

//         console.log("✅ Result saved successfully!");
//       } catch (err) {
//         console.error("❌ Error saving result:", err);
//         setError(err.message);
//       }
//     };

//     saveResult();
//   }, [user, evaluations, questions, resumeData]);

//   // ---- Safe parsed results with defaults ----
//   const results = {
//     overallScore: evaluations?.overallScore ?? 72,
//     strengths: evaluations?.strengths ?? ["Problem Solving", "System Design"],
//     improvements: evaluations?.improvements ?? ["Communication", "Time Management"],
//     questionScores: evaluations?.questionScores ?? [
//       { question: "Q1", score: 80 },
//       { question: "Q2", score: 65 },
//       { question: "Q3", score: 90 },
//       { question: "Q4", score: 55 },
//       { question: "Q5", score: 70 },
//     ],
//   };

//   const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

//   return (
//     <div className="p-4 sm:p-6 text-white bg-gray-900 min-h-screen">
//       {/* Exit Button */}
//       <button
//         onClick={handleExit}
//         className="fixed top-3 right-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 
//                    text-white font-semibold px-3 py-1.5 sm:px-5 sm:py-2.5 
//                    rounded-full shadow-md transition-all duration-300 z-50"
//       >
//         Exit ✖
//       </button>

//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center pt-12">📊 Interview Results</h2>

//       {error && (
//         <div className="bg-red-600 text-white p-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {/* Overall Score */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-gray-800 p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-3">Overall Score</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: "Score", value: results.overallScore },
//                   { name: "Remaining", value: 100 - results.overallScore },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//                 dataKey="value"
//               >
//                 <Cell fill="#00C49F" />
//                 <Cell fill="#444" />
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//           <p className="text-center text-xl font-bold">{results.overallScore}%</p>
//         </div>

//         {/* Strengths vs Improvements */}
//         <div className="bg-gray-800 p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold mb-3">Highlights</h3>
//           <p className="mb-2">
//             <span className="font-bold text-green-400">✅ Strengths:</span>{" "}
//             {results.strengths.length > 0 ? results.strengths.join(", ") : "No strengths detected"}
//           </p>
//           <p>
//             <span className="font-bold text-red-400">⚠️ Improvements:</span>{" "}
//             {results.improvements.length > 0 ? results.improvements.join(", ") : "No improvement suggestions"}
//           </p>
//         </div>
//       </div>

//       {/* Question Scores */}
//       <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-8">
//         <h3 className="text-lg font-semibold mb-3">Per-Question Performance</h3>
//         {results.questionScores.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={results.questionScores}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="question" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="score" fill="#0088FE" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-gray-400">No question performance data available.</p>
//         )}
//       </div>

//       {/* Raw JSON (optional for debugging) */}
//       {error && (
//         <div className="bg-red-600 text-white p-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <pre className="whitespace-pre-wrap bg-gray-800 p-3 rounded-lg shadow-md text-sm sm:text-base overflow-x-auto">
//         {evaluations}
//       </pre>
//     </div>
//   );
// }



'use client';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import {
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export default function ResultsPage({ evaluations }) {
  const { user, questions, resumeData } = useAppContext();
  const [error, setError] = useState(null);

  const API_URL = "https://interview-node-eta.vercel.app" || "http://localhost:4000";

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

  // ✅ Safe parsed results with proper fallback (0 instead of 72)
  const results = {
    overallScore: typeof evaluations?.overallScore === "number" ? evaluations.overallScore : 0,
    strengths: evaluations?.strengths ?? [],
    improvements: evaluations?.improvements ?? [],
    questionScores: evaluations?.questionScores ?? [],
  };

  return (
    <div className="p-4 sm:p-6 text-white bg-gray-900 min-h-screen">
      {/* Exit Button */}
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
        <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>
      )}

      {/* Overall Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Overall Score</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: "Score", value: results.overallScore },
                  { name: "Remaining", value: Math.max(0, 100 - results.overallScore) },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                <Cell fill="#00C49F" />
                <Cell fill="#444" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-xl font-bold">{results.overallScore}%</p>
        </div>

        {/* Strengths vs Improvements */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-3">Highlights</h3>
          <p className="mb-2">
            <span className="font-bold text-green-400">✅ Strengths:</span>{" "}
            {results.strengths.length > 0 ? results.strengths.join(", ") : "No strengths detected"}
          </p>
          <p>
            <span className="font-bold text-red-400">⚠️ Improvements:</span>{" "}
            {results.improvements.length > 0 ? results.improvements.join(", ") : "No improvement suggestions"}
          </p>
        </div>
      </div>

      {/* Question Scores */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-3">Per-Question Performance</h3>
        {results.questionScores.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={results.questionScores}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No question performance data available.</p>
        )}
      </div>

      {/* Debug JSON */}
     <pre className="whitespace-pre-wrap bg-gray-800 p-3 rounded-lg shadow-md text-sm sm:text-base overflow-x-auto">
      {evaluations}
             </pre>
    </div>
  );
}
 
 