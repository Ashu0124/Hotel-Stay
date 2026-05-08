import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import hotels from "../services/hotels";
import { toast } from "sonner";
import axios from "axios";
// Icons
import {
  FaUser,
  FaChild,
  FaCalendarAlt,
  FaRupeeSign,
  FaArrowLeft,
} from "react-icons/fa";

export default function BookNow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find((h) => h.id === parseInt(id));

  const today = new Date().toISOString().split("T")[0];

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // Redirect if invalid hotel
  useEffect(() => {
    if (!hotel) {
      toast.error("Hotel not found");
      navigate("/hotels");
    }
  }, [hotel, navigate]);

  // ---------------- Nights Calculation ----------------
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;

    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  }, [checkIn, checkOut]);

  // ---------------- Price Calculation ----------------
  const totalPrice = useMemo(() => {
    if (!nights || !hotel) return 0;
    const guestFactor = adults + children * 0.5;
    return Math.round(hotel.price * nights * guestFactor);
  }, [hotel, nights, adults, children]);

  // ---------------- Validation ----------------
  const validateForm = () => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (!checkIn) {
      toast.error("Please select check-in date");
      return false;
    }

    if (!checkOut) {
      toast.error("Please select check-out date");
      return false;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    if (checkInDate < todayDate) {
      toast.error("Check-in date cannot be in the past");
      return false;
    }

    if (checkOutDate <= checkInDate) {
      toast.error("Check-out must be after check-in");
      return false;
    }

    const diffDays =
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    if (diffDays > 30) {
      toast.warning("Maximum stay allowed is 30 days");
      return false;
    }

    if (adults < 1) {
      toast.error("At least 1 adult is required");
      return false;
    }

    if (adults + children > 6) {
      toast.warning("Maximum 6 guests allowed");
      return false;
    }

    return true;
  };

  // ---------------- Save Booking ----------------
const handleConfirmBooking = async () => {
  if (!validateForm()) return;

  const booking = {
    hotel,
    adults,
    children,
    checkIn,
    checkOut,
    nights,
    totalPrice,
    status: "Pending",
  };

  try {
    const res = await axios.post(
      "http://localhost:3000/api/bookings",
      booking
    );

    // Save response (optional)
    localStorage.setItem(
      "currentBooking",
      JSON.stringify(res.data)
    );

    toast.success("Booking saved to database", {
      description: "Redirecting to payment...",
    });

    navigate(`/payment/${hotel.id}`);

  } catch (error) {
    console.error("Booking error:", error);

    if (error.response) {
      toast.error(error.response.data.error || "Server error");
    } else {
      toast.error("Cannot connect to server");
    }
  }
};

  if (!hotel) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Back Button */}
      <Link
        to={`/hotels/${hotel.id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft />
        Back to hotel
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: FORM */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Book Your Stay
          </h2>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaCalendarAlt /> Check-in
              </label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaCalendarAlt /> Check-out
              </label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaUser /> Adults
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={adults}
                onChange={(e) =>
                  setAdults(Math.max(1, Number(e.target.value)))
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaChild /> Children
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={children}
                onChange={(e) =>
                  setChildren(Math.max(0, Number(e.target.value)))
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleConfirmBooking}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Proceed to Payment
          </button>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-md h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Booking Summary
          </h3>

          <p className="font-medium">{hotel.name}</p>
          <p className="text-sm text-gray-500 mb-4">
            {hotel.city} · {hotel.roomType}
          </p>

          <div className="space-y-2 text-sm mb-4">
            <p>Nights: {nights}</p>
            <p>Adults: {adults}</p>
            <p>Children: {children}</p>
          </div>

          <div className="flex items-center gap-1 text-xl font-bold text-gray-800">
            <FaRupeeSign />
            {totalPrice}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Taxes included · Free cancellation
          </p>
        </div>
      </div>
    </div>
  );
}
