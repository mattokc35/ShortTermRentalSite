import "./IntroStyles.scss";
import SapphireLogo from "../assets/sapphirelogo.svg";
import React, { forwardRef, MouseEvent } from "react";
import CloudinaryImage from "./cloudinaryImage/CloudinaryImage";

interface IntroProps {
  cName: string;
  introImg: string;
  text: string;
  btnClass: string;
  buttonText: string;
  handleScroll: (ref: React.RefObject<HTMLDivElement>) => void;
  bookNowRef: React.RefObject<HTMLDivElement>;
}

const Intro = forwardRef<HTMLDivElement, IntroProps>((props, ref) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    props.handleScroll(props.bookNowRef);
  };

  return (
    <>
      <div className="intro" ref={ref}>
        <div className={props.cName}>
          <CloudinaryImage
            style={{
              width: "120%",
              height: "87%",
              objectFit: "cover",
              opacity: "0.98",
            }}
            publicId={process.env.BEACH_PIC_PUBLIC_ID}
          />
        </div>

        <div className="intro-text">
          <img
            src={SapphireLogo}
            className="sapphire-logo"
            alt="sapphire logo"
          />
          <p>{props.text}</p>
          <a className={`${props.btnClass} intro-button`} onClick={handleClick}>
            {props.buttonText}
          </a>
        </div>
      </div>
    </>
  );
});

export default Intro;
