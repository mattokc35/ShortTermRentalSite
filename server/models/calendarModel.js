const ical = require("node-ical");
const moment = require("moment");
const { extendMoment } = require("moment-range");

const Moment = require("moment");
const moment = extendMoment(Moment);

const fetchCalendarData = async () => {
  try {
    const airbnbEvents = await ical.async.fromURL("your-airbnb-ical-link");
    const vrboEvents = await ical.async.fromURL("your-vrbo-ical-link");

    delete vrboEvents.vcalendar;
    delete vrboEvents.prodid;
    delete airbnbEvents.vcalendar;
    delete airbnbEvents.prodid;

    const eventsCombined = { ...airbnbEvents, ...vrboEvents };

    const bookedRanges = Object.entries(eventsCombined).map(([key, value]) => {
      const startDate = moment(value.start).format("YYYY-MM-DD");
      const endDate = moment(value.end).format("YYYY-MM-DD");
      const range = moment.range(startDate, endDate);
      return range;
    });

    return bookedRanges;
  } catch (error) {
    console.error("Error fetching calendar files:", error.message);
    throw new Error("Internal Server Error");
  }
};

module.exports = { fetchCalendarData };
