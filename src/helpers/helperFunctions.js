export function calculatePrice(startDate, endDate, pets, priceArray) {
  let totalPrice = 0;
  let nightsPrice = 0;
  let startDateCopy = startDate.clone();
  let petFee = 0;

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

  //pets
  if (pets > 0) {
    totalPrice += 150;
    petFee += 150;
  }

  totalPrice += 185;
  let tax = totalPrice * 0.06;
  let cleaningFee = 185;
  totalPrice = totalPrice + totalPrice * 0.06;

  //always show 2 decimal places in the price
  totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);

  return [totalPrice, nightsPrice, tax, cleaningFee, petFee];
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
