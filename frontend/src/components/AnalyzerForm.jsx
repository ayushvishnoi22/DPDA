import { useState } from "react";
import axios from "axios";
import ResultTable from "./ResultTable";


function AnalyzerForm() {
  const [policyText, setPolicyText] = useState("");
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post("http://localhost:5000/analyze-policy", {
        text: policyText,
      });
      const { results, score } = response.data;
      setResults(results);
      setScore(score);
    } catch (error) {
      console.error("Error analyzing:", error);
      alert("Failed to analyze. Check backend connection.");
    }
  };

  return (
   
    <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">✍️ Paste Your Privacy Policy</h2>

      <textarea 
        rows={10}
        className="w-full p-4 border border-blue-300 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Paste your privacy policy here..."
        value={policyText}
        onChange={(e) => setPolicyText(e.target.value)}
      ></textarea>

      <button
        onClick={handleAnalyze}
        className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded font-semibold"
      >
        Analyze
      </button>

      {results && <ResultTable data={results} score={score} />}
    </div>
  );
}

export default AnalyzerForm;
