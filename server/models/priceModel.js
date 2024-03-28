const fetch = require("node-fetch");

const PRICELABS_KEY = process.env.PRICELABS_KEY;
const AIRBNB_LISTING_ID = process.env.AIRBNB_LISTING_ID;

const getPriceData = async () => {
  try {
    const response = await fetch("https://api.pricelabs.co/v1/listing_prices", {
      method: "POST",
      mode: "cors",
      headers: {
        "X-API-Key": PRICELABS_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listings: [
          {
            id: AIRBNB_LISTING_ID,
            pms: "airbnb",
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const priceDataResponse = await response.json();
    return priceDataResponse;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

module.exports = {
  getPriceData,
};
