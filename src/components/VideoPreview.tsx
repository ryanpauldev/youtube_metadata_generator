interface VideoPreviewProps {
    videoId: string | null;
}

function VideoPreview({ videoId }: VideoPreviewProps) {
    if (!videoId) return null; // Don't render anything if there's no valid video ID

    return (
        <div className="thumbnail-container">
            <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="YouTube Video Thumbnail"
                className="thumbnail"
            />
        </div>
    );
}

export default VideoPreview;
