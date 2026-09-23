import { useState } from "react";
import axios from "axios";
import ResultTable from "./ResultTable";

function RealTimeForm() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);

  const handleAnalyze = async () => {
    if (!url.startsWith("http")) {
      return alert("Please enter a valid URL starting with http or https");
    }

    try {
      const response = await axios.post("http://localhost:5000/analyze-url", {
        url,
      });
      const { results, score } = response.data;
      setResults(results);
      setScore(score);
    } catch (error) {
      console.error("API Analysis failed:", error);
      alert("Could not analyze the provided URL.");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">🌐 Analyze Privacy Policy via URL</h2>
      <input
        type="text"
        placeholder="Enter URL of privacy policy..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full mb-4 p-3 border border-green-300 rounded"
      />
      <button
        onClick={handleAnalyze}
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded font-semibold"
      >
        Analyze URL
      </button>

      {results && <ResultTable data={results} score={score} />}
    </div>
  );
}

export default RealTimeForm;
