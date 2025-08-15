export default function BottomNav() {
  return (
    <nav className="bg-gray-800 rounded-full px-4 py-2 flex justify-center gap-8 max-w-md w-full text-gray-400 text-sm font-semibold">
      <button className="bg-gray-100 text-gray-900 rounded-full px-6 py-2 shadow-md">All</button>
      <button className="hover:text-gray-100">New</button>
      <button className="hover:text-gray-100">In Progress</button>
      <button className="hover:text-gray-100">Completed</button>
    </nav>
  );
}
