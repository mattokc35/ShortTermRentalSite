// routes/calendarRoutes.js
const express = require("express");
const calendarController = require("../controllers/calendarController");

const router = express.Router();

router.get("/calendar-request", calendarController.getCalendarFiles);

module.exports = router;
