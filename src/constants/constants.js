const owners = "B and D Chen";
const checkinTime = "4:00 PM";
const checkoutTime = "10:00 AM";
const petOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
];

const childrenOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
];

const infantOptions = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
];

const adultOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
];

const carouselImages = [
  {
    caption: "Fully stocked kitchen",
    src: "./carouselImages/kitchen.jpg",
  },
  {
    caption: "Coffee Bar!",
    src: "./carouselImages/coffeebar2.jpg",
  },
  {
    caption: "Living room with games and entertainment",
    src: "./carouselImages/livingroom.jpg",
  },
  {
    caption: "Living room with games and entertainment",
    src: "./carouselImages/livingroom2.jpg",
  },
  {
    caption: "Master Bedroom",
    src: "./carouselImages/sapphirebedroom.jpg",
  },
  {
    caption: "Master Bedroom",
    src: "./carouselImages/masterbedroom2.jpg",
  },
  {
    caption: "Master Bathroom",
    src: "./carouselImages/masterbath1.jpg",
  },
  {
    caption: "Master Bathroom",
    src: "./carouselImages/masterbath2.jpg",
  },
  {
    caption: "Bedroom two",
    src: "./carouselImages/bedroomtwo.jpg",
  },
  {
    caption: "Bedroom two",
    src: "./carouselImages/bedroomtwo2.jpg",
  },
  {
    caption: "Bathroom two",
    src: "./carouselImages/hallbath1.jpg",
  },
  {
    caption: "Bathroom two",
    src: "./carouselImages/hallbath2.jpg",
  },
  {
    caption: "Bedroom three (bunk beds!)",
    src: "./carouselImages/bunkroom1.jpg",
  },
  {
    caption: "Bedroom three (bunk beds!)",
    src: "./carouselImages/bunkroom2.jpg",
  },
  {
    caption: "Bedroom three (bunk beds!)",
    src: "./carouselImages/bunkroom3.jpg",
  },
  {
    caption: "Outdoor balcony lounge!",
    src: "./carouselImages/exteriorfront1.jpg",
  },
  {
    caption: "Outdoor balcony lounge!",
    src: "./carouselImages/exteriorfront3.jpg",
  },
  {
    caption: "Outdoor balcony lounge!",
    src: "./carouselImages/exteriorfront2.jpg",
  },
  {
    caption: "Lounge Chairs",
    src: "./carouselImages/exteriorside.jpg",
  },
  {
    caption: "Games!",
    src: "./carouselImages/livinggames.jpg",
  },
  {
    caption: "Outdoor Games",
    src: "./carouselImages/garagegames2.jpg",
  },
  {
    caption: "Outdoor Games",
    src: "./carouselImages/outdoorgames.jpg",
  },
  {
    caption: "Outdoor tiki bar and lounge!",
    src: "./carouselImages/outdoortiki.jpg",
  },
  {
    caption: "5 min walk to beach!",
    src: "./carouselImages/outdoordistance.jpg",
  },
];

const Amenities = [
  "fully-loaded luxury kitchen",
  "spacious living & dining area",
  "memory-foam mattresses for all beds",
  "4K Roku smart TV’s in all bedrooms and living room",
  "blu-ray player with family movies",
  "large deck spaces with plenty of outdoor seating and beautiful view of the sunset",
  "lots of board games to choose from",
  "clean linens and beach/bath towels",
  "full size stainless steel fridge with freezer",
  "keurig & drip coffee machines",
  "washer and dryer",
  "iron & board",
  "high chair",
  "high speed WiFi Internet",
  "smart thermostat",
  "long driveway with space for 4-5 cars to park",
  "lots of beach chairs/lounges/tables on both the patio and upper balcony",
  "patio equipped with string lights",
  "private outdoor shower",
  "weber charcoal grill for outdoor cooking",
  "outdoor tiki bar and sink",
  "swinging bench",
  "foosball table",
  "basketball shootout, giant connect four, corn hole, giant wooden jenga",
  "ladder ball toss, ring toss, dart, and frisbee",
];

const reviews = [
  {
    text: "The house was lovely, cozy, and clean. Our kids loved the LED lights and having their own bed in the bunk room! It was the perfect place for our relaxing mid-week beach trip. Access to the beach was an easy 5-minute walk. Communication was excellent. We will definitely keep this place in mind if we head to Crystal Beach again.",
    rating: 5,
    name: "Rebecca",
    date: "October 2023",
  },
  {
    text: "The house was beautiful and the host really went out of their way to put extra special touches on everything. We really enjoyed out stay and will be back again.",
    rating: 5,
    name: "Michelle",
    date: "September 2023",
  },
  {
    text: "I will definitely be back!! Perfect family friendly house with lots of indoor and outdoor games, lots of space for outdoor entertaining, and everything was clean and comfortable. Deborah was very kind to check in on us and make sure everything was to our liking and The beach is a quick 5 minute walk away. 10/10 recommend",
    rating: 5,
    name: "Heather",
    date: "August 2023",
  },
  {
    text: "Excellent place the kids loved it, very clean and the host is great with responding! A friend booked it for us but I would definitely recommend and choose this home again thanks for having me and my family!",
    rating: 5,
    name: "Sirwelton",
    date: "August 2023",
  },
  {
    text: "The home is gorgeous and just as described in the listing. Deborah has lots of games inside and outside and plenty to keep big kids and little kids busy and having fun after a day in the sun. Would definitely stay again!",
    rating: 5,
    name: "Alicia",
    date: "July 2023",
  },
  {
    text: "Perfect for our family and had everything we needed! We will return for sure",
    rating: 5,
    name: "Trish",
    date: "July 2023",
  },
  {
    text: "Sapphire by the Sea was an amazing home to stay in. It was fully stocked, more than I actually expected. The home is beautifully decorated, very cozy and clean. We had several teenagers staying with us as they loved the the size of the bunk beds and all the games provided indoors and outdoors. It was truly relaxing and fun to stay in this home. We hope to be back next summer.",
    rating: 5,
    name: "Lorie",
    date: "June 2023",
  },
  // Add more reviews as needed
];

const hostName = "Ben and Deborah";
const hostBio =
  "We have always enjoyed traveling and spending time with family and friends. Crystal Beach is the hidden gem that we have found and loved. From the clean sandy beaches to the peaceful ocean waves, we hope you will love your stay at Sapphire by the Sea as much as our family does. Be our guest and make this place your home away from home!";
  const stripePublicTestKey =
  "your-public-key-here";
export {
  petOptions,
  owners,
  service_id_1,
  template_id_1,
  template_id_2,
  key_1,
  checkinTime,
  checkoutTime,
  childrenOptions,
  infantOptions,
  adultOptions,
  carouselImages,
  Amenities,
  reviews,
  hostName,
  hostBio,
  stripePublicTestKey
};
