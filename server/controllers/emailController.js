const nodemailer = require("nodemailer");

const NODEMAILER_GMAIL_PASSWORD = process.env.NODEMAILER_GMAIL_PASSWORD;

const sendEmail = async (emailValues) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "your-email-here",
        pass: NODEMAILER_GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "your-email-here",
      cc: "your-email-here",
      to: emailValues.email,
      subject: "Booking Confirmation - Sapphire By The Sea",
      html: `
        <p>Hello ${emailValues.guest},</p>

        <p>Thank you for completing your booking for Sapphire By The Sea! This email serves as your payment confirmation. Also, a contract from eSignature.io has been sent to your email, and you will have 48 hours to sign this contract to finalize your booking. If you have any questions or concerns, feel free to reach out to us via sapphirecbtx@gmail.com. Once again, thank you for choosing Sapphire By The Sea in Crystal Beach, TX!</p>

        <p>-------------------------------------------------------------------------</p>

        <p>Below is your booking information:</p>

        <p>Check-in Date: ${emailValues.Checkin}</p>
        <p>Check-out Date: ${emailValues.Checkout}</p>

        <p> Guest name: ${emailValues.guest}</p>
        <p> Guest email: ${emailValues.email}</p>
        <p> Guest phone number: ${emailValues.phoneNumber}</p>
        <p> Guest comments: ${emailValues.comments}</p>

        <p>Adults: ${emailValues.adults}</p>
        <p>Children: ${emailValues.children}</p>
        <p>Infants: ${emailValues.infants}</p>
        <p>Pets: ${emailValues.pets}</p>
        <p>Total guests: ${emailValues.total_guests}</p>

        <p>$${emailValues.averageNightlyPrice} x ${emailValues.numberOfNights} nights: ${emailValues.nightsPrice}</p>
        <p>After discount: $${emailValues.discountedNightsPrice}</p>
        <p>Cleaning Fee: $225</p>
        <p>Taxes: $${emailValues.tax}</p>
        <p>Pet fee: $${emailValues.petFee}</p>
        <p>Booking total (USD): $${emailValues.total_rent}</p>

        <p>Stripe transaction ID: ${emailValues.transactionId}</p>
        <p>eSignature.io contract ID: ${emailValues.contractID}</p>

        <p>Best wishes,</p>

        <p><Your Name Here><p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
};

module.exports = sendEmail;
