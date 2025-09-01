
'use client';

import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext.js";
import InLogo from './InterviewNow.js'
import Modal from "./Modal";

export default function Navbar({ onLogoClick }) {
  const { user, setUser } = useAppContext();
  const [showLogin, setShowLogin] = useState(false);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      // Save user to backend (MongoDB)
      const res = await fetch("https://interview-node-eta.vercel.app/api/users/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sub: decoded.sub,
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
        }),
      });

      const savedUser = await res.json();

      // Save in state + localStorage
      setUser(savedUser);
      localStorage.setItem("user", JSON.stringify(savedUser));
      setShowLogin(false);
    } catch (err) {
      console.error("❌ Google login failed:", err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gray-800 text-gray-100 flex justify-between items-center px-6 py-3 shadow-md fixed top-0 left-0 z-40">


        {/* <div className=' cursor-pointer' >
           <InLogo/> 
           </div> */}
        <div className="cursor-pointer flex items-center" onClick={onLogoClick}>
          <div className="w-12 h-12">
            <InLogo />
          </div>
        </div>


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
