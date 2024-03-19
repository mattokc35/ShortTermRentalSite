// Define types for the options objects
type Option = {
  value: number;
  label: string;
};

// Define types for the image objects
type Image = {
  caption: string;
  src: string;
};

// Define type for review objects
type Review = {
  text: string;
  rating: number;
  name: string;
  date: string;
};

// Define type for host bio
type HostBio = string;

// Constants with assigned types
const owners: string = "your-name-here";
const checkinTime: string = "4:00 PM";
const checkoutTime: string = "10:00 AM";

const petOptions: Option[] = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
];

const childrenOptions: Option[] = [
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

const infantOptions: Option[] = [
  { value: 0, label: "0" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
];

const adultOptions: Option[] = [
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

const youtubeURL: string = "your-url-here";

const imageGalleryImages: Image[] = [
  {
    caption:
      "The dream kitchen is fully stocked with a walk-in pantry, stainless-steel appliances, and all the necessary amenities to host your family or friends.",
    src: "./carouselImages/kitchen-1.webp",
  },
  {
    caption: "",
    src: "./carouselImages/hot-tub.webp",
  },
  {
    caption:
      "The bright and inviting living room has comfortable seating for 8-10 people and a pull-out memory foam sofa bed that sleeps 2 (blankets found in the ottoman).",
    src: "./carouselImages/living-1.webp",
  },
  //add more data here
];

const carouselImages: Image[] = [
  {
    caption:
      "The dream kitchen is fully stocked with a walk-in pantry, stainless-steel appliances, and all the necessary amenities to host your family or friends.",
    src: "./carouselImages/kitchen-1.webp",
  },
  {
    caption: "",
    src: "./carouselImages/hot-tub.webp",
  },
  {
    caption:
      "The bright and inviting living room has comfortable seating for 8-10 people and a pull-out memory foam sofa bed that sleeps 2 (blankets found in the ottoman).",
    src: "./carouselImages/living-1.webp",
  },
  {
    caption:
      "How about engaging in a thrilling basketball shootout with a friend, play a game of foosball, ladder ball toss, cornhole or connect four?",
    src: "./carouselImages/garage-games.webp",
  },
  //add more data here
];

const reviews: Review[] = [
  {
    text: "Extraordinary stay. Attentive to our needs and quick response. Everything that we needed was there.: chairs for the beach, cart for the beach, fun even when staying indoors. They were very responsive, the dart board was damage and they immediately replaced it. They took care of everything for us. Perfect for our family, the kids had so much fun. It felt like going to our vacation home, that’s how great the reception was and how everything was there for us. We will 100% consider to book again. Highly recommend.",
    rating: 5,
    name: "Angie",
    date: "March 2024",
  },

  {
    text: "We truly enjoyed our stay here. The home was clean and comfortable with oodles of family-friendly activities on hand to enjoy. We especially appreciated the wagon with sand toys and camp chairs available for our beach time. The fire pit and hot tub were fun in the evenings. The neighborhood felt quiet and safe. The beach was clean and peaceful. Hosts were great with communication and very responsive.",
    rating: 5,
    name: "Erin",
    date: "February 2024",
  },

  {
    text: '"We absolutely love this place. It was great getting for us and had everything we needed. We loved that there was a high chair for the 1 year old and a pack-n-play for the infant. The upper and lower deck was perfect for outside activities. We will definitely visit again!"',
    rating: 5,
    name: "Monique",
    date: "January 2024",
  },

  {
    text: '"Great stay for my family. We enjoyed the holidays @ the Sapphire!"',
    rating: 5,
    name: "Anthony",
    date: "December 2023",
  },
  //add more data here
];

const currentMonth: string = "March 2024";
const contractUrl: string = "your-url-here";

const hostName: string = "your-name-here";
const hostBio: HostBio = '"your-bio-here"';

export {
  petOptions,
  owners,
  youtubeURL,
  checkinTime,
  checkoutTime,
  childrenOptions,
  infantOptions,
  adultOptions,
  carouselImages,
  reviews,
  hostName,
  currentMonth,
  hostBio,
  imageGalleryImages,
  contractUrl,
};
