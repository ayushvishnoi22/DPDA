import { useState } from "react";
import AnalyzerForm from "./components/AnalyzerForm";
import UploadForm from "./components/UploadForm";
import RealTimeForm from "./components/RealTimeForm";

import Spline from "@splinetool/react-spline";


function App() {
  const [tab, setTab] = useState("analyzer");

  return (
    <div className="relative min-h-screen w-full font-sans bg-gradient-to-br from-indigo-100 to-blue-200">
      {/* 🌌 Optional 3D Spline background */}
      { 
      <div className="fixed inset-0 z-0">
        <Spline scene="https://prod.spline.design/psLltr5P3EoqDjYO/scene.splinecode" />
      </div> 
      }

      {/* 🧭 Tab Bar */}
      <header className="bg-blue-800/90 text-white py-4 shadow relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold">🛡️ DPDP Privacy Scanner</h1>
          <p className="text-sm text-blue-200">Scan privacy policies for India’s DPDP compliance</p>
        </div>
      </header>

      {/* 🔘 Tabs */}
      <div className="flex justify-center gap-4 mt-6 z-10 relative">
        <button
          onClick={() => setTab("analyzer")}
          className={`px-6 py-2 rounded-t-lg font-semibold transition ${
            tab === "analyzer"
              ? "bg-blue-800 text-white shadow"
              : "bg-white/80 backdrop-blur border border-blue-300"
          }`}
        >
          ✍️ Analyzer
        </button>
        <button
          onClick={() => setTab("upload")}
          className={`px-6 py-2 rounded-t-lg font-semibold transition ${
            tab === "upload"
              ? "bg-blue-800 text-white shadow"
              : "bg-white/80 backdrop-blur border border-blue-300"
          }`}
        >
          📄 Upload
        </button>
        <button
          onClick={() => setTab("url")}
          className={`px-6 py-2 rounded-t-lg font-semibold transition ${
            tab === "url"
              ? "bg-blue-800 text-white shadow"
              : "bg-white/80 backdrop-blur border border-blue-300"
          }`}
        >
          🌐 Analyze URL
        </button>
      </div>

      {/* 🧾 Form Container */}
      <main className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl">
          {tab === "analyzer" && <AnalyzerForm />}
          {tab === "upload" && <UploadForm />}
          {tab === "url" && <RealTimeForm />}
        </div>
      </main>
    </div>
  );
}

export default App;
