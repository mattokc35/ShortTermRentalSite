import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import NumberSelect from "../inputs/NumberSelect";
import {
  adultOptions,
  petOptions,
  childrenOptions,
  infantOptions,
} from "../constants/constants";
import "./BookingInputForm.css";
import "react-dates/lib/css/_datepicker.css";
import initialPriceRequest from "../network/postRequests";
import checkTotalGuests from "../inputs/InputVerification";

function BookingInputForm(props) {
  const [selectValues, setSelectValues] = useState({
    selectedAdults: 1,
    selectedChildren: 0,
    selectedInfants: 0,
    selectedPets: 0,
  });

  const changeHandler = (name, selectedOption) => {
    setSelectValues({ ...selectValues, [name]: selectedOption.value });
  };

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();

  // Event handler for form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    let data = {
      startDate: startDate,
      endDate: endDate,
      selectedAdults: selectValues.selectedAdults,
      selectedChildren: selectValues.selectedChildren,
      selectedInfants: selectValues.selectedInfants,
      selectedPets: selectValues.selectedPets,
    };

    //check for input verification (total of adults, children, and infants needs to be < 12)
    if (
      checkTotalGuests(
        data.selectedAdults,
        data.selectedChildren,
        data.selectedInfants
      )
    ) {
      initialPriceRequest(data);
    } else {
      alert("Total number of guests exceeds the limit of 12");
    }
  };

  return (
    <>
      <div className="BookingInputForm">
        <h2>Our 3-bedroom home sleeps up to a maximum of 12 guests</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="BookingInputFormInner">
          <h1>Select your dates:</h1>
          <DateRangePicker
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
          <NumberSelect
            id="selectedAdults"
            className="numberSelect"
            label="Adults"
            options={adultOptions}
            value={selectValues.selectedAdults}
            onChange={(selectedOption) =>
              changeHandler("selectedAdults", selectedOption)
            }
          ></NumberSelect>
          <NumberSelect
            id="selectedChildren"
            className="numberSelect"
            label="Children"
            options={childrenOptions}
            value={selectValues.selectedChildren}
            onChange={(selectedOption) =>
              changeHandler("selectedChildren", selectedOption)
            }
          ></NumberSelect>
          <NumberSelect
            id="selectedInfants"
            className="numberSelect"
            label="Infants"
            options={infantOptions}
            value={selectValues.selectedInfants}
            onChange={(selectedOption) =>
              changeHandler("selectedInfants", selectedOption)
            }
          ></NumberSelect>
          <NumberSelect
            className="selectedPets"
            label="Pets"
            options={petOptions}
            value={selectValues.selectedPets}
            onChange={(selectedOption) =>
              changeHandler("selectedPets", selectedOption)
            }
          ></NumberSelect>
          <button type="submit" className="getPriceButton">
            Get Price
          </button>
        </div>
      </form>
    </>
  );
}

export default BookingInputForm;
