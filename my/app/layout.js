 
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { AppProvider } from "@/app/components/context/AppContext"; 

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Gemini Voice Q&A",
//   description: "Voice-based AI Q&A powered by Gemini",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable}`}>
//         {/* ✅ Wrap the whole app in AppProvider */}
//         <AppProvider>
//           {children}
//         </AppProvider>
//       </body>
//     </html>
//   );
// }
 

 


 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/app/components/context/AppContext"; 
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const clientId ="1068067220987-3mop9q9d36url20r3ei7qi8p8k4krvi5.apps.googleusercontent.com";


export const metadata = {
  title: "Gemini Voice Q&A",
  description: "Voice-based AI Q&A powered by Gemini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleOAuthProvider clientId={clientId}>
        <AppProvider>
          {children}
        </AppProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
 

 