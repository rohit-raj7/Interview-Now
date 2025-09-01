 
 "use client";

export default function InLogo() {
  return (
    <div className="flex mt-1 items-center h-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 250"
        className="w-20 h-20"> 
        <circle cx="60" cy="40" r="18" fill="#facc15" />
        <rect x="50" y="70" width="20" height="110" fill="#facc15" />

        {/* White "n" */}
        <path
          d="M100 70 
             Q160 60 160 120 
             L160 190 
             L140 180 
             L140 120 
             Q140 90 100 100 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
