 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/context/AppContext.js"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gemini Voice Q&A",
  description: "Voice-based AI Q&A powered by Gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* ✅ Wrap the whole app in AppProvider */}
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}


 