'use client';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { uploadResume } from '@/components/dataFile/DataResume.js';
import { filterResumeData } from '@/components/dataFile/ResumeFilter.js';
import VoiceInterview from '@/components/dataFile/VoiceInterview.js';

export default function ResumeModal({ isOpen, onClose }) {
  const { setResumeData } = useAppContext();
  const [resumeFile, setResumeFile] = useState(null);
  const [role, setRole] = useState('');
  const [interviewType, setInterviewType] = useState('');
  const [duration, setDuration] = useState('10');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // New states for starting interview
  const [startInterview, setStartInterview] = useState(false);
  const [interviewData, setInterviewData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;

    setLoading(true);
    try {
      const data = await uploadResume(resumeFile);
      if (data) {
        setResumeData(data);

        // Apply professional filter
        const filtered = filterResumeData(data, role, interviewType);

        setInterviewData({
          questions: filtered.questions,
          resumeSummary: filtered.cleanText
        });

        // Start voice interview
        setStartInterview(true);
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsFormValid(
      role.trim() !== '' &&
      interviewType !== '' &&
      duration !== '' &&
      resumeFile &&
      termsAccepted
    );
  }, [role, interviewType, duration, resumeFile, termsAccepted]);

  if (!isOpen) return null;

  // If interview started, render voice interview
  if (startInterview && interviewData) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 sm:px-6">
        <div className="bg-gray-900 rounded-xl p-6 sm:p-8 w-full max-w-2xl shadow-xl relative text-white">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            onClick={onClose}
          >×</button>
          <VoiceInterview
            questions={interviewData.questions}
            resumeSummary={interviewData.resumeSummary}
            interviewType={interviewType}
            onFinish={(finalScore) => {
              alert(`Interview finished! Final Score: ${finalScore}`);
              setStartInterview(false);
              onClose();
            }}
          />
        </div>
      </div>
    );
  }

  // Default: show upload form
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 sm:px-6">
      <div onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-xl p-6 sm:p-8 w-full max-w-2xl shadow-xl relative text-white">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl" onClick={onClose}>×</button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Resume Based Interview</h2>
        <p className="text-sm sm:text-base text-gray-400 mb-5">Upload your resume in PDF format</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. Software Developer"
              className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded text-sm sm:text-base"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <select
              className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded text-sm sm:text-base"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Coding">Coding</option>
            </select>
          </div>

          <div className="text-sm sm:text-base text-gray-400">Interview Duration *</div>
          <div className="flex flex-wrap gap-4 text-sm sm:text-base">
            {['10', '20', '30'].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="duration"
                  value={value}
                  checked={duration === value}
                  onChange={(e) => setDuration(e.target.value)}
                />
                {value} Mins
              </label>
            ))}
          </div>

          <div className="flex flex-col items-center text-sm sm:text-base">
            <label
              htmlFor="resume-upload"
              className="w-full border border-dashed border-gray-600 rounded p-6 sm:p-8 text-center cursor-pointer hover:border-gray-400 transition"
            >
              {resumeFile ? <span className="text-green-400">{resumeFile.name}</span> : 'Upload Resume (PDF)'}
              <input
                type="file"
                id="resume-upload"
                accept=".pdf"
                required
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <label className="flex flex-wrap items-start sm:items-center gap-x-2 text-sm sm:text-base text-gray-400">
            <input
              type="checkbox"
              className="mt-1 sm:mt-0"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <span>
              I agree to the{' '}
              <a href="#" className="text-green-400 underline">terms and conditions</a>
              {' '}including consent for audio and video recording.
            </span>
          </label>

          <button
            type="submit"
            className={`w-full py-3 mt-2 rounded text-base sm:text-lg font-semibold transition 
              ${isFormValid ? 'bg-green-700 hover:bg-green-600 text-white cursor-pointer' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
            disabled={!isFormValid || loading}
          >
            {loading ? 'Uploading...' : 'Start Interview'}
          </button>
        </form>
      </div>
    </div>
  );
}
 
 