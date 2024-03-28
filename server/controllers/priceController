const priceModel = require("../models/priceModel");

const getPriceData = async (req, res) => {
  try {
    const priceData = await priceModel.getPriceData();
    if (priceData) {
      res.status(200).json(priceData);
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error fetching price data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getPriceData,
};
