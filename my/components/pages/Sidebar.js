'use client';

export default function Sidebar({ isVisible, onClose }) {
  const history = [
    "Frontend Developer - Google",
    "Backend Developer - TCS",
    "Data Analyst - Infosys",
    "System Design Round",
    "HR Round - Zenskar",
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      {isVisible && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 max-w-[80%] sm:max-w-[60%] bg-gray-800 text-white p-4 border-l border-gray-700 z-40 transform transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Interview History</h2>
          <button
            onClick={onClose}
            className="text-white text-2xl leading-none hover:text-red-400"
          >
            &times;
          </button>
        </div>
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li
              key={index}
              className="p-2 rounded hover:bg-gray-700 cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
