import { useState } from "react";
import VideoPreview from "./VideoPreview";

function Hero() {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [transcript, setTranscript] = useState<string | null>(null); // Store transcript text

    // Function to validate YouTube URL and extract video ID
    const extractVideoId = (url: string): string | null => {
        const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setVideoUrl(url);

        // Extract video ID if the URL is valid
        const id = extractVideoId(url);
        setVideoId(id);
        setTranscript(null); // Reset transcript when a new URL is entered
    };

    // Automatically set API base URL based on environment
    const API_BASE_URL =
        import.meta.env.MODE === "development"
            ? "http://localhost:5000/api"
            : "/api"; // Vercel handles this automatically in production

    const handleTranscriptSubmit = async () => {
        if (!videoId) {
            alert("Please enter a valid YouTube URL.");
            return;
        }

        console.log(`Processing transcript for video: ${videoUrl}`);

        setLoading(true);
        setTranscript(null);

        try {
            // Use API_BASE_URL inside the fetch request
            const response = await fetch(`${API_BASE_URL}/transcribe?videoId=${videoId}`);
            const data = await response.json();

            if (response.ok) {
                if (data.transcript.includes("Error: No transcript found")) {
                    setTranscript("❌ No transcript available for this video.");
                } else {
                    setTranscript(data.transcript);
                    console.log("Transcript received:", data.transcript);
                }
            } else {
                throw new Error(data.error || "Failed to generate transcript.");
            }
        } catch (error) {
            console.error("Error fetching transcript:", error);
            setTranscript("❌ Error fetching transcript. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>YouTube Metadata Generator</h1>
            <p>Enter a YouTube URL to generate a transcript.</p>

            {/* Show Video Preview if a valid video ID is detected */}
            <VideoPreview videoId={videoId} />

            {/* Display a loading message when summarization is in progress */}
            {loading && <p>Processing your request, please wait...</p>}

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Paste YouTube video URL here..."
                    value={videoUrl}
                    onChange={handleInputChange}
                    disabled={loading}
                />
            </div>

            {/* Show Generate Transcript Button when a valid video ID is detected */}
            {videoId && (
                <div className="input-container">
                    <button onClick={handleTranscriptSubmit} disabled={loading}>
                        {loading ? "Transcribing..." : "Generate Transcript"}
                    </button>
                </div>
            )}

            {/* Display the Transcript Below in a Scrollable Container */}
            {transcript && (
                <div className="transcript-container">
                    <h3>Transcript</h3>
                    <div className="transcript-content">
                        {transcript}
                    </div>
                </div>
            )}

        </div>
    );
}

export default Hero;



