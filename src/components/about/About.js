// About.js
import React from "react";
import ProfilePic from "./../../assets/benanddeborah.JPG";
import "./About.css";
import { hostName, hostBio } from "../../constants/constants";

function About() {
  // You can replace these with actual data for the host
 
  return (
    <div className="about-section">
      <div className="profile-picture">
        {/* Add an <img> tag with the host's profile picture */}
        <img src={ProfilePic} className="profile-pic" alt="Host Profile" />
      </div>
      <br></br>
      <div className="host-details">
        <h4>{hostName}</h4>
        <p>{hostBio}</p>
      </div>
    </div>
  );
}

export default About;
