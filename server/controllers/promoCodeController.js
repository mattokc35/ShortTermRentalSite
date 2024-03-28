const promoCodeModel = require("../models/promoCodeModel");

const verifyPromoCode = async (req, res) => {
  try {
    const { promoCode } = req.body;

    const promoCodeValidationResult = await promoCodeModel.verifyPromoCode(
      promoCode
    );

    res.status(200).json(promoCodeValidationResult);
  } catch (error) {
    console.error("Error validating promo code:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  verifyPromoCode,
};
