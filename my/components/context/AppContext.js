'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resumeData');
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  useEffect(() => {
    if (resumeData) {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData]);

  return (
    <AppContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
