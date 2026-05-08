import { useParams, Link, useNavigate } from "react-router-dom";
import hotels from "../services/hotels";
import { toast } from "sonner";
import AOS from "aos";

// Icons
import {
  FaMapMarkerAlt,
  FaStar,
  FaBed,
  FaRupeeSign,
  FaArrowLeft,
} from "react-icons/fa";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find((h) => h.id === parseInt(id));

  // ✅ Default Reviews (fallback agar hotel me na ho)
  const defaultReviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 4,
      comment: "Great stay! Rooms were clean and staff was very helpful.",
    },
    {
      id: 2,
      name: "Priya Verma",
      rating: 5,
      comment: "Amazing experience. Loved the ambiance and service!",
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 4,
      comment: "Good location and decent pricing. Worth the money.",
    },
    {
      id: 4,
      name: "Sneha Patel",
      rating: 5,
      comment: "Very comfortable stay. Food was also excellent.",
    },
    {
      id: 5,
      name: "Rohit Singh",
      rating: 3,
      comment: "Overall good but room service could be faster.",
    },
    {
      id: 6,
      name: "Neha Gupta",
      rating: 4,
      comment: "Nice hotel with friendly staff. Would visit again.",
    },
    {
      id: 7,
      name: "Vikram Joshi",
      rating: 5,
      comment: "Perfect place for a weekend stay. Highly recommended!",
    },
    {
      id: 8,
      name: "Pooja Mehta",
      rating: 4,
      comment: "Clean rooms and great view. Enjoyed my stay.",
    },
    {
      id: 9,
      name: "Arjun Reddy",
      rating: 5,
      comment: "Excellent hospitality and smooth check-in process.",
    },
    {
      id: 10,
      name: "Kavita Sharma",
      rating: 4,
      comment: "Very relaxing environment and well-maintained property.",
    },
  ];

  const reviews = hotel?.reviews?.length
    ? hotel.reviews
    : defaultReviews;

  if (!hotel) {
    toast.error("Hotel not found");

    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 gap-3">
        <FaBed className="text-5xl text-blue-600" />
        <p className="text-lg font-medium">Hotel not found</p>
        <Link to="/hotels" className="text-blue-600 underline">
          Go back to hotels
        </Link>
      </div>
    );
  }

  /* ================= BOOK HANDLER ================= */
  const handleBookNow = () => {
    toast.success("Redirecting to booking page", {
      description: `${hotel.name} · ${hotel.city}`,
    });

    setTimeout(() => {
      navigate(`/book/${hotel.id}`);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">

      {/* Back */}
      <Link
        to="/hotels"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft />
        Back to hotels
      </Link>

      {/* Image */}
      <div className="overflow-hidden rounded-2xl shadow mb-8">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 sm:h-80 object-cover"
        />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {hotel.name}
          </h1>

          <p className="flex items-center gap-2 text-gray-500 mb-4">
            <FaMapMarkerAlt className="text-blue-600" />
            {hotel.city}
          </p>

          <p className="text-gray-600 mb-6">
            {hotel.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm">
              <FaBed />
              {hotel.roomType} Room
            </span>

            <span className="flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm">
              <FaStar />
              {hotel.rating} Rating
            </span>
          </div>

          {/* ================= REVIEWS ================= */}
          <div className="mt-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Guest Reviews
            </h2>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">
                      {review.name}
                    </p>

                    <div className="flex text-yellow-500 text-sm">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
          <p className="text-gray-500 text-sm mb-1">
            Price per night
          </p>

          <p className="flex items-center gap-1 text-3xl font-bold mb-6">
            <FaRupeeSign />
            {hotel.price}
          </p>

          <button
            onClick={handleBookNow}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            Book Now
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Free cancellation available
          </p>
        </div>
      </div>
    </div>
  );
}