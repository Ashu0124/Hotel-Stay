import { Link } from "react-router-dom";
import {
    FaExclamationTriangle,
    FaHome,
    FaHotel,
} from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 bg-black/5">
            <div className="w-full max-w-md bg-black/10 rounded-2xl shadow-2xl p-8 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaExclamationTriangle className="text-4xl text-blue-600" />
                    </div>
                </div>

                {/* 404 */}
                <h1 className="text-6xl font-extrabold text-blue-600 tracking-tight mb-2">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Oops! Page not found
                </h2>
                <p className="text-sm text-gray-500 mb-8">
                    The page you’re looking for doesn’t exist, was removed,
                    or the URL might be incorrect.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/"
                        className="
              inline-flex items-center justify-center gap-2
              bg-blue-600 text-white md:px-6 py-3 rounded-xl
              font-medium hover:bg-blue-700 transition
            "
                    >
                        <FaHome />
                        Go Home
                    </Link>

                    <Link
                        to="/hotels"
                        className="
              inline-flex items-center justify-center gap-2
              border border-blue-600 text-blue-600 md:px-9 py-3 rounded-xl
              font-medium hover:bg-blue-50 transition
            "
                    >
                        <FaHotel />
                        Browse Hotels
                    </Link>
                </div>
            </div>
        </div>
    );
}
