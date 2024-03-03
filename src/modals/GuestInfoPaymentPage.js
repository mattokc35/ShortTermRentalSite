import "./GuestInfoPaymentPageModal.css";
import { useState, React, useRef } from "react";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import { PatternFormat } from "react-number-format";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import IDVerificationButton from "../components/IDVerificationButton";
import { getCurrentDate } from "../helpers/helperFunctions";
import {
  owners,
  checkinTime,
  checkoutTime,
  service_id_1,
  template_id_1,
  key_1,
  stripePublicTestKey,
  contractUrl,
} from "../constants/constants";
import { connect } from "react-redux";
import { setTransactionId } from "../actions/transactionActions";
import { setContractValues } from "../actions/contractValuesActions";
import Form from "react-bootstrap/Form";
import {
  createCheckoutSession,
  sendContractEmailDataToBackend,
} from "../network/networkRequests";
import { loadStripe } from "@stripe/stripe-js";

function GuestInfoPaymentPageModal(props) {
  const form = useRef();
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showProceedToPayment, setShowProceedToPayment] = useState(false);
  const stripePromise = loadStripe(stripePublicTestKey);
  const [isIDVerified, setIsIDVerified] = useState(false);
  const [isContractViewed, setIsContractViewed] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [testingMode, setTestingMode] = useState(false);
  const handleShowContractModal = () => {
    setShowContractModal(true);
  };
  const handleCloseContractModal = () => {
    setShowContractModal(false);
    setIsContractViewed(true);
  };

  // callback function to get ID verification result from child component IDVerificationButton
  const handleVerificationResult = (verificationResult) => {
    setIsIDVerified(verificationResult);
    setShowProceedToPayment(verificationResult);
  };
  // Toggle tooltip visibility
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comments: "",
  });
  const [validated, setValidated] = useState(false);

  const handleSubmitInquiry = (event) => {
    const form = event.currentTarget;
    const phoneNumberStripped = JSON.stringify(form.phoneNumber.value).replace(
      /_/g,
      ""
    );

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (phoneNumberStripped.length < 12) {
      alert("Please Enter a Valid Phone Number");
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    // Include props values in the formData object

    emailjs.sendForm(service_id_1, template_id_1, form, key_1).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    setValidated(true);
    window.alert("Thanks for the inquiry! We'll contact you shortly.");
  };

  const handleBook = async (event) => {
    window.alert("Redirecting to Stripe payment page!");
    event.preventDefault();

    const currentDate = getCurrentDate();

    // Define placeholder values for fields you don't have yet
    const contractValues = {
      Today: currentDate,
      Guests: formData.name,
      Guest_email: formData.email,
      Owners: owners,
      Total_Rent: props.price,
      Total_Guests: props.adults + props.children + props.infants,
      Checkin: props.startDate.substr(1, 10),
      Checkout: props.endDate.substr(1, 10),
      Checkin_Time: checkinTime,
      Checkout_Time: checkoutTime,
    };

    props.setContractValues(contractValues);
    try {
      window.alert("redirecting to Stripe payment...");
      const productName =
        "Sapphire By The Sea, " +
        props.startDate.substr(1, 10) +
        " to " +
        props.endDate.substr(1, 10) +
        " for " +
        formData.name;
      // Assuming props.price is in the format xx.xx
      const price = props.price; // Replace this with your actual props.price value

      // Convert the price to the desired string format
      const formattedPrice = (parseFloat(price) * 100).toFixed(4);
      const response = await createCheckoutSession(productName, formattedPrice);
      console.log(response);
      //if checkout session is created successfully, we want to pass transactionId, and contract/email values to the backend
      if (response != null) {
        console.log(response);
        const contractEmailDataObject = {
          transactionId: response.transactionId,
          nightsPrice: props.nightsPrice,
          petFee: props.petFee,
          adults: props.adults,
          children: props.children,
          phoneNumber: formData.phoneNumber,
          comments: formData.comments,
          email: formData.email,
          Owners: owners,
          total_rent: props.price,
          total_guests: props.adults + props.children + props.infants,
          Checkin: props.startDate.substr(1, 10),
          Checkout: props.endDate.substr(1, 10),
          Checkin_Time: checkinTime,
          Checkout_Time: checkoutTime,
          today: currentDate,
          discountedNightsPrice: props.discountedNightsPrice,
          discountPercentage: props.discountPercentage,
          numberOfNights: props.numberOfNights,
          tax: props.tax,
          guest: formData.name,
          infants: props.infants,
          pets: props.pets,
        };
        console.log(contractEmailDataObject.phoneNumber);
        const sendDataToBackendResponse = await sendContractEmailDataToBackend(
          contractEmailDataObject
        );
        window.location.href = response.url; // Redirect to Stripe Checkout
      } else {
        // Handle error response
        console.error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Handle change event for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("onChange");
    setFormData({ ...formData, [name]: value });
    if (name === "phoneNumber" || name === "email") {
      console.log(`phone number: ${value}`);
      // Check if the phone number has reached the desired length (10 digits)
      const isPhoneNumberValid = value.length === 10;
      setPhoneNumberValid(isPhoneNumberValid);
    }

    if (
      name === "comments" &&
      value === "4710ddae-d9b7-4b8e-995c-b73a205b6b7e"
    ) {
      setTestingMode(true);
    }
  };

  const priceTooltip = (
    <Tooltip id="price-tooltip" style={{ marginLeft: "-150px" }}>
      {/* Add your price breakdown information here */}
      {props.numNights} nights price: ${props.nightsPrice} <br></br>
      {props.hasDiscount && (
        <>
          <div
            style={{ color: "white" }}
          >{`Discounted Price: $${props.discountedNightsPrice} (${props.discountPercentage}% off for ${props.numNights} nights)`}</div>
        </>
      )}
      Cleaning Fee: $225 <br></br>
      Pet Fee: ${props.petFee} <br></br>
      Tax: ${props.tax} <br></br>
      Total Price: ${props.price}
    </Tooltip>
  );

  return (
    <>
      <h5>
        {" "}
        <bold> Reservation Dates: </bold> {props.startDate.substr(1, 10)} to{" "}
        {props.endDate.substr(1, 10)}
      </h5>
      <h5>
        {" "}
        <bold> Adults: </bold> {props.adults} <bold> Children: </bold>{" "}
        {props.children} <bold> Infants: </bold> {props.infants}{" "}
        <bold> Pets: </bold> {props.pets}
      </h5>

      <OverlayTrigger
        placement="right"
        overlay={priceTooltip}
        trigger={["click", "focus"]}
        show={showTooltip}
      >
        <h4>
          {" "}
          <bold> Total Price:</bold> ${props.price}
          <br></br>
          <span
            style={{ color: "black", cursor: "pointer", fontSize: "72%" }}
            onClick={(e) => {
              e.preventDefault();
              toggleTooltip();
            }}
          >
            {props.hasDiscount
              ? `(Special Discount! Click for price breakdown)`
              : `(Click for price breakdown)`}
          </span>
        </h4>
      </OverlayTrigger>
      {testingMode ? (
        <p className="guest-instructions">
          You are now in testing mode, you can try out the view contract, verify
          ID, and proceed to payment features!
        </p>
      ) : (
        <p>
          Please fill out this form to send us an inquiry! Currently, the
          proceed to payment feature is disabled temporarily for testing
          purposes.
        </p>
      )}

      <Form validated={validated} onSubmit={handleSubmitInquiry} ref={form}>
        <input type="hidden" name="adults" value={props.adults} />
        <input type="hidden" name="children" value={props.children} />
        <input type="hidden" name="price" value={props.price} />
        <input type="hidden" name="tax" value={props.tax} />
        <input type="hidden" name="pets" value={props.pets} />
        <input type="hidden" name="infants" value={props.infants} />
        <input type="hidden" name="nightsPrice" value={props.nightsPrice} />
        <input
          type="hidden"
          name="numberOfNights"
          value={props.numberOfNights}
        />
        <input
          type="hidden"
          name="discountedNightsPrice"
          value={props.discountedNightsPrice}
        />
        <input
          type="hidden"
          name="discountPercentage"
          value={props.discountPercentage}
        ></input>
        <input
          type="hidden"
          name="startDate"
          value={props.startDate.substr(1, 10)}
        />
        <input
          type="hidden"
          name="endDate"
          value={props.endDate.substr(1, 10)}
        />
        <input type="hidden" name="petFee" value={props.petFee} />
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          onSubmit={handleSubmitInquiry}
        >
          <Form.Label>Guest Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
            type="name"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPhoneNumber" className="mb-3">
          <Form.Label>
            Phone Number{" "}
            <span style={{ fontSize: "79%" }}>
              (Enter country code first, ex: "01" for United States)
            </span>
          </Form.Label>
          <Form.Control
            name="phoneNumber"
            placeholder="Phone Number"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            size="sm"
            type="tel"
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Questions/Comments</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="comments"
            value={formData.comments}
            as="textarea"
            rows="3"
          />
        </Form.Group>
        <Button className="custom-primary-button" type="submit">
          Send An Inquiry
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleBook}
          className="custom-primary-button"
          disabled={!testingMode}
        >
          Proceed to Payment
        </Button>
        {/* Render "ID Verification" button conditionally */}
        <IDVerificationButton
          className="custom-primary-button"
          type="submit"
          stripePromise={stripePromise}
          onVerificationResult={handleVerificationResult}
        >
          Verify Identity
        </IDVerificationButton>
        <Button
          variant="primary"
          onClick={() => {
            window.open(contractUrl, "_blank");
          }}
          className="custom-primary-button"
        >
          View Contract
        </Button>
      </Form>
    </>
  );
}

const mapDispatchToProps = {
  setTransactionId,
  setContractValues,
};

const mapStateToProps = (state) => ({
  transactionId: state.transactionId,
  contractValues: state.contractValues,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestInfoPaymentPageModal);
