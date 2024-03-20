import React from "react";

interface ValidationTextProps {
  isValid: boolean;
  validationText: string;
  errorText: string;
}

const ValidationText: React.FC<ValidationTextProps> = (
  props: ValidationTextProps
) => {
  return props.isValid ? (
    <p style={{ color: "green" }}>{props.validationText}</p>
  ) : (
    <div>
      <p style={{ color: "red" }}>{props.errorText}</p>
    </div>
  );
};

export default ValidationText;
