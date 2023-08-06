import React from "react";
import "./TextInput.css";

function TextInput(props) {
  const handleSelectChange = (selectedOption) => {
    // Propagate the selected value back to the parent component
    props.onChange(selectedOption);
  };

  return (
    <div className="text-input-container">
      <label className="text-input-label">{props.label}</label>
      <input className="text-input-box" />
    </div>
  );
}

export default TextInput;
