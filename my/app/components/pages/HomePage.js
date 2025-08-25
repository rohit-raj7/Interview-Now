 



'use client';

import { useState } from 'react';
import Card from './Card';
import LogoTitle from './LogoTitle';
// import InputSection from './InputSection';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useAppContext } from "../context/AppContext";

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const { user } = useAppContext();

  return (
    <main className="bg-gray-900 text-gray-300 min-h-screen flex flex-col relative">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-1 py-20 font-sans transition-all duration-300">
        <LogoTitle />
        <Card />
        {/* <InputSection /> */}
        <BottomNav />
      </div>

      {/* Sidebar Toggle Button - only show if user is logged in */}
      {user && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-5 z-50 bg-transparent"
        >
          <img
            src={user.picture}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-gray-600 cursor-pointer"
          />
        </button>
      )}

      {/* Sidebar on right */}
      <Sidebar
        isVisible={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </main>
  );
}
