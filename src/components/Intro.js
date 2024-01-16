import "./IntroStyles.css";
import SapphireLogo from "../assets/sapphirelogo.svg";
import React from "react";

const Intro = React.forwardRef((props, ref) => {
  return (
    <>
      <div ref={ref}>
        <div className={props.cName}>
          <img alt={props.introImg} src={props.introImg} />
        </div>

        <div className="intro-text">
          <img src={SapphireLogo} className="sapphire-logo"></img>
          <p>{props.text}</p>
          <a
            className={`${props.btnClass} intro-button`}
            onClick={() => {
              props.handleScroll(props.bookNowRef);
            }}
          >
            {props.buttonText}
          </a>
        </div>
      </div>
    </>
  );
});

export default Intro;
