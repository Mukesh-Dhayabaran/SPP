import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { spawn } from "child_process";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;
const PYTHON_BIN = process.env.PYTHON_BIN || "python";

// Middleware
app.use(cors({ origin: true })); // open CORS for dev; tighten in prod
app.use(express.json());

// Simple health check
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "student-performance-backend" });
});

/**
 * POST /predict
 * Body:
 * {
 *   grade, examPercent1, examPercent2, studyHours, failures, absentees,
 *   Sports, Internet_Facility, Extra_Class, Family_Support
 * }
 */
app.post("/predict", async (req, res) => {
  try {
    const payload = req.body || {};

    // Basic schema validation (numbers + booleans)
    const requiredNumeric = [
      "grade",
      "examPercent1",
      "examPercent2",
      "studyHours",
      "failures",
      "absentees"
    ];
    for (const k of requiredNumeric) {
      if (
        typeof payload[k] === "undefined" ||
        payload[k] === null ||
        payload[k] === "" ||
        Number.isNaN(Number(payload[k]))
      ) {
        return res.status(400).json({ error: `Invalid or missing numeric field: ${k}` });
      }
      payload[k] = Number(payload[k]);
    }

    const requiredBooleans = [
      "Sports",
      "Internet_Facility",
      "Extra_Class",
      "Family_Support"
    ];
    for (const k of requiredBooleans) {
      if (typeof payload[k] === "undefined") {
        // default to false if omitted
        payload[k] = false;
      } else if (typeof payload[k] !== "boolean") {
        // Convert truthy/falsy to boolean
        payload[k] = !!payload[k];
      }
    }

    // Spawn Python predictor
    const py = spawn(PYTHON_BIN, ["./python/predict.py"], {
      stdio: ["pipe", "pipe", "pipe"]
    });

    let stdout = "";
    let stderr = "";

    py.stdout.on("data", (chunk) => (stdout += chunk.toString()));
    py.stderr.on("data", (chunk) => (stderr += chunk.toString()));

    // Send JSON to Python via stdin
    py.stdin.write(JSON.stringify(payload));
    py.stdin.end();

    py.on("close", (code) => {
      if (code !== 0) {
        // Bubble up Python error text to help you debug
        return res.status(500).json({
          error: "Prediction process failed",
          details: stderr || "Unknown error"
        });
      }

      try {
        const result = JSON.parse(stdout);
        // result = { prediction: number, category: "Low|Medium|High" }
        return res.json(result);
      } catch (e) {
        return res.status(500).json({
          error: "Failed to parse prediction output",
          details: stdout
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`--> API listening on http://localhost:${PORT}`);
  console.log(`    POST /predict`);
});
