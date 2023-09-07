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
import {
  calendarRequest,
  priceRequest,
} from "../network/networkRequests";
import checkTotalGuests from "../inputs/InputVerification";
import differenceInDays from "date-fns/differenceInDays";
import GuestInfoPaymentPageModal from "../modals/GuestInfoPaymentPage";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { calculatePrice } from "../helpers/helperFunctions";

function BookingInputForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectValues, setSelectValues] = useState({
    selectedAdults: 1,
    selectedChildren: 0,
    selectedInfants: 0,
    selectedPets: 0,
  });

  //useEffect hook, will run on render and if variable changes
  React.useEffect(() => {
    async function fetchCalendarData() {
      const bookedDatesResponse = await calendarRequest();
      setBookedDates(
        (bookedDates) => (bookedDates = bookedDatesResponse.BookedRanges)
      );
    }

    async function fetchPriceData() {
      const priceArray = await priceRequest();
      setPriceArray(priceArray);
    }
    fetchCalendarData();
    fetchPriceData();
  }, []);

  const changeHandler = (name, selectedOption) => {
    setSelectValues({ ...selectValues, [name]: selectedOption.value });
  };

  const [bookedDates, setBookedDates] = useState([]);
  const [startDate, setStartDate] = useState();
  const [totalPrice, setTotalPrice] = useState(null);
  const [endDate, setEndDate] = useState();
  const [focusedInput, setFocusedInput] = useState();
  const [nightsPrice, setNightsPrice] = useState();
  const [priceArray, setPriceArray] = useState([]);

  // Event handler for form submission
  const handleFormSubmit = async (event) => {
    //event.preventDefault();
    let totalPrice = calculatePrice(
      startDate,
      endDate,
      selectValues.selectedPets,
      priceArray
    );
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
        //const response = await initialPriceRequest(data);
        //const price = response.totalPrice;
        setTotalPrice(totalPrice[0]);
        setNightsPrice(totalPrice[1]);
        handleShow();
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      }
    } else {
      alert("Total number of guests exceeds the limit of 12");
    }
  };

  //function to check if calendar date is blocked
  const checkDateBlocked = (date) => {
    for (let i = 0; i < bookedDates.length; i++) {
      if (
        date.isBetween(bookedDates[i].start, bookedDates[i].end, "days", "[]")
      ) {
        return true;
      }
    }
    return false;
  };

  const renderDayContents = (date) => {
    console.log(priceArray);
    let found = 1;
    found = priceArray.PriceData[0].data.findIndex(
      (element) => element.date === date.format("YYYY-MM-DD")
    );
    if (found === -1) {
      return;
    }
    const entries = Object.entries(priceArray.PriceData[0].data);

    let foundPrice = JSON.stringify(entries[found][1].price);
    let dayValue = JSON.stringify(date._d).substring(9, 11);
    return (
      <>
        <div className="calendar-box">
          <br />
          <p className="calendar-text-day">{dayValue} </p>
          <br></br>
          <div className="calendar-price-div">
            <p className="calendar-text-price">${foundPrice} </p>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="BookingInputForm">
        <div className="PaymentModal">
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>Guest Info/Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <GuestInfoPaymentPageModal
                startDate={JSON.stringify(startDate)}
                endDate={JSON.stringify(endDate)}
                adults={selectValues.selectedAdults}
                children={selectValues.selectedChildren}
                price={totalPrice}
                nightsPrice={nightsPrice}
              ></GuestInfoPaymentPageModal>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
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
            renderDayContents={renderDayContents}
            isDayBlocked={checkDateBlocked}
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
        </div>
      </form>
      <div className="totalPriceSection">
        <button
          className="getPriceButton"
          onClick={() => {
            handleFormSubmit();
          }}
        >
          Get Price
        </button>
      </div>
    </>
  );
}

export default BookingInputForm;
