import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

function ContactForm() {
  const form = useRef();

  const handleSubmit = (e) => {
    console.log("SEND EMAIL");
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2ri49gn",
        "template_uy890gd",
        form.current,
        "BGNlp5_rCnHoCXEsB"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <div className="ContactForm">
        <Form ref={form}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Guest Name</Form.Label>
            <Form.Control
              type="name"
              name="user_name"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            name="user_email"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="user_email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Questions/Comments</Form.Label>
            <Form.Control as="textarea" rows="3" name="message" />
          </Form.Group>
          <Button
            className="contactSubmitButton"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ContactForm;
