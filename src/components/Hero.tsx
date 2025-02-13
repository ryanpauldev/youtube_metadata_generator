import { useState } from "react";
import VideoPreview from "./VideoPreview";

function Hero() {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Track summarization state
    //const [selectedOption, setSelectedOption] = useState(""); // Track dropdown selection

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
    };

    const handleTranscriptSubmit = () => {
        if (!videoId) {
            alert("Please enter a valid YouTube URL and select an option.");
            return;
        }

        console.log(`Processing video: ${videoUrl}`);

        setLoading(true); // Show loading state

        // Simulating a network request delay (Replace this with actual API call)
        setTimeout(() => {
            setLoading(false); // Reset loading state after processing
            console.log(`transcription completed!`);
        }, 3000);
    };

    {/*
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    };

    const handleMetadataSubmit = () => {
        if (!videoId || !selectedOption) {
            alert("Please enter a valid YouTube URL and select an option.");
            return;
        }

        console.log(`Processing video: ${videoUrl}`);
        console.log(`Selected action: ${selectedOption}`);

        setLoading(true); // Show loading state

        // Simulating a network request delay (Replace this with actual API call)
        setTimeout(() => {
            setLoading(false); // Reset loading state after processing
            console.log(`${selectedOption} completed!`);
        }, 3000);
    };
    */}

    return (
        <div className="container">
            <h1>YouTube Video Summarizer</h1>
            <p>Enter a YouTube URL to generate a summary, chapters, or tags.</p>

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
                    disabled={loading} // Disable input during processing
                />
            </div>

            {/* Only show the dropdown if a valid YouTube URL is entered */}
            {videoId && (
                <div className="input-container">
                    <button onClick={handleTranscriptSubmit} disabled={loading}>
                        {loading ? "Transcribing..." : "Generate Transcript"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Hero;


