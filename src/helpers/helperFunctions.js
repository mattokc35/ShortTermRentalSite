const checkDiscount = (numNights, nightsPrice) => {
  let discountPercentage = 0;
  let hasDiscount = false;
  let discountedPrice = nightsPrice;

  if (numNights >= 4 && numNights < 5) {
    discountPercentage = 3;
    hasDiscount = true;
  } else if (numNights >= 5 && numNights < 7) {
    discountPercentage = 5;
    hasDiscount = true;
  } else if (numNights >= 7 && numNights < 28) {
    discountPercentage = 9;
    hasDiscount = true;
  } else if (numNights >= 28) {
    discountPercentage = 30;
    hasDiscount = true;
  }

  if (hasDiscount) {
    discountedPrice -= nightsPrice * (discountPercentage / 100);
  }

  return [discountPercentage, hasDiscount, discountedPrice];
};

export function calculatePrice(
  startDate,
  endDate,
  pets,
  priceArray,
  numNights
) {
  let totalPrice = 0;
  let nightsPrice = 0;
  let petFee = 0;

  for (var m = startDate.clone(); m.isBefore(endDate); m.add(1, "days")) {
    //find price for date
    let found = priceArray.PriceData[0].data.findIndex(
      (element) => element.date === m.format("YYYY-MM-DD")
    );
    if (found === -1) {
      return;
    }
    const entries = Object.entries(priceArray.PriceData[0].data);
    let foundPrice = JSON.stringify(entries[found][1].price);
    nightsPrice = nightsPrice + parseInt(foundPrice);
  }

  totalPrice += nightsPrice;
  const averageNightlyPrice = nightsPrice / numNights;

  const [discountPercentage, hasDiscount, discountedPrice] = checkDiscount(
    numNights,
    nightsPrice
  );

  totalPrice = hasDiscount ? discountedPrice : totalPrice;

  if (pets > 0) {
    totalPrice += 150;
    petFee += 150;
  }

  totalPrice += 225;
  const tax = totalPrice * 0.06;
  const cleaningFee = 225;
  totalPrice += tax;

  // Always show 2 decimal places in the price
  totalPrice = totalPrice.toFixed(2);

  return [
    totalPrice,
    nightsPrice,
    tax.toFixed(2),
    cleaningFee,
    petFee,
    discountPercentage,
    hasDiscount,
    discountedPrice.toFixed(2),
    averageNightlyPrice.toFixed(2),
  ];
}

export function getCurrentDate() {
  // Create a new Date object to get the current date
  const currentDate = new Date();

  // Get the individual date components (month, day, and year)
  const year = currentDate.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
  const day = currentDate.getDate().toString().padStart(2, "0");

  // Create the formatted date string in "mm/dd/yy" format
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}
