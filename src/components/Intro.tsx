import "./IntroStyles.scss";
import SapphireLogo from "../assets/sapphirelogo.svg";
import React, { ForwardedRef, forwardRef, MouseEvent } from "react";

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
    <React.Fragment>
      <div className="intro" ref={ref}>
        <div className={props.cName}>
          <img
            className="background-image"
            alt={props.introImg}
            src={props.introImg}
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
    </React.Fragment>
  );
});

export default Intro;
