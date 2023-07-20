import "./IntroStyles.css"

function Intro (props){

    return(
        <>
        <div className = {props.cName}>
            <img alt={props.introImg} src={props.introImg}/>
        </div>

        <div className="intro-text">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <a href={props.url} className={props.btnClass}>
                {props.buttonText}
            </a>
        </div>
            
        </>
    )
}

export default Intro;