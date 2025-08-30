 

 'use client';
import { createContext, useContext, useState } from 'react';

export const AppContext = createContext(); // ✅ export it

export function AppProvider({ children }) {
  const [resumeData, setResumeData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [resumeSummary, setResumeSummary] = useState('');
  const [interviewType, setInterviewType] = useState('');
  const [user, setUser] = useState(null); 
  
  
  return (
    <AppContext.Provider value={{ 
      resumeData, setResumeData,
      questions, setQuestions,
      resumeSummary, setResumeSummary,
      interviewType, setInterviewType,
      user, setUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
