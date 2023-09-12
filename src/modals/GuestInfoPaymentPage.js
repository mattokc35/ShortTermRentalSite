import "./GuestInfoPaymentPageModal.css";
import { useState, React } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

function GuestInfoPaymentPageModal(props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comments: "",
  });
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Handle change event for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      <h4>
        {" "}
        <bold> Total Price:</bold> ${props.price}
      </h4>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          onSubmit={handleSubmit}
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

        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            type="tel"
            placeholder="Phone Number"
          />
          <Form.Text className="text-muted">
            We'll never share your phone number with anyone else.
          </Form.Text>
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
        <Button type="submit">Submit form</Button>
      </Form>
    </>
  );
}

export default GuestInfoPaymentPageModal;
