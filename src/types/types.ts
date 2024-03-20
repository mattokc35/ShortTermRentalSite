export interface GuestInfoPaymentPageModalProps {
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  price: number;
  nightsPrice: number;
  hasDiscount: boolean;
  discountedNightsPrice: number;
  discountPercentage: number;
  numberOfNights: number;
  petFee: number;
  averageNightlyPrice: number;
  tax: number;
}

export interface RootState {
  transactionId: string;
}

export interface ContractEmailData {
  transactionId: string;
  nightsPrice: number;
  petFee: number;
  adults: number;
  children: number;
  phoneNumber: string;
  comments: string;
  email: string;
  Owners: string;
  total_rent: number;
  total_guests: number;
  Checkin: string;
  Checkout: string;
  Checkin_Time: string;
  Checkout_Time: string;
  today: string;
  discountedNightsPrice: number;
  discountPercentage: number;
  averageNightlyPrice: number;
  numberOfNights: number;
  tax: number;
  guest: string;
  infants: number;
  pets: number;
}
