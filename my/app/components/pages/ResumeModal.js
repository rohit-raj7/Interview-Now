

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';
import { uploadResume } from '@/app/interview/DataResume.js';
import { filterResumeData } from '@/app/interview/ResumeFilter';
import Modal from "../pages/Modal.js";
import { GoogleLogin } from "@react-oauth/google"; // ✅ import Google login
import { jwtDecode } from "jwt-decode"; // ✅ decode JWT

export default function ResumeModal({ isOpen, onClose }) {
  const router = useRouter();
  const {
    user,
    setUser,        // ✅ make sure AppContext provides this
    setResumeData,
    setQuestions,
    setResumeSummary,
    setInterviewType,
  } = useAppContext();

  const [showLogin, setShowLogin] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [role, setRole] = useState('');
  const [interviewType, setType] = useState('');
  const [duration, setDuration] = useState('10');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // camera state
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [checkingCamera, setCheckingCamera] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    }
  };

  // ✅ handle Google login success
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      localStorage.setItem("user", JSON.stringify(decoded));
      setShowLogin(false);
    } catch (err) {
      console.error("JWT decode failed:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ check login first
    if (!user) {
      setShowLogin(true);
      return;
    }

    if (!resumeFile || !cameraAllowed) return;

    setLoading(true);
    try {
      const data = await uploadResume(resumeFile);
      if (data) {
        setResumeData(data);

        const { cleanText, questions: generatedQuestions } = filterResumeData(
          data,
          role,
          interviewType
        );

        setResumeSummary(cleanText);
        setQuestions(generatedQuestions || []);
        setInterviewType(interviewType);

        router.push('/interview');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  // validate form
  useEffect(() => {
    setIsFormValid(
      role.trim() !== '' &&
      interviewType !== '' &&
      duration !== '' &&
      resumeFile &&
      termsAccepted &&
      cameraAllowed
    );
  }, [role, interviewType, duration, resumeFile, termsAccepted, cameraAllowed]);

  // ask for camera
  const requestCameraAccess = async () => {
    setCheckingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setCameraAllowed(true);
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (err) {
      console.error('Camera permission denied:', err);
      setCameraAllowed(false);
    }
    setCheckingCamera(false);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 sm:px-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-xl p-6 sm:p-8 w-full max-w-2xl shadow-xl relative text-white"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold mb-3">Resume Based Interview</h2>
        <p className="text-sm sm:text-base text-gray-400 mb-5">
          Upload your resume in PDF format
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Role + Interview Type */}
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
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Coding">Coding</option>
            </select>
          </div>

          {/* Duration */}
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

          {/* File Upload */}
          <div className="flex flex-col items-center text-sm sm:text-base">
            <label
              htmlFor="resume-upload"
              className="w-full border border-dashed border-gray-600 rounded p-6 sm:p-8 text-center cursor-pointer hover:border-gray-400 transition"
            >
              {resumeFile ? (
                <span className="text-green-400">{resumeFile.name}</span>
              ) : (
                'Upload Resume (PDF)'
              )}
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

          {/* Camera Permission */}
          <div className="flex flex-col items-center gap-3 text-sm sm:text-base">
            {!cameraAllowed ? (
              <button
                type="button"
                onClick={requestCameraAccess}
                disabled={checkingCamera}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium"
              >
                {checkingCamera ? 'Checking...' : 'Allow Camera'}
              </button>
            ) : (
              <span className="text-green-400 font-medium">
                ✅ Camera access granted
              </span>
            )}
          </div>

          {/* Terms */}
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
              <a href="#" className="text-green-400 underline">
                terms and conditions
              </a>{' '}
              including consent for audio and video recording.
            </span>
          </label>

          {/* Login Modal */}
          {showLogin && !user && (
            <Modal title="Login with Google" onClose={() => setShowLogin(false)}>
              <div className="flex flex-col items-center gap-4">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={() => console.log("Login Failed")}
                />
              </div>
            </Modal>
          )}

          {/* Button */}
          <button
            type="submit"
            className={`w-full py-3 mt-2 rounded text-base sm:text-lg font-semibold transition 
              ${isFormValid
                ? 'bg-green-700 hover:bg-green-600 text-white cursor-pointer'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Finding Best Questions..." : "Start Interview"}

          </button>
        </form>
      </div>
    </div>
  );
}
