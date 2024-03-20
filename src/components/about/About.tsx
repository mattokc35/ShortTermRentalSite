import React from "react";
import ProfilePic from "./../../assets/benanddeborah.webp";
import "./About.css";
import { hostName, hostBio } from "../../constants/constants";

// Define types for props if needed
// For this component, no props are passed, so you can skip this step

const About: React.FC = () => {
  return (
    <div className="about-section">
      <div className="profile-picture">
        {/* Add an <img> tag with the host's profile picture */}
        <img
          loading="lazy"
          src={ProfilePic}
          className="profile-pic"
          alt="Host Profile"
        />
      </div>
      <br />
      <div className="host-details">
        <h4>{hostName}</h4>
        <p>{hostBio}</p>
      </div>
    </div>
  );
};

export default About;
