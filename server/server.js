const express = require("express");
const cors = require("cors");
const ical = require("node-ical");
const Moment = require("moment");
const { extendMoment } = require("moment-range");
const moment = extendMoment(Moment);

const app = express();

const stripe = require("stripe")("your-key-here");
const bodyParser = require("body-parser");

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

//uuid unique transaction ID generator
const { v4: uuidv4 } = require("uuid");

function generateUniqueTransactionId() {
  // Generate a random UUID (Universally Unique Identifier) version 4
  return uuidv4();
}

const ESIGN_API_TOKEN = "your-token-here";

const corsOptions = {
  origin: ["localhost:3000"], // Replace with your allowed origin(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent with the request
  optionsSuccessStatus: 204, // No content response for preflight requests
};

app.use(cors(corsOptions));
app.use(express.json());

//parse calendar
let BookedRanges = [];

const YOUR_DOMAIN = "your-domain-here";

const PriceLabsRequest = async (input) => {
  try {
    const response = await fetch("https://api.pricelabs.co/v1/listing_prices", {
      method: "POST",
      mode: "cors",
      headers: {
        "X-API-Key": "your-key-here",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listings: [
          {
            id: "your-id-here",
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

//async function to load calendar from Airbnb and Vrbo ical url and parse ics file for booked dates
async function getCalendarFile() {
  const airbnbEvents = await ical.async.fromURL("your-ical-link-here");
  delete airbnbEvents.vcalendar;
  delete airbnbEvents.prodid;
  const vrboEvents = await ical.async.fromURL("your-ical-link-here");
  delete vrboEvents.vcalender;
  delete vrboEvents.prodid;

  const combinedEvents = { ...airbnbEvents, ...vrboEvents };

  //calendar dates
  Object.entries(combinedEvents).map((entry) => {
    let value = entry[1];
    let startDate = JSON.stringify(value.start).substring(1, 24);
    let endDate = JSON.stringify(value.end).substring(1, 24);
    //calculate checked out date ranges with moment.js and add to BookedRanges array
    BookedRanges = [
      ...BookedRanges,
      moment.range(moment(startDate), moment(endDate)),
    ];
  });
}

PriceLabsRequest();
getCalendarFile();

//Express Requests

//contract post request
app.post("/create-contract", async (req, res) => {
  const templateId = "your-template-id-here";
  const signers = [
    {
      name: req.body.Guests,
      email: req.body.Guest_email,
    },
  ];

  const placeholderFields = [
    { api_key: "Guests", value: req.body.Guests },
    { api_key: "Owners", value: req.body.Owners },
    { api_key: "Today", value: req.body.Today },
    { api_key: "Total_Rent", value: req.body.Total_Rent },
    { api_key: "Total_Guests", value: req.body.Total_Guests },
    { api_key: "Checkin", value: req.body.Checkin },
    { api_key: "Checkout", value: req.body.Checkout },
    { api_key: "Guest_email", value: req.body.Guest_email },
    { api_key: "Checkin_Time", value: req.body.Checkin_Time },
    { api_key: "Checkout_Time", value: req.body.Checkout_Time },
  ];

  try {
    const response = await fetch(
      "https://esignatures.io/api/contracts?token=" + ESIGN_API_TOKEN,
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

    if (response.ok) {
      const responseData = await response.json();
      res.send(responseData); // Use res.send to send the response
    } else {
      res.status(response.status).send("Contract POST request failed"); // Use res.send to send the error response
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//contract get request
app.post("/get-contract-status", async (req, res) => {
  const contract_id = req.body.id;
  try {
    const response = await fetch(
      "https://esignatures.io/api/contracts/" +
        contract_id +
        "?token=" +
        ESIGN_API_TOKEN,
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
app.get("/calendar-request", (req, res) => {
  res.send({ BookedRanges });
});

//price calculation post request
app.post("/initial-request", (req, res) => {
  let totalPrice = req.body.numberOfNights * 200;
  res.json({ totalPrice });
});

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
  contractEmailDataObject = req.body; // Retrieve the data sent in the request body
  // Process and use contractEmailDataObject as needed

  // Example: Log the received data
  console.log("Received data from frontend:");
  console.log(contractEmailDataObject);

  // Assuming you want to acknowledge the successful reception of data
  res.status(200).send("Data received successfully by the backend");
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
