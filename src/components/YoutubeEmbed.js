import React from "react";
import "./YoutubeEmbed.css";
const YouTubeEmbed = () => {
  // Replace 'videoId' with the actual YouTube video ID you want to embed
  const embedUrl = `https://www.youtube.com/embed/YkeAx9Ql5oM`;

  return (
    <div className="iframe-youtube embed-responsive embed-responsive-4by3">
      <iframe
        title="YouTube Video"
        className="embed-responsive-item"
        src={embedUrl}
        allowFullScreen
        style={{ width: "70%", height: "49vh" }}
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
