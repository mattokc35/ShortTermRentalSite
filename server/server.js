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

//async function to load calendar from Airbnb url and parse ics file for booked dates
async function getCalendarFile() {
  const events = await ical.async.fromURL(
    "https://www.airbnb.com/calendar/ical/770162982905269943.ics?s=63817d9286ead63fe7a154c9f82201b9"
  );
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
      moment.range(moment(startDate), moment(endDate).subtract(1 ,'days')),
    ];
  });
};

getCalendarFile();


//calendar get request
app.get("/calendar-request", (req, res) => {
  res.send({ BookedRanges });
});

//price calculation post request
app.post("/initial-request", (req, res) => {
  let totalPrice = req.body.numberOfNights * 200;
  console.log(req.body);
  res.json({ totalPrice });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
