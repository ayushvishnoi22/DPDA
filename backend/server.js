import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { spawn } from "child_process";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";

import * as cheerio from "cheerio";  // Changed this line

const app = express();
const upload = multer({ dest: "backend/uploads/" }); // temp upload dir

app.use(cors());
app.use(bodyParser.json());

// TEXT: Copy-paste analysis
app.post("/analyze-policy", (req, res) => {
  const text = req.body.text;
  const python = spawn("python", ["policy_analysis.py"]);

  let output = "";
  python.stdin.write(text);
  python.stdin.end();

  python.stdout.on("data", (data) => (output += data.toString()));
  python.stderr.on("data", (err) => console.error("Python error:", err.toString()));

  python.on("close", () => {
    try {
      res.json(JSON.parse(output));
    } catch (e) {
      res.status(500).send("Failed to parse Python output");
    }
  });
});

// PDF Upload
app.post("/analyze-pdf", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const python = spawn("python", ["pdf_parser.py", filePath]);

  let output = "";
  python.stdout.on("data", (data) => (output += data.toString()));
  python.stderr.on("data", (err) => console.error("PDF Python error:", err.toString()));

  python.on("close", () => {
    fs.unlinkSync(filePath);
    try {
      res.json(JSON.parse(output));
    } catch (e) {
      res.status(500).send("Failed to parse PDF output");
    }
  });
});

// URL Analysis: Fetch and analyze live privacy policies
app.post("/analyze-url", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetch(url);
    const html = await response.text();

    // 🧠 Use cheerio to parse HTML and extract body text
    const $ = cheerio.load(html);  // This line remains the same
    const text = $("body").text().replace(/\s+/g, " ").trim();

    // Call your Python script with extracted text
    const python = spawn("python", ["policy_analysis.py"]);

    let output = "";
    python.stdin.write(text);
    python.stdin.end();

    python.stdout.on("data", (data) => (output += data.toString()));
    python.stderr.on("data", (err) => console.error("Python error:", err.toString()));

    python.on("close", () => {
      try {
        res.json(JSON.parse(output));
      } catch (e) {
        console.error("Failed to parse output:", output);
        res.status(500).send("Failed to parse API output");
      }
    });
  } catch (err) {
    console.error("Failed to fetch or analyze URL:", err);
    res.status(500).send("Failed to fetch or analyze the provided URL.");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});