import differenceInDays from "date-fns/differenceInDays";

const bookingFormValidation = (
  adults,
  children,
  infants,
  startDate,
  endDate,
  bookedDates
) => {
  if (adults + children + infants > 12) {
    return [true, "Please select a total of 12 guests or fewer"];
  }
  if (startDate === null || endDate === null) {
    return [true, ""];
  }

  let numNights = differenceInDays(endDate.toDate(), startDate.toDate());
  if (numNights <= 1) {
    return [true, "Bookings must be 2 or more nights but less than 31 nights"];
  }

  if (numNights >= 31) {
    return [true, "Bookings must be 2 or more nights but less than 31 nights"];
  }
  let startDateCopy = startDate.clone();
  for (var m = startDateCopy; m.isBefore(endDate); m.add(1, "days")) {
    for (var i = 0; i < bookedDates.length; i++) {
      if (m.format("YYYY-MM-DD") === bookedDates[i].start.substring(0, 10)) {
        console.log("dates overlap!");
        return [
          true,
          "You selected dates that overlap with unavailable dates!",
        ];
      }
    }
  }

  return [false, "Looks Good! :)"];
};

export { bookingFormValidation };
