const express = require("express");
const router = express.Router();
const captchaController = require("../controllers/captchaController");

// POST route for verifying CAPTCHA
router.post("/verifyCAPTCHA", async (req, res) => {
  try {
    await captchaController.verifyCaptcha(req, res);
  } catch (error) {
    console.error("Error in CAPTCHA verification route:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
