const express = require("express");
const cors = require("cors");
const ical = require("node-ical");
const Moment = require("moment");
const { extendMoment } = require("moment-range");
const emailjs = require("@emailjs/browser");
const moment = extendMoment(Moment);
const nodemailer = require("nodemailer");

const app = express();

const STRIPE_PAYMENT_KEY_PRIVATE = process.env.STRIPE_PAYMENT_KEY_PRIVATE;
const PRICELABS_KEY = process.env.PRICELABS_KEY;
const ESIGN_API_KEY = process.env.ESIGN_API_KEY;
const AIRBNB_LISTING_ID = process.env.AIRBNB_LISTING_ID;
const NODEMAILER_GMAIL_PASSWORD = process.env.NODEMAILER_GMAIL_PASSWORD;
const CONTRACT_TEMPLATE_ID = process.env.CONTRACT_TEMPLATE_ID;
const stripe = require("stripe")(STRIPE_PAYMENT_KEY_PRIVATE);
const Google_CAPTCHA_API_KEY = process.env.Google_CAPTCHA_API_KEY;

const bodyParser = require("body-parser");

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

//uuid unique transaction ID generator
const { v4: uuidv4 } = require("uuid");

function generateUniqueTransactionId() {
  // Generate a random UUID (Universally Unique Identifier) version 4
  return uuidv4();
}

const corsOptions = {
  origin: [
    //your origins here
  ], // Replace with your allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent with the request
  optionsSuccessStatus: 204, // No content response for preflight requests
};

app.use(cors(corsOptions));
app.use(express.json());

const YOUR_DOMAIN = "your-domain-here";

let contractEmailDataObject = {};

const sendContractAndEmail = async (contractEmailDataObject) => {
  //contract request (create contract)
  const templateId = CONTRACT_TEMPLATE_ID;
  const signers = [
    {
      name: contractEmailDataObject.guest,
      email: contractEmailDataObject.email,
    },
  ];

  const placeholderFields = [
    { api_key: "Guests", value: contractEmailDataObject.name },
    { api_key: "Owners", value: contractEmailDataObject.Owners },
    { api_key: "Today", value: contractEmailDataObject.today },
    { api_key: "Total_Rent", value: contractEmailDataObject.total_rent },
    { api_key: "Total_Guests", value: contractEmailDataObject.total_guests },
    { api_key: "Checkin", value: contractEmailDataObject.Checkin },
    { api_key: "Checkout", value: contractEmailDataObject.Checkout },
    { api_key: "Guest_email", value: contractEmailDataObject.Guest_email },
    { api_key: "Checkin_Time", value: contractEmailDataObject.Checkin_Time },
    { api_key: "Checkout_Time", value: contractEmailDataObject.Checkout_Time },
  ];

  let contractEmailDataObjectWithContractID;

  try {
    const response = await fetch(
      "https://esignatures.io/api/contracts?token=" + ESIGN_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template_id: templateId,
          signers,
          placeholder_fields: placeholderFields,
        }),
      }
    );

    if (!response.ok) {
      res.status(response.status).send("Contract POST request failed"); // Use res.send to send the error response
    }
    const responseData = await response.json(); //Parse the JSON response
    const contractID = responseData?.data?.contract?.id; //extract the contract ID
    contractEmailDataObjectWithContractID = {
      ...contractEmailDataObject,
      contractID: contractID,
    };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  //after contract is sent, send email
  emailResponse = await sendEmail(contractEmailDataObjectWithContractID);
};

const PriceLabsRequest = async (input) => {
  try {
    const response = await fetch("https://api.pricelabs.co/v1/listing_prices", {
      method: "POST",
      mode: "cors",
      headers: {
        "X-API-Key": PRICELABS_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listings: [
          {
            id: AIRBNB_LISTING_ID,
            pms: "airbnb",
          },
        ],
      }),
    });
    if (!response.ok) {
      // Handle non-200 status codes if needed
      throw new Error("Network response was not ok");
    }
    const priceDataResponse = await response.json(); // Return the parsed data
    return priceDataResponse;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error:", error);
    return null; // Return null or a default value if there was an error
  }
};

//async function to load calendar from Airbnb url and parse ics file for booked dates
async function getCalendarFiles() {
  let BookedRanges = [];
  const airbnbEvents = await ical.async.fromURL("your-ical-link-here");

  const vrboEvents = await ical.async.fromURL("your-ical-link-here");

  delete vrboEvents.vcalendar;
  delete vrboEvents.prodid;
  delete airbnbEvents.vcalendar;
  delete airbnbEvents.prodid;
  const eventsCombined = { ...airbnbEvents, ...vrboEvents };

  //calendar dates
  Object.entries(eventsCombined).map((entry) => {
    let value = entry[1];
    let startDate = JSON.stringify(value.start).substring(1, 24);
    let endDate = JSON.stringify(value.end).substring(1, 24);
    //calculate checked out date ranges with moment.js and add to BookedRanges array
    BookedRanges = [
      ...BookedRanges,
      moment.range(moment(startDate), moment(endDate)),
    ];
  });
  return BookedRanges;
}

async function sendEmail(emailValues) {
  try {
    // Create a transporter using SMTP or other transport mechanism
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "your-email-here", // Your email
        pass: NODEMAILER_GMAIL_PASSWORD,
      },
    });

    // Setup email data
    let mailOptions = {
      from: "your-email-here", // Sender address
      cc: "your-email-here",
      to: emailValues.email, // Receiver address
      subject: "Booking Confirmation - Sapphire By The Sea", // Subject line
      html: `
        <p>Hello ${emailValues.guest},</p>

        <p>Thank you for completing your booking for Sapphire By The Sea! This email serves as your payment confirmation. Also, a contract from eSignature.io has been sent to your email, and you will have 48 hours to sign this contract to finialize your booking. If you have any questions or concerns, feel free to reach out to us via sapphirecbtx@gmail.com. Once again, thank you for choosing Sapphire By The Sea in Crystal Beach, TX!</p>

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

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

//contract get request
app.post("/get-contract-status", async (req, res) => {
  const contract_id = req.body.id;
  try {
    const response = await fetch(
      "https://esignatures.io/api/contracts/" +
        contract_id +
        "?token=" +
        ESIGN_API_KEY,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      res.send(responseData); // Use res.send to send the response
    } else {
      res.status(response.status).send("Contract GET request failed"); // Use res.send to send the error response
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//calendar get request
app.get("/calendar-request", async (req, res) => {
  try {
    const BookedRanges = await getCalendarFiles();
    res.send({ BookedRanges });
  } catch (error) {
    console.error("Error fetching calendar files:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//price GET request
app.get("/price-request", async (req, res) => {
  const PriceData = await PriceLabsRequest();
  res.send({ PriceData });
});

const transactions = {}; // In-memory storage for transaction IDs and their respective Stripe session IDs

app.post("/create-checkout-session", async (req, res) => {
  // Generate a unique transaction ID (you can use libraries like UUID for this purpose)
  const transactionId = generateUniqueTransactionId(); // Function to generate a unique ID

  // Retrieve other details from the request body
  const { productName, priceAmount } = req.body;

  // Create a new product dynamically
  const product = await stripe.products.create({
    name: productName,
    type: "service",
  });

  // Generate a new price for the created product
  const price = await stripe.prices.create({
    unit_amount: parseInt(priceAmount),
    currency: "usd",
    product: product.id,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    client_reference_id: transactionId, // Attach your unique transaction ID as a reference
  });

  // Store the relationship between the transaction ID and session ID
  transactions[transactionId] = session.id;

  // Respond with JSON containing the session URL and your transaction ID
  res.status(200).json({ url: session.url, transactionId });
});

//stripe webhook to listen for successful payments
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;

    switch (event.type) {
      case "checkout.session.completed":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for' ${paymentIntent.amount} was successful!`
        );
        sendContractAndEmail(contractEmailDataObject);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    response.send();
  }
);

// Handle the post request to '/sendDataToBackend' and trigger Contract generation and request, plus email
app.post("/sendDataToBackend", async (req, res) => {
  try {
    contractEmailDataObject = req.body; // Retrieve the data sent in the request body
    // Process and use contractEmailDataObject as needed

    // Example: Log the received data
    console.log("Received data from frontend:");
    console.log(contractEmailDataObject);

    // Assuming you want to acknowledge the successful reception of data
    res.status(200).send("Data received successfully by the backend");
  } catch (error) {
    console.log(error);
    res.status(500).send("Network Error");
  }
});

app.post("/create-verification-session", async (req, res) => {
  try {
    // Assuming you have some user information in the request body
    const { userId } = req.body;

    // Authenticate your user here if needed

    // Create the verification session
    const verificationSession =
      await stripe.identity.verificationSessions.create({
        type: "document",
        metadata: {
          user_id: userId,
        },
      });

    // Return the client secret to the frontend
    const clientSecret = verificationSession.client_secret;

    res.status(200).json({ clientSecret });
  } catch (error) {
    console.error("Error creating verification session:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(443, () => {
  console.log(`Server is running on port 443.`);
});
