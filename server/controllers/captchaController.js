const captchaModel = require("../models/captchaModel");

const verifyCaptcha = async (req, res) => {
  const { captchaValue } = req.body;
  const captchaSecret = process.env.GOOGLE_CAPTCHA_SECRET_KEY;

  try {
    const responseData = await captchaModel.verifyCaptcha(
      captchaValue,
      captchaSecret
    );

    // Process the CAPTCHA verification response as needed
    console.log("CAPTCHA verification response:", responseData);

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error verifying CAPTCHA:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  verifyCaptcha,
};
