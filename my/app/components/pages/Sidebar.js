'use client';

import { useAppContext } from "../context/AppContext.js";
import { LogOut, X } from "lucide-react"; // Added X for close

export default function Sidebar({ isVisible, onClose }) {
  const { user, setUser } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    onClose();
  };

  const history = [
    "Frontend Developer - Google",
    "Backend Developer - TCS",
    "Data Analyst - Infosys",
    "System Design Round",
    "HR Round - Zenskar",
  ];

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
        {/* Header with X icon */}
        <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Interview History</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400"
          >
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
        <ul className="space-y-2 mb-6 px-4">
          {history.map((item, index) => (
            <li
              key={index}
              className="p-2 rounded hover:bg-gray-700 cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>

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
