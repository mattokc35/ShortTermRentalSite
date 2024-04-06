import "./GuestInfoPaymentPageModal.scss";
import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import IDVerificationButton from "../components/IDVerificationButton";
import {
  getCurrentDate,
  calculatePromoCodePrice,
} from "../helpers/helperFunctions";
import {
  owners,
  checkinTime,
  checkoutTime,
  contractUrl,
} from "../constants/constants";
import Form from "react-bootstrap/Form";
import {
  createCheckoutSession,
  sendContractEmailDataToBackend,
  verifyPromoCode,
} from "../network/networkRequests";
import { loadStripe } from "@stripe/stripe-js";
import ReCAPTCHA from "react-google-recaptcha";
import ValidationText from "../components/validationText/ValidationText";
import {
  GuestInfoPaymentPageModalProps,
  ContractEmailData,
} from "../types/types";

const GuestInfoPaymentPageModal: React.FC<GuestInfoPaymentPageModalProps> = (
  props: GuestInfoPaymentPageModalProps
) => {
  const form = useRef<HTMLFormElement>(null);
  const recaptcha = useRef<ReCAPTCHA>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY!
  );
  const [isIDVerified, setIsIDVerified] = useState<boolean | undefined>(
    undefined
  );
  const [isContractViewed, setIsContractViewed] = useState<boolean | undefined>(
    undefined
  );
  const [isInquiryValid, setIsInquiryValid] = useState<boolean | undefined>(
    undefined
  );
  const [inquiryErrorText, setInquiryErrorText] = useState<string>("");
  const [showCaptchaValidationMessage, setShowCaptchaValidationMessage] =
    useState(false);
  const [captchaValue, setCaptchaValue] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoCodeValid, setIsPromoCodeValid] = useState<boolean | undefined>(
    undefined
  );
  const [promoCodeDiscountPercentage, setPromoCodeDiscountPercentage] =
    useState<number>(0);
  const [promoCodeDiscountPrice, setPromoCodeDiscountPrice] = useState<number>(
    props.discountedNightsPrice
  );
  const [totalPrice, setTotalPrice] = useState<number>(props.price);
  const [tax, setTax] = useState<number>(props.tax);

  useEffect(() => {
    console.log(totalPrice);
    const promoCodePriceArray = calculatePromoCodePrice(
      props.nightsPrice,
      props.discountedNightsPrice,
      promoCodeDiscountPercentage,
      props.petFee
    );
    console.log(promoCode);
    setPromoCodeDiscountPrice(promoCodePriceArray[0]);
    setTotalPrice(promoCodePriceArray[1]);
    setTax(promoCodePriceArray[2]);
  }, [promoCodeDiscountPercentage]);
  // callback function to get ID verification result from child component IDVerificationButton
  const handleVerificationResult = (verificationResult: boolean) => {
    setIsIDVerified(verificationResult);
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
  const checkRecaptcha = () => {
    const captchaValue = recaptcha.current!.getValue();
    setCaptchaValue(
      captchaValue === "true"
        ? true
        : captchaValue === "false"
        ? false
        : (null as any)
    );
    if (!captchaValue) {
      setShowCaptchaValidationMessage(true);
      return false;
    }
    return true;
  };
  const handleSubmitInquiry = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const phoneNumber = form.phoneNumber.value;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setIsInquiryValid(false);
      setInquiryErrorText("Please fill out all form fields.");
      return;
    }
    if (phoneNumber.length !== 12) {
      setIsInquiryValid(false);
      event.preventDefault();
      event.stopPropagation();
      setInquiryErrorText("Please enter a valid phone number.");
      return;
    }
    event.preventDefault();
    if (!checkRecaptcha()) {
      return;
    }
    // Include props values in the formData object
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID!,
        process.env.REACT_APP_EMAIL_JS_TEMPLATE_1!,
        form,
        process.env.REACT_APP_EMAIL_JS_KEY!
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
          setIsInquiryValid(false);
          setInquiryErrorText("Error submitting inquiry, please try again");
        }
      );
    setValidated(true);
    setIsInquiryValid(true);
  };
  const handleBook = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form as HTMLFormElement;
    const phoneNumber = form.phoneNumber.value;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setIsInquiryValid(false);
      setInquiryErrorText("Please fill out all form fields.");
      return;
    }
    if (phoneNumber.length !== 12) {
      setIsInquiryValid(false);
      event.preventDefault();
      event.stopPropagation();
      setInquiryErrorText("Please enter a valid phone number.");
      return;
    }
    event.preventDefault();
    if (!checkRecaptcha()) {
      return;
    }
    window.alert("Redirecting to Stripe payment page!");
    const currentDate = getCurrentDate();
    // Define placeholder values for fields you don't have yet
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
      const price: number = props.price; // Replace this with your actual props.price value
      // Convert the price to the desired string format
      const formattedPrice = (price * 100).toFixed(4);
      const response = await createCheckoutSession(productName, formattedPrice);
      //if checkout session is created successfully, we want to pass transactionId, and contract/email values to the backend
      if (response != null) {
        const contractEmailDataObject: ContractEmailData = {
          transactionId: response.transactionId,
          nightsPrice: props.nightsPrice,
          petFee: props.petFee,
          adults: props.adults,
          children: props.children,
          phoneNumber: formData.phoneNumber,
          comments: formData.comments,
          email: formData.email,
          Owners: owners,
          promoCode: promoCode,
          promoCodeDiscountPercentage: promoCodeDiscountPercentage,
          promoCodeDiscountPrice: promoCodeDiscountPrice,
          total_rent: totalPrice,
          total_guests: props.adults + props.children + props.infants,
          Checkin: props.startDate.substr(1, 10),
          Checkout: props.endDate.substr(1, 10),
          Checkin_Time: checkinTime,
          Checkout_Time: checkoutTime,
          today: currentDate,
          discountedNightsPrice: props.discountedNightsPrice,
          discountPercentage: props.discountPercentage,
          averageNightlyPrice: props.averageNightlyPrice,
          numberOfNights: props.numberOfNights,
          tax: tax,
          guest: formData.name,
          infants: props.infants,
          pets: props.pets,
        };
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePromoCodeValidation = () => {
    verifyPromoCode(promoCode)
      .then((promoCodeData) => {
        if (promoCodeData) {
          console.log(promoCodeData);
          setIsPromoCodeValid(promoCodeData.isPromoValid);
          setPromoCodeDiscountPercentage(promoCodeData.discountPercentage);
        }
      })
      .catch((error) => {
        console.error("Error verifying promo code:", error);
      });
  };

  const priceTooltip = (
    <Tooltip id="price-tooltip" style={{ marginLeft: "-150px" }}>
      {/* Add your price breakdown information here */}
      {props.numberOfNights} nights price: ${props.nightsPrice} <br></br>
      {props.hasDiscount && (
        <>
          <div
            style={{ color: "white" }}
          >{`Length of Stay Discount Price: $${props.discountedNightsPrice} (${props.discountPercentage}% off for ${props.numberOfNights} nights)`}</div>
        </>
      )}
      {isPromoCodeValid && (
        <>
          <div style={{ color: "white" }}>
            {`Promo Code: ${promoCodeDiscountPercentage}% off for ${promoCode}`}
          </div>
          <div style={{ color: "white" }}>
            {`Promo Code Discount Price: $${promoCodeDiscountPrice}`}
          </div>
        </>
      )}
      Cleaning Fee: $225 <br></br>
      Pet Fee: ${props.petFee} <br></br>
      Tax: ${tax.toFixed(2)} <br></br>
      Total Price: ${totalPrice.toFixed(2)}
    </Tooltip>
  );
  return (
    <>
      <h5 className="checkoutInfoText">
        {" "}
        <strong> Reservation Dates: </strong> {props.startDate.substr(1, 10)} to{" "}
        {props.endDate.substr(1, 10)}
      </h5>
      <h5 className="checkoutInfoText">
        {" "}
        <strong> Adults: </strong> {props.adults} <strong> Children: </strong>{" "}
        {props.children} <strong> Infants: </strong> {props.infants}{" "}
        <strong> Pets: </strong> {props.pets}
      </h5>
      <OverlayTrigger
        placement="right"
        overlay={priceTooltip}
        trigger={["click", "focus"]}
        show={showTooltip}
      >
        <h4 className="totalPriceText">
          {" "}
          <strong> Total Price:</strong> ${totalPrice.toFixed(2)}
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
      <p className="guest-instructions" style={{ textAlign: "center" }}>
        Please fill out this form to send us an inquiry! If would like to
        proceed to payment, please complete the ID Verification and Contract
        Viewing steps first, then a payment option will be available.
      </p>
      <Form validated={validated} onSubmit={handleSubmitInquiry} ref={form}>
        <input type="hidden" name="adults" value={props.adults} />
        <input type="hidden" name="children" value={props.children} />
        <input type="hidden" name="price" value={totalPrice} />
        <input type="hidden" name="tax" value={tax} />
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
          name="averageNightlyPrice"
          value={props.averageNightlyPrice}
        ></input>
        <input
          type="hidden"
          name="promoCodeDiscountPrice"
          value={promoCodeDiscountPrice}
        ></input>
        <input
          type="hidden"
          name="promoCodeDiscountPercentage"
          value={promoCodeDiscountPercentage}
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
            rows={3}
          />
          <Form.Group controlId="formBasicPromoCode" className="mb-3">
            <Form.Label>Promo Code</Form.Label>
            <Form.Control
              name="promoCode"
              onChange={(e) => setPromoCode(e.target.value)}
              value={promoCode}
              type="text"
              placeholder={`Have a promo code? Enter here and press "Validate"`}
            ></Form.Control>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <ValidationText
                isValid={isPromoCodeValid}
                validationText={
                  "Promo code is valid! Check price breakdown for discount details."
                }
                errorText={"Promo code is not valid"}
                starterText={""}
              />
            </div>
            <div className="button-container" style={{ textAlign: "right" }}>
              <Button
                variant="primary"
                onClick={handlePromoCodeValidation}
                className="custom-primary-button"
              >
                Validate Promo Code
              </Button>
            </div>
          </Form.Group>
        </Form.Group>
        <div className="button-container">
          <ReCAPTCHA
            ref={recaptcha}
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_KEY!}
          />
          {showCaptchaValidationMessage && (
            <ValidationText
              isValid={captchaValue}
              starterText={""}
              validationText={"ReCAPTCHAv3 Completed!"}
              errorText={"Please complete the ReCAPTCHAv3 to proceed."}
            ></ValidationText>
          )}
          <Button className="custom-primary-button" type="submit">
            Send An Inquiry
          </Button>
          {!(isContractViewed && isIDVerified) && (
            <>
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
                  try {
                    window.open(contractUrl, "_blank");
                    setIsContractViewed(true);
                  } catch (e) {
                    console.error("Contract not opened successfully: ", e);
                    setIsContractViewed(false);
                  }
                }}
                className="custom-primary-button"
              >
                View Contract
              </Button>
            </>
          )}

          {isContractViewed && isIDVerified && (
            <Button
              variant="primary"
              onClick={handleBook}
              className="custom-primary-button"
            >
              Proceed to Payment
            </Button>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <ValidationText
            isValid={isInquiryValid}
            validationText={
              "Thanks for the inquiry! We'll contact you shortly."
            }
            errorText={inquiryErrorText}
            starterText={""}
          />
          <ValidationText
            isValid={isIDVerified}
            validationText={"ID verified successfully!"}
            errorText={"ID not verified. Please try again."}
            starterText={""}
          />

          <ValidationText
            isValid={isContractViewed}
            validationText={"Contract viewed successfully!"}
            errorText={"Contract loaded unsuccessfully. Please try again."}
            starterText={""}
          />
        </div>
      </Form>
    </>
  );
};

export default GuestInfoPaymentPageModal;
