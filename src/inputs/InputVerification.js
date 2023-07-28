const checkTotalGuests = (adults, children, infants) => {
  return adults + children + infants > 12 ? false : true;
};

export default checkTotalGuests;