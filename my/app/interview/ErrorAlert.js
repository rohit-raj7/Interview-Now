"use client";
import { X } from "lucide-react"; // using "X" icon
import { useRouter } from "next/navigation";

export default function Alert({ type = "error", message }) {
  const router = useRouter();

  // Customize per type (error, success, etc.)
  const COLORS = {
    error: "border-red-500 text-red-500",
    success: "border-green-500 text-green-500",
    warning: "border-yellow-500 text-yellow-500",
    info: "border-blue-500 text-blue-500",
  };

  const handleGoHome = () => {
    router.push("/");   // navigate to home
    router.refresh();   // refresh the page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] bg-black rounded-xl p-6">
      {/* Circle with icon */}
      <div
        className={`w-20 h-20 flex items-center justify-center rounded-full border-2 ${COLORS[type]}`}
      >
        <X className={`w-10 h-10 ${COLORS[type]}`} strokeWidth={2.5} />
      </div>

      {/* Message */}
      <p className="mt-4 text-white text-center italic text-base">
        {message || "Your request was not sent successfully. Please try again."}
      </p>

      {/* Button */}
      <button
        onClick={handleGoHome}
        className="mt-6 px-5 py-2 cursor-pointer rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
      >
        Go Home
      </button>
    </div>
  );
}
