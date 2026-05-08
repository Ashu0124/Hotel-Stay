/* ================= IMAGE POOLS ================= */

// City-based images
const cityImages = {
  Mumbai:
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
  Delhi:
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  Bangalore:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  Hyderabad:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  Chennai:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
};

// Room-type images
const roomImages = {
  Standard:
    "https://images.unsplash.com/photo-1582719478148-d1f6b77b2a63?auto=format&fit=crop&w=1200&q=80",
  Deluxe:
    "https://images.unsplash.com/photo-1611892441796-ae6af0ec2cc8?auto=format&fit=crop&w=1200&q=80",
  Executive:
    "https://images.unsplash.com/photo-1590490360187-4c9c5c6b1f33?auto=format&fit=crop&w=1200&q=80",
  Suite:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
};

/* ================= BASE HOTELS ================= */

const baseHotels = [
  {
    id: 1,
    name: "Taj Palace",
    city: "Mumbai",
    price: 4500,
    rating: 4.8,
    roomType: "Deluxe",
    description: "Luxury hotel with sea view",
    image: roomImages.Deluxe,
  },
  {
    id: 2,
    name: "Taj Palace",
    city: "Mumbai",
    price: 6200,
    rating: 4.9,
    roomType: "Suite",
    description: "Premium suite with ocean view",
    image: roomImages.Suite,
  },
  {
    id: 3,
    name: "Taj Palace",
    city: "Mumbai",
    price: 3500,
    rating: 4.6,
    roomType: "Standard",
    description: "Comfortable standard room",
    image: roomImages.Standard,
  },

  {
    id: 4,
    name: "Oberoi Hotel",
    city: "Delhi",
    price: 5200,
    rating: 4.9,
    roomType: "Executive",
    description: "Premium business hotel",
    image: roomImages.Executive,
  },
  {
    id: 5,
    name: "Oberoi Hotel",
    city: "Delhi",
    price: 3800,
    rating: 4.6,
    roomType: "Deluxe",
    description: "Spacious deluxe room",
    image: roomImages.Deluxe,
  },
  {
    id: 6,
    name: "Oberoi Hotel",
    city: "Delhi",
    price: 2600,
    rating: 4.4,
    roomType: "Standard",
    description: "Budget-friendly room",
    image: roomImages.Standard,
  },

  {
    id: 7,
    name: "Leela Palace",
    city: "Bangalore",
    price: 4800,
    rating: 4.7,
    roomType: "Deluxe",
    description: "Modern luxury stay",
    image: roomImages.Deluxe,
  },
  {
    id: 8,
    name: "Leela Palace",
    city: "Bangalore",
    price: 6500,
    rating: 4.9,
    roomType: "Suite",
    description: "Royal suite with city view",
    image: roomImages.Suite,
  },
  {
    id: 9,
    name: "Leela Palace",
    city: "Bangalore",
    price: 3200,
    rating: 4.5,
    roomType: "Standard",
    description: "Cozy standard room",
    image: roomImages.Standard,
  },
];

/* ================= AUTO-GENERATE HOTELS ================= */

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"];
const hotelNames = [
  "Grand Stay",
  "Royal Inn",
  "Urban Nest",
  "Elite Rooms",
  "Comfort Residency",
];
const roomTypes = ["Standard", "Deluxe", "Executive", "Suite"];

const hotels = [...baseHotels];
let nextId = baseHotels.length + 1;

while (hotels.length < 100) {
  const city = cities[hotels.length % cities.length];
  const name = hotelNames[hotels.length % hotelNames.length];
  const roomType = roomTypes[hotels.length % roomTypes.length];

  hotels.push({
    id: nextId++,
    name,
    city,
    price: 2000 + (hotels.length % 4) * 1000,
    rating: Number((4 + (hotels.length % 10) * 0.1).toFixed(1)),
    roomType,
    description: "Comfortable room with modern amenities",
    image: roomImages[roomType] || cityImages[city],
  });
}

export default hotels;
