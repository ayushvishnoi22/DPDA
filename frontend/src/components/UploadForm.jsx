import { useState } from "react";
import axios from "axios";
import ResultTable from "./ResultTable";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults(null);
    setScore(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/analyze-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { results, score } = response.data;
      setResults(results);
      setScore(score);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to analyze PDF file. Check server logs and backend.");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-purple-700">📁 Upload PDF Policy</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 block"
      />

      <button
        onClick={handleUpload}
        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded font-semibold"
      >
        Analyze File
      </button>

      {results && <ResultTable data={results} score={score} />}
    </div>
  );
}

export default UploadForm;
