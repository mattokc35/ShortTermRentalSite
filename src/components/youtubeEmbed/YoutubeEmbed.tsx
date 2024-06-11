import React, { FC } from "react";
import "./YoutubeEmbed.scss";
import { youtubeURL } from "../../constants/constants";

const YouTubeEmbed: FC = () => {
  return (
    <React.Fragment>
      <div className="iframe-youtube embed-responsive embed-responsive-4by3">
        <iframe
          width="560"
          height="315"
          src={youtubeURL}
          title="YouTube video player"
          frameBorder={0}
          className="embed-responsive-item"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </React.Fragment>
  );
};

export default YouTubeEmbed;
