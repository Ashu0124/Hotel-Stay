import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function HotelCard({ hotel }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={(hotel.id % 6) * 80}
      className="
        group bg-white rounded-2xl sm:rounded-3xl overflow-hidden
        shadow-md hover:shadow-xl
        hover:-translate-y-0.5 sm:hover:-translate-y-1
        transition-[transform,box-shadow] duration-300
        flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative h-40 sm:h-52 w-full overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=60";
          }}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105 sm:group-hover:scale-110
          "
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* PRICE BADGE */}
        <div
          className="
            absolute top-2 left-2 sm:top-3 sm:left-3
            bg-white/80 backdrop-blur-md
            px-2.5 py-1 sm:px-3
            rounded-full
            text-xs sm:text-sm font-semibold text-blue-700
            shadow ring-1 ring-white/50
          "
        >
          ₹{hotel.price} / night
        </div>

        {/* RATING BADGE */}
        <div
          className="
            absolute top-2 right-2 sm:top-3 sm:right-3
            flex items-center gap-1
            bg-black/60 backdrop-blur
            text-white px-2 py-1
            rounded-full text-xs font-semibold
          "
        >
          <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
          {hotel.rating}
        </div>

        {/* TOP RATED TAG */}
        {hotel.rating >= 4.5 && (
          <div
            className="
              absolute bottom-2 left-2 sm:bottom-3 sm:left-3
              bg-emerald-500 text-white
              px-2 py-0.5 sm:py-1
              text-[10px] sm:text-xs
              rounded-full font-semibold shadow
            "
          >
            Top Rated
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
            {hotel.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-1">
            <span className="text-gray-400">📍</span>
            {hotel.city}
          </p>
        </div>

        {/* CTA */}
        <Link
          to={`/hotels/${hotel.id}`}
          className="
            mt-auto inline-flex items-center justify-center gap-2
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white py-2.5 sm:py-3
            rounded-lg sm:rounded-xl
            text-sm sm:text-base
            font-medium tracking-wide
            hover:from-blue-700 hover:to-indigo-700
            transition-all
          "
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
