// components/Footer.js
"use client";

import Link from "next/link";
import InLogo from "./InterviewNow";

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 py-6 mt-10 border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">


                <div className="cursor-pointer flex items-center" >
                    <div className="w-10 h-10">
                        <InLogo />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
 
                    <span className="text-xl font-bold text-white">Interview Now</span>
                    <span className="text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved</span>
                </div>

                {/* Middle - Links */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/" className="hover:text-blue-400 transition">
                        About
                    </Link>
                    <Link href="/" className="hover:text-blue-400 transition">
                        Privacy
                    </Link>
                    <Link href="/" className="hover:text-blue-400 transition">
                        Terms
                    </Link>
                    <Link href="/" className="hover:text-blue-400 transition">
                        Contact
                    </Link>
                </div>

                {/* Right Side - Socials */}
                <div className="flex space-x-4 mt-4 md:mt-0 text-xl">

                    <a
                        href="https://www.linkedin.com/in/rohit-raj7/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-500"
                    >
                        <i className="fab fa-linkedin"></i>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/rohit-raj7"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-gray-400"
                    >
                        <i className="fab fa-github"></i>
                    </a>

                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/rohitraj_7085/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-pink-500"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/rohitraj706"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-blue-500"
                    >
                        <i className="fab fa-facebook"></i>
                    </a>


                </div>

            </div>
        </footer>
    );
}
