import React, { useState, useEffect, MouseEvent } from "react";
import { createVerificationSession } from "../network/networkRequests";
import Button from "react-bootstrap/Button";
import "./IDVerificationButton.css";

interface IDVerificationButtonProps {
  stripePromise: Promise<any>;
  disabled?: boolean;
  onVerificationResult: (isIDVerified: boolean) => void;
  className?: string; // Optional prop
  type?: string; // Optional prop
  children?: React.ReactNode; // Optional prop
}
const IDVerificationButton: React.FC<IDVerificationButtonProps> = (
  props: IDVerificationButtonProps
) => {
  const [stripe, setStripe] = useState<any | null>(null);

  useEffect(() => {
    const fetchStripe = async () => {
      setStripe(await props.stripePromise);
    };
    fetchStripe();
  }, [props.stripePromise]);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
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
