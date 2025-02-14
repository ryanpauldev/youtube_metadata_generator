import sys
import codecs
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound

# Force UTF-8 encoding to prevent Windows Unicode errors
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.buffer)

def get_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en', 'en-US'])
        transcript_text = " ".join([entry["text"] for entry in transcript])
        print(transcript_text)
    except NoTranscriptFound:
        print("Error: No transcript found for this video.")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_transcript(sys.argv[1])
    else:
        print("Error: No video ID provided.")
