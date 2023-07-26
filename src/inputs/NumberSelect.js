import React from "react";
import Select from "react-select";
import "./NumberSelectStyles.css";

const adultOptions =  [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

function NumberSelect(props) {

  return (
    <>
    <div className="number-select-form">
    <h2>{props.label}</h2>
    <div className="number-select-component">
    <Select options={props.options || adultOptions} />
    </div>
    </div>
      
    </>
  );
}

export default NumberSelect;
