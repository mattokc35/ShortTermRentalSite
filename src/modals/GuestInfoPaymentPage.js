import "./GuestInfoPaymentPageModal.css";
import { useState, React, useRef } from "react";
import emailjs from "@emailjs/browser";
import Button from "react-bootstrap/Button";
import { PatternFormat } from "react-number-format";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { getCurrentDate } from "../helpers/helperFunctions";
import {
  owners,
  checkinTime,
  checkoutTime,
  service_id_1,
  template_id_1,
  key_1,
} from "../constants/constants";

import Form from "react-bootstrap/Form";
import {
  contractRequest,
  contractStatusRequest,
  createCheckoutSession,
} from "../network/networkRequests";

function GuestInfoPaymentPageModal(props) {
  const form = useRef();
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [contractID, setContractID] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [contractStatus, setContractStatus] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showProceedToPayment, setShowProceedToPayment] = useState(false);
  const [showBook, setShowBook] = useState(true);
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

    if (phoneNumberStripped.length < 20) {
      alert("Please Enter a Valid Phone Number");
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    event.preventDefault();
    // Include props values in the formData object
    const formDataWithProps = {
      ...formData,
      adults: props.adults,
      children: props.children,
      pets: props.pets,
      price: props.price,
      tax: props.tax,
      startDate: props.startDate.substr(1, 10),
      endDate: props.endDate.substr(1, 10),
      infants: props.infants,
      petFee: props.petFee,
      nightsPrice: props.nightsPrice,
    };

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
    event.preventDefault();

    const currentDate = getCurrentDate();

    // Define placeholder values for fields you don't have yet
    const placeholderValues = {
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

    // Combine placeholder values with props
    const requestData = {
      ...placeholderValues,
    };

    try {
      const contractRequestData = await contractRequest(requestData);
      const contractID = contractRequestData?.data?.contract?.id;
      if (contractID) {
        setContractID(contractID);
        setShowProceedToPayment(true);
        window.alert("Contract created successfully!");
        setShowBook(false);
      } else {
        window.alert("Failed to get contract ID");
      }
    } catch {
      console.log("Contract request failed. Please try again later.");
    }
  };

  const handlePayment = async () => {
    if (contractID === null) {
      window.alert(
        "Please submit a booking first to receive a tenant-landlord contract."
      );
      return;
    }

    const requestData = {
      id: contractID,
    };
    try {
      const contractStatusResponse = await contractStatusRequest(requestData);
      console.log(contractStatusResponse);
      setContractStatus(contractStatusResponse.data.contract.status);
      console.log(contractStatus);
      if (contractStatus === null) {
        window.alert(
          "Contract still sending... Please try again in a few seconds"
        );
        return;
      }
      if (contractStatus === "signed") {
        window.alert(
          "Contract Status requested succesfully: Signed! Thanks for signing the contract, you will now be redirected to the stripe payment page..."
        );
        console.log("hello");
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
          const response = await createCheckoutSession(
            productName,
            formattedPrice
          );
          console.log(response);
          if (response != null) {
            console.log(response);
            window.alert("unique transaction id:" + response.transactionId);
            setTransactionId(response.transactionId);
            window.location.href = response.url; // Redirect to Stripe Checkout
          } else {
            // Handle error response
            console.error("Failed to create checkout session");
          }
        } catch (error) {
          console.error("Error creating checkout session:", error);
        }
      } else if (contractStatus === "sent") {
        window.alert(
          'Contract Status requested succesfully: Not Signed. Please keep this page open and check your email to review the contract. Once the contract has been signed, come back to this page and click "Proceed to Payment" again'
        );
      }
    } catch {
      window.alert(
        "Contract Status request failed. Please try again in a few minutes."
      );
    }
  };

  // Handle change event for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "phoneNumber") {
      // Check if the phone number has reached the desired length (10 digits)
      const isPhoneNumberValid = value.length === 10;
      setPhoneNumberValid(isPhoneNumberValid);
    }
  };

  const priceTooltip = (
    <Tooltip id="price-tooltip" style={{ marginLeft: "-150px" }}>
      {/* Add your price breakdown information here */}
      {props.numNights} nights price: ${props.nightsPrice} <br></br>
      Cleaning Fee: $185 <br></br>
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
            (click for price breakdown)
          </span>
        </h4>
      </OverlayTrigger>

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
        {
          <PatternFormat
            format="(+##) ###-###-####"
            mask="_"
            isNumericString={true}
            allowEmptyFormatting={false}
            customInput={(props) => {
              return (
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
                    {...props}
                    type="tel"
                  />
                </Form.Group>
              );
            }}
          />
        }
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
        {showBook && (
          <Button
            variant="primary"
            onClick={handleBook}
            className="custom-primary-button"
          >
            Book
          </Button>
        )}
        {/* Render "Proceed to Payment" button conditionally */}
        {showProceedToPayment && (
          <Button
            variant="primary"
            onClick={handlePayment}
            className="custom-primary-button"
          >
            Go to Payment
          </Button>
        )}
      </Form>
    </>
  );
}

export default GuestInfoPaymentPageModal;
