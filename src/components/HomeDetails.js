import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import HomeImage from "./../assets/sapphireoutdoors3.jpg";
import Home2Image from "./../assets/sapphireindoors1.jpg";
import Home3Image from "./../assets/sapphireoutdoors2.jpg";
import Home4Image from "./../assets/sapphireindoors2.jpg";
import Home5Image from "./../assets/sapphireoutdoors1.jpg";
import "./HomeDetails.css"

function HomeDetails() {
    return (
        <>
        <h3>Welcome to our beautiful home...</h3>
        <div className="carousel-section">
        <Carousel showIndicators={false} className="carousel">
                <div>
                    <img src={HomeImage} />
                    <p className="">Outdoors!</p>
                </div>
                <div>
                    <img src={Home2Image} />
                    <p className="">Placeholder</p>
                </div>
                <div>
                    <img src={Home3Image} />
                    <p className="">Beautiful Night Life</p>
                </div>
                <div>
                    <img src={Home4Image} />
                    <p className="">Fully Stocked Kitchen!</p>
                </div>
                <div>
                    <img src={Home5Image} />
                    <p className="">Lounge On The Balcony!</p>
                </div>
        </Carousel>
        </div>



        </>
    )
}

export default HomeDetails;