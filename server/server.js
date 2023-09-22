const express = require("express");
const cors = require("cors");
const ical = require("node-ical");
const Moment = require("moment");
const { extendMoment } = require("moment-range");
const moment = extendMoment(Moment);

const app = express();

app.use(cors());
app.use(express.json());

//parse calendar
let BookedRanges = [];

const PriceLabsRequest = async (input) => {
  try {
    const response = await fetch("https://api.pricelabs.co/v1/listing_prices", {
      method: "POST",
      headers: {
        "X-API-Key": "API-key-here",
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

//async function to load calendar from Airbnb url and parse ics file for booked dates
async function getCalendarFile() {
  const events = await ical.async.fromURL("your-ical-link-here");
  delete events.vcalendar;
  delete events.prodid;
  console.log(events);

  //calendar dates
  Object.entries(events).map((entry) => {
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

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
