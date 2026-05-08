import { Link } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">

      {/* Decorative background elements */}
      <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-[24rem] h-[24rem] bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">

          {/* ================= IMAGE (TOP ON MOBILE) ================= */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=60"
                alt="Luxury hotel room"
                loading="lazy"
                className="
                  relative rounded-3xl shadow-2xl
                  object-cover
                  ring-1 ring-white/20
                "
              />
            </div>
          </div>

          {/* ================= TEXT CONTENT ================= */}
          <div className="order-2 lg:order-1 text-white text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold tracking-wide">
              <FaStar className="text-yellow-300" />
              Smart Hotel Booking Platform
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Find Your
              <span className="block text-yellow-300 drop-shadow">
                Perfect Hotel Stay
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-white/90 max-w-xl mb-10 mx-auto lg:mx-0">
              Discover luxury, comfort, and budget-friendly hotels with
              real-time availability and a smooth booking experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/hotels"
                className="
                  inline-flex items-center justify-center gap-2
                  bg-yellow-400 text-gray-900
                  px-7 py-3 rounded-xl
                  font-semibold shadow-xl
                  hover:bg-yellow-300
                  hover:shadow-2xl
                  transition
                "
              >
                Explore Hotels
                <FaArrowRight />
              </Link>

              <Link
                to="/history"
                className="
                  inline-flex items-center justify-center
                  border border-white/40 text-white
                  px-7 py-3 rounded-xl
                  font-medium
                  hover:bg-white/10 backdrop-blur
                  transition
                "
              >
                View Bookings
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center lg:text-left">
              <Stat value="99+" label="Hotels" />
              <Stat value="10k+" label="Bookings" />
              <Stat value="4.9★" label="Rating" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================= SMALL UI ================= */

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-xl sm:text-2xl font-bold text-white">
        {value}
      </p>
      <p className="text-xs sm:text-sm text-white/80">
        {label}
      </p>
    </div>
  );
}
