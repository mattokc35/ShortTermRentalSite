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
import {initialPriceRequest, calendarRequest} from "../network/networkRequests";
import checkTotalGuests from "../inputs/InputVerification";
import differenceInDays from "date-fns/differenceInDays";
import GuestInfoPaymentPageModal from "../modals/GuestInfoPaymentPage";

function BookingInputForm(props) {
  const [selectValues, setSelectValues] = useState({
    selectedAdults: 1,
    selectedChildren: 0,
    selectedInfants: 0,
    selectedPets: 0,
  });

  //useEffect hook, will run on render and if variable changes
  React.useEffect(() => {
    async function fetchCalendarData() {
      let bookedDatesArr = []
      const bookedDatesResponse= await calendarRequest();
      console.log(bookedDatesResponse.checkedOutDates[0])
      console.log(differenceInDays(new Date(bookedDatesResponse.checkedOutDates[1]), new Date(bookedDatesResponse.checkedOutDates[0])))
  
    }
    fetchCalendarData()
   
  }, []);


  const changeHandler = (name, selectedOption) => {
    setSelectValues({ ...selectValues, [name]: selectedOption.value });
  };

  const [startDate, setStartDate] = useState();
  const [totalPrice, setTotalPrice] = useState(null);
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [openPaymentModal, setPaymentModal] = useState(false);

  // Event handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let data = {
      numberOfNights: differenceInDays(endDate.toDate(), startDate.toDate()),
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
      try {
        const response = await initialPriceRequest(data);
        const price = response.totalPrice;
        setTotalPrice(price);
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      }
    } else {
      alert("Total number of guests exceeds the limit of 12");
    }
  };

  return (
    <>
      <div className="BookingInputForm">
      {openPaymentModal && (  
        <GuestInfoPaymentPageModal closeModal={setPaymentModal} startDate={JSON.stringify(startDate._d)} endDate={JSON.stringify(endDate._d)} adults={selectValues.selectedAdults}  children={selectValues.selectedChildren} price={totalPrice}></GuestInfoPaymentPageModal> 
      )}
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
              setTotalPrice(null);
              setStartDate(startDate);
              setEndDate(endDate);
            }}
            excludeDates={[]}
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
      <div className="totalPriceSection">
        {totalPrice !== null && (
          <>
            <h2>Total Price: $ {totalPrice}</h2>
            <button
              className="getPriceButton"
              onClick={() => {
                setPaymentModal(!openPaymentModal);
              }}
            >
              Proceed to Guest Info
            </button>
          </>
        )}
        
      </div>
     
     
     
    </>
  );
}

export default BookingInputForm;
