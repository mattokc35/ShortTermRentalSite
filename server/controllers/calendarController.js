const calendarModel = require("../models/calendarModel");

const getCalendarFiles = async (req, res) => {
  try {
    const bookedRanges = await calendarModel.fetchCalendarData();
    res.status(200).json({ bookedRanges });
  } catch (error) {
    console.error("Error fetching calendar files:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCalendarFiles };
