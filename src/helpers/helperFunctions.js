export function calculatePrice(startDate, endDate, pets, priceArray) {
  let totalPrice = 0;
  let nightsPrice = 0;
  let startDateCopy = startDate.clone();

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
  }

  totalPrice += 185;
  totalPrice = totalPrice + totalPrice * 0.06;

  //always show 2 decimal places in the price
  totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);

  return [totalPrice, nightsPrice];
}
