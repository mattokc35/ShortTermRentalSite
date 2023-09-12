const ical = require("node-ical");

const events = ical.sync.parseFile("listing-770162982905269943.ics");
delete events.vcalendar;
delete events.prodid;

Object.entries(events).map((entry) => {
  let key = entry[0];
  let value = entry[1];
  let startDate = JSON.stringify(value.start).substring(1, 25);
  let endDate = JSON.stringify(value.end).substring(1, 25);
  console.log(startDate, "\n", endDate, "\n\n");
  return startDate, endDate;
});

