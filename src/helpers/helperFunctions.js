const checkDiscount = (numNights, nightsPrice) => {
  let discountPercentage = 0;
  let hasDiscount = false;
  let discountedPrice = nightsPrice;
  switch (true) {
    case numNights >= 4 && numNights < 5:
      discountPercentage = 3;
      hasDiscount = true;
      discountedPrice = nightsPrice - nightsPrice * 0.03;
      break;
    case numNights >= 5 && numNights < 7:
      discountPercentage = 5;
      hasDiscount = true;
      discountedPrice = nightsPrice - nightsPrice * 0.05;
      break;
    case numNights >= 7 && numNights < 28:
      discountPercentage = 9;
      hasDiscount = true;
      discountedPrice = nightsPrice - nightsPrice * 0.09;
      break;
    case numNights >= 28:
      discountPercentage = 30;
      hasDiscount = true;
      discountedPrice = nightsPrice - nightsPrice * 0.3;
      break;
    default:
      break;
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
  let startDateCopy = startDate.clone();
  let petFee = 0;
  let discountPercentage = 0;
  let hasDiscount = false;
  let discountedPrice = 0;

  for (var m = startDateCopy; m.isBefore(endDate); m.add(1, "days")) {
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

  let discountArray = checkDiscount(numNights, nightsPrice);
  discountPercentage = discountArray[0];
  hasDiscount = discountArray[1];
  discountedPrice = discountArray[2];

  if (hasDiscount) {
    totalPrice = discountedPrice;
  }

  //pets
  if (pets > 0) {
    totalPrice += 150;
    petFee += 150;
  }

  totalPrice += 225;
  let tax = totalPrice * 0.06;
  let cleaningFee = 225;
  totalPrice = totalPrice + totalPrice * 0.06;

  //always show 2 decimal places in the price
  totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
  discountedPrice = (Math.round(discountedPrice * 100) / 100).toFixed(2);

  return [
    totalPrice,
    nightsPrice,
    tax,
    cleaningFee,
    petFee,
    discountPercentage,
    hasDiscount,
    discountedPrice,
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
