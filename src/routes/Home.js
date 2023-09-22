import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import HomeImage from "./../assets/sapphirebed.jpg";
import Footer from "../components/Footer";
import "../App.css";
import HomeDetails from "../components/HomeDetails";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Intro
        cName="intro-mid"
        introImg={HomeImage}
        title="Sapphire By The Sea"
        text="Short term rental beachhouse in Bolivar Peninsula, Crystal Beach, Texas (77650). "
        buttonText="Book Now"
        url="/book"
        btnClass="show"
      />
      <br />
      <HomeDetails />
    </>
  );
}

export default Home;
