// 'use client';
// import { useRouter } from 'next/navigation';

// export default function ResultsPage({ evaluations }) {
//   const router = useRouter();

//   return (
//     <div className="p-4 sm:p-6 text-white bg-gray-900 min-h-screen">
//       {/* Fixed Exit Button - Top Right */}
//       <button
//         onClick={() => router.push('/')}
//         className="fixed top-3 right-3 flex items-center gap-1 sm:gap-2 w-30
//                    bg-gradient-to-r from-red-600 to-red-500 
//                    hover:from-red-700 hover:to-red-600 
//                    text-white font-semibold 
//                    text-sm sm:text-base 
//                    px-3 py-1.5 sm:px-5 sm:py-2.5 
//                    rounded-full shadow-md sm:shadow-lg 
//                    transition-all duration-300 ease-in-out z-50"
//       >
//         Exit ✖
//       </button>

//       <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center pt-12">📊 Interview Results</h2>
      
//       <pre className="whitespace-pre-wrap bg-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg text-sm sm:text-base overflow-x-auto">
//         {evaluations}
//       </pre>
//     </div>
//   );
// }


'use client';

export default function ResultsPage({ evaluations }) {
  const handleExit = () => {
    window.location.href = '/'; // reload homepage
  };

  return (
    <div className="p-4 sm:p-6 text-white bg-gray-900 min-h-screen">
      {/* Fixed Exit Button - Top Right */}
      <button
        onClick={handleExit}
        className="fixed top-3 right-3 flex items-center gap-1 sm:gap-2 w-30
                   bg-gradient-to-r from-red-600 to-red-500 
                   hover:from-red-700 hover:to-red-600 
                   text-white font-semibold 
                   text-sm sm:text-base 
                   px-3 py-1.5 sm:px-5 sm:py-2.5 
                   rounded-full shadow-md sm:shadow-lg 
                   transition-all duration-300 ease-in-out z-50"
      >
        Exit ✖
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center pt-12">📊 Interview Results</h2>
      
      <pre className="whitespace-pre-wrap bg-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg text-sm sm:text-base overflow-x-auto">
        {evaluations}
      </pre>
    </div>
  );
}
