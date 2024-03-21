import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import NumberSelect from "../inputs/NumberSelect";
import {
  adultOptions,
  petOptions,
  childrenOptions,
  infantOptions,
} from "../constants/constants";
import "./BookingInputForm.scss";
import "react-dates/lib/css/_datepicker.css";
import { calendarRequest, priceRequest } from "../network/networkRequests";
import { bookingFormValidation } from "../inputs/InputVerification";
import differenceInDays from "date-fns/differenceInDays";
import GuestInfoPaymentPageModal from "../modals/GuestInfoPaymentPage";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { calculatePrice } from "../helpers/helperFunctions";
import moment, { Moment } from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setTransactionId } from "../actions/transactionActions";
import { setContractValues } from "../actions/contractValuesActions";
import { PriceArray, PriceData } from "../types/types";

function BookingInputForm(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectValues, setSelectValues] = useState({
    selectedAdults: 1,
    selectedChildren: 0,
    selectedInfants: 0,
    selectedPets: 0,
  });
  // Create a state variable to track form validity
  const [bookingFormNotValid, setbookingFormNotValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [focusedInput, setFocusedInput] = useState<any>();
  const [nightsPrice, setNightsPrice] = useState<any>();
  const [numberOfNights, setNumNights] = useState(0);
  const [priceArray, setPriceArray] = useState<PriceArray>({ PriceData: [] });
  const [tax, setTax] = useState(0);
  const [petFee, setPetFee] = useState(0);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountedNightsPrice, setDiscountedNightsPrice] = useState(0);
  const [averageNightlyPrice, setAverageNightlyPrice] = useState(0);

  //separate useEffect for network requests to only run once on component render
  useEffect(() => {
    async function fetchCalendarData() {
      try {
        const bookedDatesResponse = await calendarRequest();
        setBookedDates(bookedDatesResponse.BookedRanges);
      } catch {
        console.log("can't get the calendar data");
      }
    }
    async function fetchPriceData() {
      try {
        const priceArray = await priceRequest();
        setPriceArray(priceArray);
      } catch {
        console.log("can't get price data");
      }
    }
    fetchCalendarData();
    fetchPriceData();
  }, []);
  //useEffect hook, will run on render and if variable changes
  useEffect(() => {
    const { selectedAdults, selectedChildren, selectedInfants } = selectValues;
    const isBookingFormValid = bookingFormValidation(
      selectedAdults,
      selectedChildren,
      selectedInfants,
      startDate,
      endDate,
      bookedDates
    );
    setbookingFormNotValid(isBookingFormValid[0]);
    setValidationMessage(isBookingFormValid[1]);
    // Logic to check for a successful payment (added to the existing useEffect)
    const searchParams = new URLSearchParams(location.search);
    const successParam = searchParams.get("success");
    if (successParam === "true") {
      window.alert("payment was successful! Sending contract to email...");
      console.log("Payment was successful!");
      navigate("/");
    } else {
      navigate("/");
    }
  }, [selectValues, startDate, endDate, location.search]); // Include location.search in the dependency array if needed
  const changeHandler = (name: string, selectedOption: any) => {
    setSelectValues({ ...selectValues, [name]: selectedOption.value });
  };
  // Event handler for form submission
  const handleFormSubmit = async () => {
    let numberOfNights = differenceInDays(
      endDate!.toDate(),
      startDate!.toDate()
    );
    setNumNights(numberOfNights);
    let totalPrice = calculatePrice(
      startDate!,
      endDate!,
      selectValues.selectedPets,
      priceArray,
      numberOfNights
    );
    try {
      setTotalPrice(totalPrice[0]);
      setNightsPrice(totalPrice[1]);
      setTax(totalPrice[2]);
      setPetFee(totalPrice[4]);
      setDiscountPercentage(totalPrice[5]);
      setHasDiscount(totalPrice[6]);
      setDiscountedNightsPrice(totalPrice[7]);
      setAverageNightlyPrice(totalPrice[8]);
      handleShow();
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    }
  };
  //function to check if calendar date is blocked
  const checkDateBlocked = (date: moment.Moment) => {
    return bookedDates.some(({ start, end }) => {
      const startMoment = moment(start, "YYYY-MM-DD");
      const endMoment = moment(end, "YYYY-MM-DD");
      return date.isBetween(startMoment, endMoment, "day", "[]");
    });
  };
  const renderDayContents = (date: Moment) => {
    let found = 1;
    found = priceArray.PriceData[0].data.findIndex(
      (element: any) => element.date === date.format("YYYY-MM-DD")
    );
    if (found === -1) {
      return;
    }
    const entries = Object.entries(priceArray.PriceData[0].data);
    let foundPrice = JSON.stringify(entries[found][1].price);
    let dayValue = date.format("DD");
    return (
      <>
        <div className="calendar-box">
          <br />
          <p className="calendar-text-day">{dayValue} </p>
          <br></br>
          <div className="calendar-price-div">
            {/*<p className="calendar-text-price">${foundPrice} </p>*/}
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
                infants={selectValues.selectedInfants}
                pets={selectValues.selectedPets}
                price={parseFloat(totalPrice.toFixed(2))}
                nightsPrice={nightsPrice}
                numberOfNights={numberOfNights}
                hasDiscount={hasDiscount}
                discountPercentage={discountPercentage}
                discountedNightsPrice={discountedNightsPrice}
                averageNightlyPrice={averageNightlyPrice}
                tax={parseFloat((Math.round(tax * 100) / 100).toFixed(2))}
                petFee={petFee}
              ></GuestInfoPaymentPageModal>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <h4 className="booking-h4">
          Our 3-bedroom home sleeps up to a maximum of 12 guests
        </h4>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="BookingInputFormInner">
          <h4>Select your dates:</h4>
          <DateRangePicker
            startDate={startDate}
            startDateId="start-date"
            endDate={endDate}
            numberOfMonths={1}
            endDateId="end-date"
            onDatesChange={({ startDate, endDate }) => {
              setTotalPrice(0);
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
        {bookingFormNotValid && <h6>{validationMessage}</h6>}
        <button
          className="getPriceButton"
          onClick={() => {
            handleFormSubmit();
          }}
          disabled={bookingFormNotValid}
        >
          Get Price
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  transactionId: state.transactionId,
  contractValues: state.contractValues,
});

const mapDispatchToProps = {
  setTransactionId,
  setContractValues,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingInputForm);
