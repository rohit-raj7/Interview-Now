'use client';

import { useState } from 'react';
import ResumeModal from './ResumeModal';


export default function Card() {


  const [showResumeModal, setShowResumeModal] = useState(false);
  return (
    <>
      <div className="flex flex-wrap max-w-5xl justify-center gap-6 mb-14">


        {/* Resume Card (clickable) */}
        <div
          onClick={() => setShowResumeModal(true)}
          className="cursor-pointer bg-gray-800 border border-gray-700 rounded-xl w-40 min-h-[110px] p-4 flex flex-col gap-2 hover:border-green-500"
        >
          <div className="h-6 w-6 text-gray-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-7-8h8a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium text-sm select-none">Resume</p>
          <p className="text-gray-500 text-xs select-none">PDF File Only</p>
        </div>

        {/* Card 2 */}

        <div onClick={() => setShowResumeModal(true)} className="bg-gray-800 border border-gray-700 rounded-xl w-40 min-h-[110px] p-4 flex flex-col gap-2">
          <div className="h-6 w-6 text-gray-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7H3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3l-4 4-4-4" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium text-sm select-none">Company</p>
          <p className="text-gray-500 text-xs select-none">Ex - Accenture, IBM</p>
        </div>

        {/* Card 3 */}

        <div onClick={() => setShowResumeModal(true)} className="bg-gray-800 border border-gray-700 rounded-xl w-40 min-h-[110px] p-4 flex flex-col gap-2">
          <div className="h-6 w-6 text-gray-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="7" width="18" height="13" rx="2" ry="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4m0 0h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium text-sm select-none">Job Role</p>
          <p className="text-gray-500 text-xs select-none">Ex - ASE, SDE, SDET</p>
        </div>


      </div>
      <ResumeModal isOpen={showResumeModal} onClose={() => setShowResumeModal(false)} />

    </>
  );
}
