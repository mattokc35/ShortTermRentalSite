import { differenceInDays } from "date-fns";

interface BookedDate {
  start: Date;
  end: Date;
}

const bookingFormValidation = (
  adults: number,
  children: number,
  infants: number,
  startDate: Date,
  endDate: Date,
  bookedDates: BookedDate[]
): [boolean, string] => {
  // Check total number of guests
  const totalGuests = adults + children + infants;
  if (totalGuests > 12) {
    return [true, "Please select a total of 12 guests or fewer"];
  }

  // Check if start date or end date is not selected
  if (!startDate || !endDate) {
    return [true, ""];
  }

  // Calculate number of nights
  const numNights = differenceInDays(endDate, startDate);
  if (numNights < 2 || numNights >= 31) {
    return [true, "Bookings must be 2 or more nights but less than 31 nights"];
  }

  // Check for overlapping booked dates
  const overlappingDate = bookedDates.find(
    (booking) =>
      startDate <= new Date(booking.end) && endDate >= new Date(booking.start)
  );
  if (overlappingDate) {
    return [true, "You selected dates that overlap with unavailable dates!"];
  }

  return [false, "Looks Good! :)"];
};

export { bookingFormValidation };
