const owners = "your-name-here";
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

const youtubeURL =
  "https://www.youtube.com/embed/HPRhNJvbZrU?si=HUQt7dGvjTyzJhtQ";

const imageGalleryImages = [
  {
    caption:
      "The dream kitchen is fully stocked with a walk-in pantry, stainless-steel appliances, and all the necessary amenities to host your family or friends.",
    src: "./carouselImages/kitchen-1.jpg",
  },
  {
    caption: "",
    src: "./carouselImages/hot-tub.jpg",
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
  {
    caption:
      "After a day of sun and beach, relish some nostalgic games like Ms. Pac-Man, Galaga, and more. The Class of 81' Deluxe Arcade Game features 12 games for your entertainment.",
    src: "./carouselImages/arcademachine.jpg",
  },
  {
    caption:
      "Indulge in the warmth of the sun or relish the picturesque view of the sunset from our comfortable lounge chairs.",
    src: "./carouselImages/outdoor-lounge-chairs.webp",
  },
  {
    caption:
      "The Main Suite (Captain's Quarters) has a memory foam king bed, a 55” 4K Roku TV, a ceiling fan, dimmable remote-control lights and solid wood furniture. This bedroom features an en-suite bathroom with quartz countertops.",
    src: "./carouselImages/bedroom-1-1.webp",
  },
  {
    caption: "Tranquility awaits in the Mermaid Crossing!",
    src: "./carouselImages/mermaid-crossing-bed.webp",
  },
];

const carouselImages = [
  {
    caption:
      "The dream kitchen is fully stocked with a walk-in pantry, stainless-steel appliances, and all the necessary amenities to host your family or friends.",
    src: "./carouselImages/kitchen-1.jpg",
  },
  {
    caption: "",
    src: "./carouselImages/hot-tub.jpg",
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
  {
    caption:
      "Indulge in the warmth of the sun or relish the picturesque view of the sunset from our comfortable lounge chairs.",
    src: "./carouselImages/outdoor-lounge-chairs.webp",
  },
  {
    caption:
      "The Main Suite (Captain's Quarters) has a memory foam king bed, a 55” 4K Roku TV, a ceiling fan, dimmable remote-control lights and solid wood furniture. This bedroom features an en-suite bathroom with quartz countertops.",
    src: "./carouselImages/bedroom-1-1.webp",
  },
  {
    caption: "Tranquility awaits in the Mermaid Crossing!",
    src: "./carouselImages/mermaid-crossing-bed.webp",
  },
  {
    caption:
      "Bedroom 3 (Crew’s Quarters) has two custom full-over-full bunk beds, built to accommodate both adults and children. A 43” 4K Roku TV, remote control RGB strip lights, and remote control overhead lights, a ceiling fan.",
    src: "./carouselImages/bedroom-3-1.jpg",
  },
  {
    caption:
      "The open-concept of Kitchen and Dining is perfect for large family gathering! The centerpiece of the kitchen is a large quartz counter that comfortably sits six people, making it the perfect spot for socializing or preparing meals.",
    src: "./carouselImages/kitchen-2.jpg",
  },
  {
    caption:
      "Take another look at the roomy dining and kitchen space. With all the necessary amenities, this kitchen is sure to make Mom proud, especially when preparing for Thanksgiving!",
    src: "./carouselImages/dining-room.jpg",
  },
  {
    caption:
      "Our open-concept dining room offers the convenience of enjoying a meal while catching up on your favorite TV shows.",
    src: "./carouselImages/dining-room-2.jpg",
  },
  {
    caption:
      "Sapphire by the Sea is your perfect home away from home! Living room space includes 2 comfortable chairs, 3 counter stools, a loveseat, and a sofa that comes with a pull-out memory foam queen-sized bed, designed to ensure maximum comfort.",
    src: "./carouselImages/living-room-2.jpg",
  },
  {
    caption:
      "The bright and inviting living room has comfortable seating for 8-10 people and a pull-out memory foam sofa bed that sleeps 2 (blankets found in the ottoman). Cozy up on the sofa for a movie night or just relaxing after a day in the sand.",
    src: "./carouselImages/living-room-3.jpg",
  },
  {
    caption:
      "We have furnished the space with brand new furniture, including a cozy couch that conveniently converts into a queen-sized bed. In addition, a 65 inch SmartTV and sound bar are at your disposal, perfect for movie nights or enjoying your favorite games.",
    src: "./carouselImages/living-room-4.jpg",
  },
  {
    caption:
      "Who doesn't love Nintendo Mario games? We've included a Nintendo Switch with a few selection of games for your enjoyment.",
    src: "./carouselImages/living-room-5.jpg",
  },
  {
    caption:
      "Who's ready for a fun-filled game night? Grab a seat and join us as we have an assortment of games, including Nintendo Switch suitable for the entire family to delight in.",
    src: "./carouselImages/board-games.jpg",
  },
  {
    caption: "Sweet dreams of the Sea in the Captain's Quarters!",
    src: "./carouselImages/bedroom-1-2.jpg",
  },
  {
    caption:
      "The Captain's Quarters has a king bed, a 55” 4K Roku TV, a ceiling fan, dimmable remote-control lights and solid wood furniture with built-in accent lighting. This bedroom features an en-suite bathroom with quartz countertops.",
    src: "./carouselImages/bedroom-1-3.jpg",
  },
  {
    caption: "Comfortable king bed in the Captain's Quarters.",
    src: "./carouselImages/bedroom1-4.jpg",
  },
  {
    caption:
      "The inclusion of touch lamps equipped with USB port and a 115V power outlet provides utmost convenience for all your charging requirements.",
    src: "./carouselImages/bedroom1-5.jpg",
  },
  {
    caption:
      "Relax, refresh and revitalize in this en-suite bathroom in the Captain's Quarters which features double sinks, over-sized bathtub, clean towels, and complimentary toiletries.",
    src: "./carouselImages/master-bath-1.jpg",
  },
  {
    caption:
      "Relax, refresh and revitalize in this en-suite bathroom in the Captain's Quarters which features double sinks, over-sized bathtub, clean towels, and complimentary toiletries.",
    src: "./carouselImages/master-bath-2.jpg",
  },
  {
    caption:
      "Prepare yourself for the day with ease in this bright and airy bathroom, designed to provide a refreshing ambiance that enhances your morning routine.",
    src: "./carouselImages/master-bath-3.jpg",
  },
  {
    caption:
      "Relax and indulge in a soothing bath by savoring a glass of wine or catching up on your favorite book.",
    src: "./carouselImages/bathtub-1.jpg",
  },
  {
    caption:
      "Mermaid Crossing features a beautifully decorated queen bed, solid wood furniture, a 50” 4K Roku TV, and a remote control ceiling fan with dimmable lights.",
    src: "./carouselImages/bedroom-2-1.jpg",
  },
  {
    caption: "Another aesthetic view of the Mermaid Crossing.",
    src: "./carouselImages/bedroom-2-2.jpg",
  },
  {
    caption:
      "Plenty of spaces to hang out for everyone with fun lighting and comfortable bean bag chairs!",
    src: "./carouselImages/bedroom-3-2.jpg",
  },
  {
    caption:
      "After a day of sun and beach, relish some nostalgic games like Ms. Pac-Man, Galaga, and more. The Class of 81' Deluxe Arcade Game features 12 games for your entertainment.",
    src: "./carouselImages/arcademachine.jpg",
  },
  {
    caption: "Upper bunk of Crew's Quarters.",
    src: "./carouselImages/bedroom-3-3.jpg",
  },
  {
    caption:
      "Hall bathroom is across the hallway from Mermaid Crossing and Crew's Quarters. The bathroom features quartz countertops, a large shower/bath combo, clean towels, and complimentary toiletries.",
    src: "./carouselImages/bathroom-2.jpg",
  },
  {
    caption: "",
    src: "./carouselImages/bathroom-2-2.jpg",
  },
  {
    caption:
      "The laundry room next to the dining room is accessed by a barn-style sliding door and has a full sized washer and dryer, a drying rack, iron and ironing board. An infant high chair is stored in this room and available for your convenience.",
    src: "./carouselImages/laundry-1.jpg",
  },
  /*
  {
    caption:
      "The beverage station is fully stocked with mugs, tumblers, glasses, and more.",
    src: "./carouselImages/coffee-bar.jpg",
  },*/
  {
    caption:
      "Love coffee? We got you covered with our coffee bar with Keurig, drip coffee maker, coffee grinder, Moka pot and french press.",
    src: "./carouselImages/coffee-bar-2.jpg",
  },
  {
    caption:
      "Enjoy a cup of coffee or tea from the beverage station! Brew your own cup of Joe from a regular coffee maker, Keurig, French press, or pour-over.",
    src: "./carouselImages/coffee-bar-3.jpg",
  },
  {
    caption:
      "Brand new Ninja blender to whip up your favorite smoothie and more!",
    src: "./carouselImages/kitchen-blender.jpg",
  },
  {
    caption:
      "The pantry is stocked with all the cookware you need to enjoy a home-cooked meal!",
    src: "./carouselImages/pantry-1.jpg",
  },
  {
    caption:
      "The Tiki Bar area features a picnic table, bar stools, a double swing. Perfect for a barbecue cookout!",
    src: "./carouselImages/tiki-bar.jpg",
  },
  {
    caption: "The picnic table will comfortably seat 8 to 10.",
    src: "./carouselImages/tiki-bar-2.jpg",
  },
  {
    caption:
      "Bring your own fishing tackle. There is a large fish-cleaning station to clean your catch of the day",
    src: "./carouselImages/tiki-bar-3.jpg",
  },
  {
    caption:
      "Enjoy your favorite TV show or game while sipping margaritas with friends at the Tiki bar.",
    src: "./carouselImages/tiki-bar-4.jpg",
  },
  /*
  {
    caption:
      "The outdoor shower gives you a quick rinse from the salt and sand. Don't forget to grab a beach towel from the house!",
    src: "./carouselImages/outdoor-shower.jpg",
  },
  */
  {
    caption:
      "How about engaging in a thrilling basketball shootout with a friend, play a game of ladder ball toss, cornhole or connect four?",
    src: "./carouselImages/garage-games-2.jpg",
  },
  {
    caption:
      "We've got 10+ beach chairs, beach umbrellas, a couple of small Igloo ice chests, and some beach toys that you are welcome to take to the beach on the beach wagon. Discover a wide array of outdoor games awaiting you in the garage.",
    src: "./carouselImages/garage-games-3.jpg",
  },
  {
    caption:
      "Challenge one another with our giant 4-ft tall connector-four game.",
    src: "./carouselImages/garage-games-4.jpg",
  },
  {
    caption: "The driveway is spacious for outdoor games.",
    src: "./carouselImages/driveway.jpg",
  },
  {
    caption:
      "Grab a cold drink and gather around the Tiki Bar! Enjoy a game of corn hole competition!",
    src: "./carouselImages/cornhole.jpg",
  },
  {
    caption:
      "Aerial front view of Sapphire by The Sea. Lots of deck space for entertaining.",
    src: "./carouselImages/front-drone-view.jpg",
  },
  {
    caption:
      "The dining table located on the deck has the capacity to seat 6 to 8 individuals.",
    src: "./carouselImages/exterior-front-1.jpg",
  },
  {
    caption:
      "Relax on the spacious front porch! Early risers can enjoy the beautiful sky of sunrise.",
    src: "./carouselImages/exterior-front-2.jpg",
  },
  {
    caption:
      "The upper decks offer ample space with both sunny and shaded deck areas, providing plenty of seating and lighting. Additionally, you can indulge in the soothing sound of ocean waves or relish the breathtaking sight of a sunset.",
    src: "./carouselImages/exterior-front-3.jpg",
  },
  {
    caption: "The side yard has lots of room for outdoor games.",
    src: "./carouselImages/side-yard.jpg",
  },
  {
    caption:
      "The back yard has lots of room for outdoor activities such as badminton, volleyball and most recently added fire pit.",
    src: "./carouselImages/backyard.jpg",
  },
  /*
  {
    caption:
      "Newly added wood burning fire pit where you can unwind, enjoy some s'mores, and indulge in stargazing under the beautifully clear sky. Please supply your own wood.",
    src: "./carouselImages/fire-pit.jpg",
  },*/
  {
    caption: "Watch beautiful sunset from the side deck of the house!",
    src: "./carouselImages/night-photo.jpg",
  },
  {
    caption: "Night view of Sapphire by The Sea.",
    src: "./carouselImages/night-photo-2.jpg",
  },
  {
    caption:
      "Desirable Lafitte's Landing in Crystal Beach has private beach entrance.",
    src: "./carouselImages/neighborhood-entrance.jpg",
  },
  {
    caption:
      "Guests at Sapphire by the Sea enjoy exclusive access to the beach, accessible both by foot and golf carts for added convenience and flexibility.",
    src: "./carouselImages/beach-access.jpg",
  },
  {
    caption: "Only a 5-minute walk to the beach!",
    src: "./carouselImages/walk-to-beach.jpg",
  },
  {
    caption: "Only a 5-minute walk to the beach!",
    src: "./carouselImages/walk-to-beach-2.jpg",
  },
];

const reviews = [
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

  {
    text: '"Exceptional hosts right here. This property checked ALL the boxes and surpassed the already impressive pictures, offering a comfortable and stylish atmosphere. The kitchen was a dream for anyone who loves to cook – it had all the essentials and more. What truly set this experience apart was the host\'s exceptional responsiveness. They were quick to assist and even went above and beyond when we caused an issue, responding with kindness and understanding. A perfect 5-star stay! Thank you!"',
    rating: 5,
    name: "Melody",
    date: "November 2023",
  },
  {
    text: '"The house was lovely, cozy, and clean. Our kids loved the LED lights and having their own bed in the bunk room! It was the perfect place for our relaxing mid-week beach trip. Access to the beach was an easy 5-minute walk. Communication was excellent. We will definitely keep this place in mind if we head to Crystal Beach again."',
    rating: 5,
    name: "Rebecca",
    date: "October 2023",
  },
  {
    text: '"The house was beautiful and the host really went out of their way to put extra special touches on everything. We really enjoyed out stay and will be back again."',
    rating: 5,
    name: "Michelle",
    date: "September 2023",
  },
  {
    text: '"Excellent place! We had a pleasant stay with my family for a weekend, and everything looked spectacular. The cabin is simply fantastic, we had a great time and we most definitely come back."',
    rating: 5,
    name: "Jorge",
    date: "August 2023",
  },

  {
    text: '"I will definitely be back!! Perfect family friendly house with lots of indoor and outdoor games, lots of space for outdoor entertaining, and everything was clean and comfortable. The hosts were very kind to check in on us and made sure everything was to our liking and The beach is a quick 5 minute walk away. 10/10 recommend"',
    rating: 5,
    name: "Heather",
    date: "August 2023",
  },
  {
    text: '"Excellent place the kids loved it, very clean and the host is great with responding! A friend booked it for us but I would definitely recommend and choose this home again thanks for having me and my family!"',
    rating: 5,
    name: "Sirwelton",
    date: "August 2023",
  },
  {
    text: '"The home is gorgeous and just as described in the listing. They have lots of games inside and outside and plenty to keep big kids and little kids busy and having fun after a day in the sun. Would definitely stay again!"',
    rating: 5,
    name: "Alicia",
    date: "July 2023",
  },
  {
    text: '"Perfect for our family and had everything we needed! We will return for sure"',
    rating: 5,
    name: "Trish",
    date: "July 2023",
  },
  {
    text: '"Beautiful Place! Our littles enjoyed all the outside games and it was a perfect setup. We would definitely book again!"',
    rating: 5,
    name: "Brittni",
    date: "July 2023",
  },

  {
    text: '"Sapphire by the Sea was an amazing home to stay in. It was fully stocked, more than I actually expected. The home is beautifully decorated, very cozy and clean. We had several teenagers staying with us as they loved the size of the bunk beds and all the games provided indoors and outdoors. It was truly relaxing and fun to stay in this home. We hope to be back next summer."',
    rating: 5,
    name: "Lorie",
    date: "June 2023",
  },
  {
    text: '"B and D were fabulous hosts! The place was beautiful. She thought of all of the details. It truly felt like a home away from home! We truly enjoyed our stay, and we would love to come back again in the future! You can’t go wrong booking this property"',
    rating: 5,
    name: "Abigail",
    date: "June 2023",
  },
  {
    text: '"Beautiful house, our host was extremely friendly and responsive, and would check in on us to make sure we were enjoying our stay. All of the amenities were great and the walk to the beach was very easy. My family and I loved our stay here."',
    rating: 5,
    name: "Grayson",
    date: "June 2023",
  },
  {
    text: '"Such an amazing host!! She provided clear instructions for check-in and check-out and local recommendations. She also checked in periodically during our stay. I love that she included so many things that we would’ve never thought to bring ourselves! It made the trip such a breeze for us."',
    rating: 5,
    name: "Laura",
    date: "May 2023",
  },

  // Add more reviews as needed
];
const contractUrl = "your-url-here";

const hostName = "your-name-here";
const hostBio =
  '"We have always enjoyed traveling and spending time with family and friends. Crystal Beach is the hidden gem that we have found and loved. From the clean sandy beaches to the peaceful ocean waves, we hope you will love your stay at Sapphire by the Sea as much as our family does. Be our guest and make this place your home away from home!"';
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
  hostBio,
  imageGalleryImages,
  contractUrl,
};
