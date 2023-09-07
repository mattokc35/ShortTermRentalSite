import "./GuestInfoPaymentPageModal.css";
import { useState, React } from "react";

import Form from "react-bootstrap/Form";

function GuestInfoPaymentPageModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [comments, setComments] = useState("");
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
        {props.children} <bold> Infants: </bold> 0 <bold> Pets: </bold> 0
      </h5>
      <h4>
        {" "}
        <bold> Total Price:</bold> ${props.price}
      </h4>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Guest Name</Form.Label>
          <Form.Control type="name" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="Phone Number" />
          <Form.Text className="text-muted">
            We'll never share your phone number with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Questions/Comments</Form.Label>
          <Form.Control as="textarea" rows="3" name="address" />
        </Form.Group>
      </Form>
    </>
  );
}

export default GuestInfoPaymentPageModal;
