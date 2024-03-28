const validPromoCodes = ["promo-code-1", "promo-code-2"];

const verifyPromoCode = async (promoCode) => {
  let discountPercentage = 0;

  const isPromoCodeValid = validPromoCodes.includes(promoCode);

  if (isPromoCodeValid) {
    if (promoCode === "promo-code-1") {
      discountPercentage = 10;
    } else if (promoCode === "promo-code-2") {
      discountPercentage = 15;
    }
  }

  return {
    isPromoValid: isPromoCodeValid,
    discountPercentage: discountPercentage,
  };
};

module.exports = {
  verifyPromoCode,
};
