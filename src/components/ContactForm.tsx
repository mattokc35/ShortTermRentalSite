import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import "./ContactForm.css";

interface ContactFormProps {}

const ContactForm: React.FC<ContactFormProps> = () => {
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("SEND EMAIL");
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID!,
        process.env.REACT_APP_EMAIL_JS_TEMPLATE_2!,
        form.current!,
        process.env.REACT_APP_EMAIL_JS_KEY!
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    window.alert("Thanks for contacting us! We will get back to you soon.");
  };
  return (
    <>
      <div className="ContactForm">
        <h4>Question or comment? Send us a message...</h4>
        <Form ref={form} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Guest Name</Form.Label>
            <Form.Control
              required
              type="name"
              name="user_name"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="user_email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Questions/Comments/Phone Number</Form.Label>
            <Form.Control required as="textarea" rows={3} name="message" />
          </Form.Group>
          <Button
            className="contactSubmitButton"
            type="submit"
            variant="primary"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;
