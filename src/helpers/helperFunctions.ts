const checkDiscount = (
  numNights: number,
  nightsPrice: number
): [number, boolean, number] => {
  let discountPercentage: number = 0;
  let hasDiscount: boolean = false;
  let discountedPrice: number = nightsPrice;

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
  startDate: moment.Moment,
  endDate: moment.Moment,
  pets: number,
  priceArray: any,
  numNights: number
): [number, number, number, number, number, number, boolean, number, number] {
  let totalPrice: number = 0;
  let nightsPrice: number = 0;
  let petFee: number = 0;

  for (let m = startDate.clone(); m.isBefore(endDate); m.add(1, "days")) {
    //find price for date
    let found = priceArray.findIndex(
      (element: any) => element.date === m.format("YYYY-MM-DD")
    );
    if (found === -1) {
      return [0, 0, 0, 0, 0, 0, false, 0, 0];
    }
    const entries: any = Object.entries(priceArray);
    let foundPrice = JSON.stringify(entries[found][1].price);
    nightsPrice = nightsPrice + parseInt(foundPrice);
  }

  totalPrice += nightsPrice;
  const averageNightlyPrice: number = nightsPrice / numNights;

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
  const tax: number = totalPrice * 0.06;
  const cleaningFee: number = 225;
  totalPrice += tax;

  return [
    parseFloat(totalPrice.toFixed(2)),
    nightsPrice,
    parseFloat(tax.toFixed(2)),
    cleaningFee,
    petFee,
    discountPercentage,
    hasDiscount,
    parseFloat(discountedPrice.toFixed(2)),
    parseFloat(averageNightlyPrice.toFixed(2)),
  ];
}

export function getCurrentDate(): string {
  // Create a new Date object to get the current date
  const currentDate: Date = new Date();

  // Get the individual date components (month, day, and year)
  const year: string = currentDate.getFullYear().toString().slice(-2); // Get the last two digits of the year
  const month: string = (currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0"); // Month is zero-based, so add 1
  const day: string = currentDate.getDate().toString().padStart(2, "0");

  // Create the formatted date string in "mm/dd/yy" format
  const formattedDate: string = `${month}/${day}/${year}`;
  return formattedDate;
}

export function calculatePromoCodePrice(
  nightsPrice: number,
  discountedPrice: number,
  promoCodeDiscountPercentage: number,
  petFee: number
): [number, number, number] {
  let currentPrice: number = 0;
  console.log(nightsPrice);
  console.log(discountedPrice);
  nightsPrice === discountedPrice
    ? (currentPrice = nightsPrice)
    : (currentPrice = discountedPrice);

  const promoCodeDiscountedPrice =
    currentPrice - currentPrice * (promoCodeDiscountPercentage * 0.01);
  console.log(promoCodeDiscountedPrice);
  let newTotalPrice = promoCodeDiscountedPrice;
  //cleaning fee
  newTotalPrice += 225;
  newTotalPrice += petFee;
  //tax
  const newTax: number = newTotalPrice * 0.06;
  newTotalPrice += newTax;

  return [
    parseFloat(promoCodeDiscountedPrice.toFixed(2)),
    parseFloat(newTotalPrice.toFixed(2)),
    parseFloat(newTax.toFixed(2)),
  ];
}
