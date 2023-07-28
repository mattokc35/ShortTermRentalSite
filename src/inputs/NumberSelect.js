import React from "react";
import Select from "react-select";
import "./NumberSelectStyles.css";
import { adultOptions } from "../constants/constants";

function NumberSelect(props) {
  const handleSelectChange = (selectedOption) => {
    // Propagate the selected value back to the parent component
    props.onChange(selectedOption);
  };

  return (
    <>
      <div className="number-select-form">
        <h2>{props.label}</h2>
        <div className="number-select-component">
          <Select
            options={props.options || adultOptions}
            onChange={handleSelectChange}
          />
        </div>
      </div>
    </>
  );
}

export default NumberSelect;
