import { React, useState, useEffect } from "react";
import { createVerificationSession } from "../network/networkRequests";
import Button from "react-bootstrap/Button";
import "./IDVerificationButton.css";

const IDVerificationButton = (props) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const fetchStripe = async () => {
      setStripe(await props.stripePromise);
    };
    fetchStripe();
  }, [props.stripePromise]);

  const handleClick = async (event) => {
    event.preventDefault();
    if (!stripe) {
      return;
    }
    let isIDVerified = await createVerificationSession(stripe);

    // call the callback function with the verification result
    props.onVerificationResult(isIDVerified);
  };
  return (
    <Button
      className="custom-primary-button"
      role="link"
      disabled={props.disabled}
      onClick={handleClick}
    >
      Verify Identity
    </Button>
  );
};

export default IDVerificationButton;
