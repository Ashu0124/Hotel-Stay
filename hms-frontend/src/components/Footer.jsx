import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 mt-14">
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-10 sm:py-12
          grid gap-8
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2">
            <img
              src="/hms.png"
              alt="HotelEase Logo"
              className="w-7 h-7 object-contain"
            />
            <h2 className="text-lg font-bold text-white">
              HotelEase
            </h2>
          </div>

          <p className="text-xs mt-3 text-gray-400 leading-relaxed max-w-xs">
            Book hotels effortlessly with comfort, luxury, and
            the best prices. Your perfect stay starts here.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm text-white font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/hotels"
                className="hover:text-blue-400 transition-colors"
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="hover:text-blue-400 transition-colors"
              >
                My Bookings
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm text-white font-semibold mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500 shrink-0" />
              <a
                href="https://maps.google.com/?q=India"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                India
              </a>
            </li>

            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500 shrink-0" />
              <a
                href="mailto:ashutosh492004@gmail.com"
                className="hover:text-blue-400 transition-colors break-all"
              >
                ashutosh492004@gmail.com
              </a>
            </li>

            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500 shrink-0" />
              <a
                href="tel:+918984477577"
                className="hover:text-blue-400 transition-colors"
              >
                +91 8984477577
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-sm text-white font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-lg">
            <SocialIcon
              href="https://facebook.com/yourprofile"
              label="Facebook"
            >
              <FaFacebook />
            </SocialIcon>

            <SocialIcon
              href="https://www.instagram.com/deba_963/"
              label="Instagram"
            >
              <FaInstagram />
            </SocialIcon>

            <SocialIcon
              href="https://twitter.com/yourprofile"
              label="Twitter"
            >
              <FaTwitter />
            </SocialIcon>

            <SocialIcon
              href="https://github.com/debasish39"
              label="GitHub"
            >
              <FaGithub />
            </SocialIcon>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} HotelEase. All rights reserved.
      </div>
    </footer>
  );
}


function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="
        p-2 rounded-full
        bg-gray-800
        hover:bg-blue-600 hover:text-white
        transition-colors
      "
    >
      {children}
    </a>
  );
}
