import React from "react";
import LazyLoad from "react-lazy-load";
import "./YoutubeEmbed.css";

const YouTubeEmbed = () => {
  const embedUrl = `https://www.youtube.com/embed/YkeAx9Ql5oM`;

  return (
    <LazyLoad>
      <div className="iframe-youtube embed-responsive embed-responsive-4by3">
        <iframe
          title="YouTube Video"
          className="embed-responsive-item"
          src={embedUrl}
          allowFullScreen
        ></iframe>
      </div>
    </LazyLoad>
  );
};

export default YouTubeEmbed;
