const express = require("express");
const router = express.Router();
const priceController = require("../controllers/priceController");

// GET route for fetching price data
router.get("/price-request", async (req, res) => {
  try {
    await priceController.getPriceData(req, res);
  } catch (error) {
    console.error("Error in price data route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
