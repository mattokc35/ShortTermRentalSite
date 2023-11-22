import "./IntroStyles.css";
import SapphireLogo from "../assets/sapphirelogo.svg";

function Intro(props) {
  return (
    <>
      <div className={props.cName}>
        <img alt={props.introImg} src={props.introImg} />
      </div>

      <div className="intro-text">
      <img src={SapphireLogo} className="sapphire-logo"></img>
        <p>{props.text}</p>
        <a disabled href={props.url} className={props.btnClass}>
          {props.buttonText}
        </a>
      </div>
    </>
  );
}

export default Intro;
