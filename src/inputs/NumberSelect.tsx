import React, { FC } from "react";
import Select from "react-select";
import "./NumberSelectStyles.css";
import { adultOptions } from "../constants/constants";

interface OptionType {
  value: number; // Assuming the value is a number
  label: string;
}

interface NumberSelectProps {
  label: string;
  options?: OptionType[];
  onChange: (selectedOption: OptionType | null) => void; // Update here
  id?: string;
  className?: string;
  value: string | number;
}

const NumberSelect: FC<NumberSelectProps> = (props) => {
  const handleSelectChange = (selectedOption: OptionType | null) => {
    // Update here
    // Propagate the selected value back to the parent component
    props.onChange(selectedOption);
  };

  return (
    <>
      <div className="number-select-form">
        <h4>{props.label}</h4>
        <div className="number-select-component">
          <Select
            options={props.options || adultOptions}
            onChange={handleSelectChange}
          />
        </div>
      </div>
    </>
  );
};

export default NumberSelect;
