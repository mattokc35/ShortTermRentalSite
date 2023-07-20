import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import HomeImage from './../assets/sapphireindoors1.jpg'


function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Intro
        cname="intro"
        introImg={HomeImage}
        title="Sapphire By The Sea"
        text="Short term rental beachhouse in Bolivar Peninsula, Crystal Beach, Texas (77650). "
        buttonText="Book Now"
        url="/book"
        btnClass="show"
      ></Intro>
    </>
  );
}

export default Home;
