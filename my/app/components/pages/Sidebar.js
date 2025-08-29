 
// // 'use client';

// // import { useAppContext } from "../context/AppContext.js";
// // import { LogOut, X } from "lucide-react";
// // import { useEffect, useState } from "react";

// // export default function Sidebar({ isVisible, onClose }) {
// //   const { user, setUser } = useAppContext();
// //   const [history, setHistory] = useState([]);
// //   const [error, setError] = useState(null);
// //   const [mounted, setMounted] = useState(false);

// //   // ✅ Prevent hydration mismatch
// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   const handleLogout = () => {
// //     setUser(null);

// //     // ✅ Safe for Next.js
// //     if (typeof window !== "undefined") {
// //       localStorage.removeItem("user");
// //     }

// //     onClose();
// //   };

// //   // ✅ Fetch history client-side only
// //   useEffect(() => {
// //     const fetchHistory = async () => {
// //       try {
// //         if (!user) return;
// //         const API_URL = "https://interview-node-eta.vercel.app";
// //         const identifier = user._id || user.email;

// //         const res = await fetch(`${API_URL}/api/results/${identifier}`);
// //         if (!res.ok) throw new Error("Failed to fetch history");

// //         const data = await res.json();
// //         setHistory(data);
// //       } catch (err) {
// //         console.error("❌ Error fetching history:", err);
// //         setError(err.message);
// //       }
// //     };

// //     if (mounted) {
// //       fetchHistory();
// //     }
// //   }, [user, mounted]);

// //   if (!mounted) {
// //     return null; // ✅ Don’t render until client
// //   }

// //   return (
// //     <>
// //       {/* Backdrop Overlay */}
// //       {isVisible && (
// //         <div
// //           onClick={onClose}
// //           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside
// //         className={`fixed top-0 left-0 h-full w-64 max-w-[80%] sm:max-w-[60%] 
// //         bg-gray-800 text-white border-r border-gray-700 z-40 
// //         transform transition-transform duration-300
// //         ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
// //       >
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-700">
// //           <h2 className="text-xl font-bold">Interview History</h2>
// //           <button onClick={onClose} className="text-white hover:text-red-400">
// //             <X className="w-6 h-6" />
// //           </button>
// //         </div>

// //         {/* User Info */}
// //         {user && (
// //           <div className="flex flex-col items-center gap-2 mb-6">
// //             <p className="font-semibold">{user.name}</p>
// //             <p className="text-sm text-gray-400">{user.email}</p>
// //           </div>
// //         )}

// //         {/* History */}
// //         <div className="px-4 overflow-y-auto max-h-[60vh]">
// //           {error && (
// //             <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>
// //           )}

// //           {history.length === 0 ? (
// //             <p className="text-gray-400 text-sm">No past results found.</p>
// //           ) : (
// //             <ul className="space-y-2 mb-6">
// //               {history.map((res) => (
// //                 <li
// //                   key={res._id}
// //                   className="p-2 rounded hover:bg-gray-700 cursor-pointer transition text-sm"
// //                 >
// //                   {/* ✅ Date rendered only on client */}
// //                   <p className="text-gray-300">
// //                     📅 {new Date(res.date).toLocaleString()}
// //                   </p>
// //                   <p className="font-medium truncate">
// //                     {res.evaluations.slice(0, 80)}...
// //                   </p>
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>

// //         {/* Divider */}
// //         {user && <hr className="border-gray-700 my-4" />}

// //         {/* Logout Button */}
// //         {user && (
// //           <button
// //             onClick={handleLogout}
// //             className="flex items-center gap-2 w-full px-4 py-2 text-left 
// //               rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-medium"
// //           >
// //             <LogOut className="w-5 h-5" />
// //             Logout
// //           </button>
// //         )}
// //       </aside>
// //     </>
// //   );
// // }


// 'use client';

// import { useAppContext } from "../context/AppContext.js";
// import { LogOut, X, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Sidebar({ isVisible, onClose }) {
//   const { user, setUser } = useAppContext();
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState(null);
//   const [mounted, setMounted] = useState(false);
//   const [selectedId, setSelectedId] = useState(null); // ✅ Track selected chat

//   const API_URL = "https://interview-node-eta.vercel.app";

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleLogout = () => {
//     setUser(null);
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("user");
//     }
//     onClose();
//   };

//   // ✅ Fetch history
//   const fetchHistory = async () => {
//     try {
//       if (!user) return;
//       const identifier = user._id || user.email;

//       const res = await fetch(`${API_URL}/api/results/${identifier}`);
//       if (!res.ok) throw new Error("Failed to fetch history");

//       const data = await res.json();
//       setHistory(data);
//     } catch (err) {
//       console.error("❌ Error fetching history:", err);
//       setError(err.message);
//     }
//   };

//   // ✅ Delete handler
//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`${API_URL}/api/results/${id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) throw new Error("Failed to delete result");

//       setHistory((prev) => prev.filter((item) => item._id !== id));
//       setSelectedId(null); // hide delete button after deleting
//     } catch (err) {
//       console.error("❌ Error deleting result:", err);
//       alert("Error deleting result");
//     }
//   };

//   useEffect(() => {
//     if (mounted) {
//       fetchHistory();
//     }
//   }, [user, mounted]);

//   if (!mounted) return null;

//   return (
//     <>
//       {isVisible && (
//         <div
//           onClick={onClose}
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//         />
//       )}

//       <aside
//         className={`fixed top-0 left-0 h-full w-64 max-w-[80%] sm:max-w-[60%] 
//         bg-gray-800 text-white border-r border-gray-700 z-40 
//         transform transition-transform duration-300
//         ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-700">
//           <h2 className="text-xl font-bold">Interview History</h2>
//           <button onClick={onClose} className="text-white hover:text-red-400">
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* User Info */}
//         {user && (
//           <div className="flex flex-col items-center gap-2 mb-6">
//             <p className="font-semibold">{user.name}</p>
//             <p className="text-sm text-gray-400">{user.email}</p>
//           </div>
//         )}

//         {/* History */}
//         <div className="px-4 overflow-y-auto max-h-[60vh]">
//           {error && <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>}

//           {history.length === 0 ? (
//             <p className="text-gray-400 text-sm">No past results found.</p>
//           ) : (
//             <ul className="space-y-2 mb-6">
//               {history.map((res) => (
//                 <li
//                   key={res._id}
//                   className={`p-2 rounded transition text-sm relative cursor-pointer 
//                     ${selectedId === res._id ? "bg-gray-700" : "hover:bg-gray-700"}`}
//                   onClick={() =>
//                     setSelectedId((prev) => (prev === res._id ? null : res._id))
//                   }
//                 >
//                   <div>
//                     <p className="text-gray-300">
//                       📅 {new Date(res.date).toLocaleString()}
//                     </p>
//                     <p className="font-medium truncate">
//                       {res.evaluations.slice(0, 80)}...
//                     </p>
//                   </div>

//                   {/* ✅ Show delete button only when clicked */}
//                   {selectedId === res._id && (
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation(); // prevent re-toggle
//                         handleDelete(res._id);
//                       }}
//                       className="absolute top-2 right-2 text-red-400 hover:text-red-600"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Divider */}
//         {user && <hr className="border-gray-700 my-4" />}

//         {/* Logout */}
//         {user && (
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 w-full px-4 py-2 text-left 
//               rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-medium"
//           >
//             <LogOut className="w-5 h-5" />
//             Logout
//           </button>
//         )}
//       </aside>
//     </>
//   );
// }




'use client';

import { useAppContext } from "../context/AppContext.js";
import { LogOut, X, Trash2, ExternalLink } from "lucide-react"; // ✅ Added ExternalLink for Open
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ For navigation

export default function Sidebar({ isVisible, onClose }) {
  const { user, setUser } = useAppContext();
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const router = useRouter();
  const API_URL = "https://interview-node-eta.vercel.app";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    onClose();
  };

  // ✅ Fetch history
  const fetchHistory = async () => {
    try {
      if (!user) return;
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

  // ✅ Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/results/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete result");

      setHistory((prev) => prev.filter((item) => item._id !== id));
      setSelectedId(null);
    } catch (err) {
      console.error("❌ Error deleting result:", err);
      alert("Error deleting result");
    }
  };

  // ✅ Open handler (navigate)
  const handleOpen = (id) => {
    router.push(`/history/${id}`);
  };

  useEffect(() => {
    if (mounted) {
      fetchHistory();
    }
  }, [user, mounted]);

  if (!mounted) return null;

  return (
    <>
      {isVisible && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

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
          {error && <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>}

          {history.length === 0 ? (
            <p className="text-gray-400 text-sm">No past results found.</p>
          ) : (
            <ul className="space-y-2 mb-6">
              {history.map((res) => (
                <li
                  key={res._id}
                  className={`p-2 rounded transition text-sm relative cursor-pointer 
                    ${selectedId === res._id ? "bg-gray-700" : "hover:bg-gray-700"}`}
                  onClick={() =>
                    setSelectedId((prev) => (prev === res._id ? null : res._id))
                  }
                >
                  <div>
                    <p className="text-gray-300">
                      📅 {new Date(res.date).toLocaleString()}
                    </p>
                    <p className="font-medium truncate">
                      {res.evaluations.slice(0, 80)}...
                    </p>
                  </div>

                  {/* ✅ Show action buttons only when selected */}
                  {selectedId === res._id && (
                    <div className="absolute top-2 right-2 flex gap-2">
                      {/* Open Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen(res._id);
                        }}
                        className="text-blue-400 hover:text-blue-600"
                        title="Open this chat"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(res._id);
                        }}
                        className="text-red-400 hover:text-red-600"
                        title="Delete this chat"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Divider */}
        {user && <hr className="border-gray-700 my-4" />}

        {/* Logout */}
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
