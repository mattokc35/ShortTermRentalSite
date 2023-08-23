const express = require('express');
const cors = require('cors');
const ical = require("node-ical");

const app = express();

app.use(cors());
app.use(express.json());



//parse calendar
let checkedOutDates = [];
const events = ical.sync.parseFile("listing-770162982905269943.ics");
delete events.vcalendar;
delete events.prodid;

//calendar dates
Object.entries(events).map((entry) => {
  let value = entry[1];
  let startDate = JSON.stringify(value.start).substring(1, 24);
  let endDate = JSON.stringify(value.end).substring(1, 24);
  console.log(startDate, "\n", endDate, "\n\n");
  checkedOutDates.push(startDate, endDate);
});



app.get('/calendar-request', (req, res) => {
    res.send({checkedOutDates})
} )

app.post('/initial-request', (req, res) => {
    let totalPrice = req.body.numberOfNights * 200;
    console.log(req.body);
    res.json({ totalPrice });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });