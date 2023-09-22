import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";
import aboutImage from "./../assets/Exterior_Sidedeck_Lounges_IMG_4487.jpg";
import Intro from "../components/Intro";

function About() {
  return (
    <>
      <Navbar></Navbar>
      <Intro cName="intro-mid" introImg={aboutImage} title="About Us" />
    </>
  );
}

export default About;
