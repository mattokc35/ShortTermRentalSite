import React from "react";
import LazyLoad from "react-lazy-load";
import "./YoutubeEmbed.scss";
import { youtubeURL } from "../constants/constants";

const YouTubeEmbed = () => {
  return (
    <>
      <LazyLoad>
        <div className="iframe-youtube embed-responsive embed-responsive-4by3">
          <iframe
            width="560"
            height="315"
            src={youtubeURL}
            title="YouTube video player"
            frameborder="0"
            className="embed-responsive-item"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </LazyLoad>
    </>
  );
};

export default YouTubeEmbed;
