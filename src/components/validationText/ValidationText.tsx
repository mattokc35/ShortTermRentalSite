import React from "react";

interface ValidationTextProps {
  isValid: boolean | undefined;
  validationText: string;
  starterText?: string;
  errorText: string;
}

const ValidationText: React.FC<ValidationTextProps> = (
  props: ValidationTextProps
) => {
  return (
    <div>
      <p>{props.starterText}</p>
      {props.isValid === true && (
        <p style={{ color: "green" }}>{props.validationText}</p>
      )}
      {props.isValid === false && (
        <p style={{ color: "red" }}>{props.errorText}</p>
      )}
    </div>
  );
};

export default ValidationText;
