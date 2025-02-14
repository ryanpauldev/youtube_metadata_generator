import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Allow dynamic port assignment

app.use(cors());
app.use(express.json());

app.get("/api/transcribe", (req, res) => {
    const videoId = req.query.videoId;

    if (!videoId) {
        return res.status(400).json({ error: "Missing videoId parameter." });
    }

    const scriptPath = "./api/get_transcript.py"; // ✅ Ensure correct relative path
    const pythonCmd = "python3"; // ✅ Always use python3

    exec(`${pythonCmd} ${scriptPath} ${videoId}`, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error(`Error: ${stderr || error.message}`);
            return res.status(500).json({ error: stderr || error.message });
        }

        res.json({ transcript: stdout.trim() });
    });
});

// ✅ Start local dev server, but allow Vercel to use it as a serverless function
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Backend running locally at http://localhost:${PORT}`);
    });
}

// ✅ Export for Vercel's serverless functions
export default app;
