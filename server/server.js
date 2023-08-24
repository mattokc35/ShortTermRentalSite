const express = require('express');
const cors = require('cors');
const ical = require("node-ical");
const Moment = require('moment');
const {extendMoment} =require('moment-range');

const moment = extendMoment(Moment);

const app = express();

app.use(cors());
app.use(express.json());



//parse calendar
let BookedRanges = [];
const events = ical.sync.parseFile("listing-770162982905269943.ics");
delete events.vcalendar;
delete events.prodid;


//calendar dates
Object.entries(events).map((entry) => {
  let value = entry[1];
  let startDate = JSON.stringify(value.start).substring(1, 24);
  let endDate = JSON.stringify(value.end).substring(1, 24);
  //calculate checked out date ranges with moment.js and add to BookedRanges array
  BookedRanges = [...BookedRanges, 
    moment.range(
      moment(startDate),
      moment(endDate)
    ),
  ];
 

});


//calendar get request
app.get('/calendar-request', (req, res) => {
    res.send({BookedRanges})
} )

//price calculation post request
app.post('/initial-request', (req, res) => {
    let totalPrice = req.body.numberOfNights * 200;
    console.log(req.body);
    res.json({ totalPrice });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });