 




'use client';

import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext.js";
import Modal from "./Modal";

export default function Navbar({ onLogoClick }) {
  const { user, setUser } = useAppContext();
  const [showLogin, setShowLogin] = useState(false);

  // Load user from localStorage on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    setShowLogin(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gray-800 text-gray-100 flex justify-between items-center px-6 py-3 shadow-md fixed top-0 left-0 z-40">
        {/* Logo / Brand */}
        <h1
          onClick={onLogoClick}
          className={`text-xl font-bold tracking-wide cursor-pointer ${
            user ? "hover:text-blue-400" : ""
          }`}
        >
          Interview Now
        </h1>

        <div className="flex gap-4 mr-9">
          {!user && (
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

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
    </>
  );
}

 