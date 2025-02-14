const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/transcribe", (req, res) => {
    const videoId = req.query.videoId;

    if (!videoId) {
        return res.status(400).json({ error: "Missing videoId parameter." });
    }

    const scriptPath = "get_transcript.py";
    const pythonCmd = process.env.NODE_ENV === "production" ? "python3" : "python";

    exec(`${pythonCmd} ${scriptPath} ${videoId}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error: ${stderr || error.message}`);
            return res.status(500).json({ error: stderr || error.message });
        }

        res.json({ transcript: stdout.trim() });
    });
});

// Export for Vercel (important for serverless functions)
module.exports = app;

