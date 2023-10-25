// About.js
import React from "react";
import ProfilePic from "./../../assets/ProfilePic.jpg";
import "./About.css";

function About() {
  // You can replace these with actual data for the host
  const hostName = "Ben and Deborah";
  const hostBio =
    "We have always enjoyed traveling and spending time with family and friends. Crystal Beach is the hidden gem that we have found and loved. From the clean sandy beaches to the peaceful ocean waves, we hope you will love your stay at Sapphire by the Sea as much as our family does. Be our guest and make this place your home away from home!";

  return (
    <div className="about-section">
      <h3>About the Host</h3>
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
