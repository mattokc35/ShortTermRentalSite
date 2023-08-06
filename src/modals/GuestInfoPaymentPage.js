import "./GuestInfoPaymentPageModal.css";
import TextInput from "../inputs/TextInput";
import { useState, React } from "react";

function GuestInfoPaymentPageModal(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [comments, setComments] = useState("");
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <button onClick={() => props.closeModal(false)}> X </button>

          <h1>Reservation Info</h1>
          <h2>
            {" "}
            <bold> Reservation Dates: </bold> {props.startDate.substr(1, 10)} to{" "}
            {props.endDate.substr(1, 10)}
          </h2>
          <h2>
            {" "}
            <bold> Adults: </bold> {props.adults} <bold> Children: </bold>{" "}
            {props.children} <bold> Infants: </bold> 0 <bold> Pets: </bold> 0
          </h2>
          <h2>
            {" "}
            <bold> Total Price:</bold> ${props.price}
          </h2>

          <h1>Guest Info</h1>
          <div className="TextInputRow">
            <TextInput
              label="Guest Name: "
              className="textInputClass"
            ></TextInput>
          </div>
          <div className="TextInputRow">
            <TextInput
              label="Email Address:  "
              className="textInputClass"
            ></TextInput>
          </div>
          <div className="TextInputRow">
            <TextInput
              label="Phone Number:"
              className="textInputClass"
            ></TextInput>
          </div>
          <div className="TextInputRow">
            <div className="TextAreaContainer">
              <label>Questions or Comments?</label>
              <textarea></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuestInfoPaymentPageModal;
