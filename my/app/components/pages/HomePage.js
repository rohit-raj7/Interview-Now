'use client';

import { useState } from 'react';
import Card from './Card';
import LogoTitle from './LogoTitle';
import InputSection from './InputSection';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <main className="bg-gray-900 text-gray-300 min-h-screen flex relative">

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-1 py-1 font-sans transition-all duration-300">
        <LogoTitle />
        <Card />
        <InputSection />
        <BottomNav />
      </div>
  <button
        onClick={toggleSidebar}
        className="fixed top-4 right-5 z-50 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full shadow-md"
      >
        ☰
      </button>

      {/* Sidebar on right */}
      <Sidebar isVisible={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </main>
  );
}
