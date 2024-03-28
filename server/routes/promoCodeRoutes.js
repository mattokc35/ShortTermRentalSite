const express = require("express");
const router = express.Router();
const promoCodeController = require("../controllers/promoCodeController");

// POST route for verifying promo code
router.get("/verifyPromoCode", async (req, res) => {
  try {
    await promoCodeController.verifyPromoCode(req, res);
  } catch (error) {
    console.error("Error in promo code verification route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
