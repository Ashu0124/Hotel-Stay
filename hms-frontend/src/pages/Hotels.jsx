import { useState, useEffect, useRef } from "react";
import hotelsData from "../services/hotels";
import HotelCard from "../components/HotelCard";
import { useSearch } from "../context/SearchContext";
import { toast } from "sonner";
import Footer from "../components/Footer";

import {
  FaCity,
  FaBed,
  FaRupeeSign,
  FaSortAmountDown,
  FaSearch,
  FaFilter,
  FaTimes,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
} from "react-icons/fa";

export default function Hotels() {
  const { query } = useSearch();

  const [city, setCity] = useState("All");
  const [roomType, setRoomType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("");
  const [rating, setRating] = useState(0);

  const [wifiOnly, setWifiOnly] = useState(false);
  const [poolOnly, setPoolOnly] = useState(false);
  const [parkingOnly, setParkingOnly] = useState(false);
  const [foodOnly, setFoodOnly] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const firstRender = useRef(true);

  // ================= LOADING =================
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);

      if (!firstRender.current) {
        toast.success("Filters Updated");
      } else {
        firstRender.current = false;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    query,
    city,
    roomType,
    maxPrice,
    sortBy,
    rating,
    wifiOnly,
    poolOnly,
    parkingOnly,
    foodOnly,
  ]);

  // ================= FILTER HOTELS =================
  const filteredHotels = hotelsData
    .filter((hotel) => {
      if (!query) return true;

      const search = query.toLowerCase();

      return (
        hotel.name.toLowerCase().includes(search) ||
        hotel.city.toLowerCase().includes(search) ||
        hotel.roomType.toLowerCase().includes(search)
      );
    })

    .filter((hotel) => city === "All" || hotel.city === city)

    .filter(
      (hotel) =>
        roomType === "All" || hotel.roomType === roomType
    )

    .filter((hotel) => hotel.price <= maxPrice)

    .filter((hotel) => hotel.rating >= rating)

    .filter((hotel) =>
      wifiOnly ? hotel.wifi === true : true
    )

    .filter((hotel) =>
      poolOnly ? hotel.pool === true : true
    )

    .filter((hotel) =>
      parkingOnly ? hotel.parking === true : true
    )

    .filter((hotel) =>
      foodOnly ? hotel.food === true : true
    )

    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;

      if (sortBy === "price-high") return b.price - a.price;

      if (sortBy === "rating") return b.rating - a.rating;

      return 0;
    });

  // ================= NO RESULTS =================
  useEffect(() => {
    if (
      !loading &&
      filteredHotels.length === 0 &&
      !firstRender.current
    ) {
      toast.error("No Hotels Found");
    }
  }, [filteredHotels, loading]);

  // ================= RESET FILTERS =================
  const resetFilters = () => {
    setCity("All");
    setRoomType("All");
    setMaxPrice(10000);
    setSortBy("");
    setRating(0);

    setWifiOnly(false);
    setPoolOnly(false);
    setParkingOnly(false);
    setFoodOnly(false);

    toast.success("Filters Reset");
  };

  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">

        {/* ================= HERO ================= */}
        <div className="text-center py-10 px-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Find Your Perfect Stay
          </h1>

          <p className="text-gray-500 mt-3">
            Luxury hotels, budget rooms & premium stays
          </p>
        </div>

        {/* ================= MAIN ================= */}
        <div className="max-w-7xl mx-auto px-4 pb-10">

          {/* ================= TOP BAR ================= */}
          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Available Hotels
              </h2>

              <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                <FaSearch />
                {filteredHotels.length} Hotels Found
              </p>
            </div>

            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden bg-blue-600 text-white px-4 py-3 rounded-xl flex items-center gap-2"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {/* ================= DESKTOP FILTERS ================= */}
          <div className="hidden lg:block bg-white rounded-3xl shadow-xl p-6 mb-8">

            <div className="grid grid-cols-5 gap-6">

              {/* CITY */}
              <div>
                <label className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <FaCity className="text-blue-600" />
                  City
                </label>

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="All">All Cities</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>

              {/* ROOM TYPE */}
              <div>
                <label className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <FaBed className="text-blue-600" />
                  Room Type
                </label>

                <select
                  value={roomType}
                  onChange={(e) =>
                    setRoomType(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="All">All Rooms</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <FaRupeeSign className="text-blue-600" />
                  Max Price
                </label>

                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Number(e.target.value))
                  }
                  className="w-full"
                />

                <p className="text-blue-600 font-semibold mt-2">
                  ₹ {maxPrice}
                </p>
              </div>

              {/* SORT */}
              <div>
                <label className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <FaSortAmountDown className="text-blue-600" />
                  Sort By
                </label>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Recommended</option>
                  <option value="price-low">
                    Price Low → High
                  </option>
                  <option value="price-high">
                    Price High → Low
                  </option>
                  <option value="rating">
                    Top Rated
                  </option>
                </select>
              </div>

              {/* RATING */}
              <div>
                <label className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Rating
                </label>

                <select
                  value={rating}
                  onChange={(e) =>
                    setRating(Number(e.target.value))
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="0">All Ratings</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>
            
            {/* RESET */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={resetFilters}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* ================= MOBILE FILTERS ================= */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/40 z-50 lg:hidden flex items-end">

              <div className="bg-white rounded-t-3xl w-full h-[90vh] overflow-y-auto p-6">

                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">
                    Filters
                  </h2>

                  <button
                    onClick={() =>
                      setShowFilters(false)
                    }
                  >
                    <FaTimes size={22} />
                  </button>
                </div>

                <div className="space-y-6">

                  {/* MOBILE SAME FILTERS */}
                  <div>
                    <label className="text-sm font-medium">
                      City
                    </label>

                    <select
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      className="w-full border rounded-xl px-4 py-3 mt-2"
                    >
                      <option value="All">
                        All Cities
                      </option>
                      <option value="Mumbai">
                        Mumbai
                      </option>
                      <option value="Delhi">
                        Delhi
                      </option>
                      <option value="Chennai">
                        Chennai
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Max Price
                    </label>

                    <input
                      type="range"
                      min="1000"
                      max="10000"
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(
                          Number(e.target.value)
                        )
                      }
                      className="w-full mt-3"
                    />

                    <p className="text-blue-600 font-bold">
                      ₹ {maxPrice}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setShowFilters(false)
                    }
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= LOADING ================= */}
          {loading ? (
            <div className="flex justify-center py-20">

              <div className="h-14 w-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="text-center py-24">

              <h2 className="text-2xl font-bold text-gray-700">
                No Hotels Found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ================= FACILITY BUTTON ================= */

function FacilityButton({
  active,
  onClick,
  icon,
  label,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-5 py-3 rounded-2xl border transition
        ${
          active
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-700"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}