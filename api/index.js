import express from "express";
import cors from "cors";
import { exec } from "child_process";

// Initialize Express (Used Locally)
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API Route: `/api/transcribe`
app.get("/api/transcribe", (req, res) => {
    const videoId = req.query.videoId;

    if (!videoId) {
        return res.status(400).json({ error: "Missing videoId parameter." });
    }

    const scriptPath = "api/get_transcript.py"; // Adjust path if necessary
    const pythonCmd = "python"; // Use "python" instead of "python3"

    exec(`${pythonCmd} ${scriptPath} ${videoId}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error: ${stderr || error.message}`);
            return res.status(500).json({ error: stderr || error.message });
        }

        res.json({ transcript: stdout.trim() });
    });
});

// ✅ Run Express Locally (But Not On Vercel)
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Backend running locally at http://localhost:${PORT}`);
    });
}

// ✅ Export for Vercel Serverless Function
export default app;
