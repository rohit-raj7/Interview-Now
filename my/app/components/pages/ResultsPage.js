export default function ResultsPage({ evaluations }) {
  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">📊 Interview Results</h2>
      <pre className="whitespace-pre-wrap bg-gray-800 p-4 rounded">
        {evaluations}
      </pre>
    </div>
  );
}
