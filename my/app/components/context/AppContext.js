'use client';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [resumeData, setResumeData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [resumeSummary, setResumeSummary] = useState('');
  const [interviewType, setInterviewType] = useState('');

  return (
    <AppContext.Provider value={{ 
      resumeData, setResumeData,
      questions, setQuestions,
      resumeSummary, setResumeSummary,
      interviewType, setInterviewType
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
