import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
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
      <h3>Send Us A Message Below</h3>
      <div className="ContactForm">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name: 
          <input type="text" name="user_name" />
          </label>
          <label>Email:  
          <input type="email" name="user_email" />
          </label>
          <label>Message:
          <textarea name="message" />
          </label>
          <br/>
          <input type="submit" className="contactButton" value="Send" />
          <br/>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
