import React from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./BookingInputForm.css";
import NumberSelect from "../inputs/NumberSelect";
import { petOptions, childrenOptions, infantOptions } from "../constants/constants";


function BookingInputForm(props) {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [focusedInput, setFocusedInput] = React.useState();
  return (
    <>
      <div className="BookingInputForm">
        <h2>Our 3-bedroom home sleeps up to a maximum of 12 guests</h2>
      </div>
      <div className="BookingInputFormInner">
        <h1>Select your dates:</h1>
        <DateRangePicker
          className="DateRangePicker"
          startDate={startDate}
          startDateId="start-date"
          endDate={endDate}
          endDateId="end-date"
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        ></DateRangePicker>
        <NumberSelect className="numberSelect" label="Adults"></NumberSelect>
        <NumberSelect className="numberSelect" label="Children" options={childrenOptions}></NumberSelect>
        <NumberSelect className="numberSelect" label="Infants" options={infantOptions}></NumberSelect>
        <NumberSelect
          className="numberSelect"
          label="Pets"
          options={petOptions}
        ></NumberSelect>
      </div>
    </>
  );
}

export default BookingInputForm;
