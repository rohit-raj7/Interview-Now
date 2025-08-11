import './globals.css';
import HomePage from '@/components/pages/HomePage'; // ✅ renamed to HomePage

export default function Home() {
  return (
    <div className="bg-gray-900 text-gray-100 font-sans min-h-screen flex flex-col">
      <HomePage />  
    </div>
  );
}
