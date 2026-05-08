import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSearch } from "../context/SearchContext";
import {
  FaHome,
  FaHotel,
  FaClipboardList,
  FaSignInAlt,
  FaMicrophone,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ================= VOICE SEARCH =================
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setQuery(transcript);

      if (transcript.trim()) {
        navigate("/hotels");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Voice recognition failed");
    };
  };

  // ================= SEARCH =================
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (location.pathname === "/" && value.trim()) {
      navigate("/hotels");
    }
  };

  // ================= SCROLL NAVBAR =================
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ================= ACTIVE NAV =================
  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  const navLinkClass = (active) =>
    `
    relative flex items-center gap-2 font-medium transition
    ${active ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}
    after:absolute after:-bottom-1 after:left-0 after:h-[2px]
    after:bg-blue-600 after:rounded-full
    after:transition-all after:duration-300
    ${active ? "after:w-full" : "after:w-0 hover:after:w-full"}
  `;

  return (
    <>
      {/* ================= MOBILE SEARCH ================= */}
      <div
        className={`
          md:hidden sticky top-0 z-50
          bg-white/80 backdrop-blur border-b
          px-4 py-3 transition-transform duration-300
          ${showNav ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="relative">
          <img
            src="/hms.png"
            alt="Search"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 opacity-70"
          />

          <input
            type="text"
            placeholder="Search hotels, cities, room types..."
            value={query}
            onChange={handleSearchChange}
            className="
              w-full pl-12 pr-12 py-2.5 rounded-xl border
              bg-gray-50 text-sm
              focus:ring-2 focus:ring-blue-500 focus:outline-none
            "
          />

          {/* MIC BUTTON */}
          <button
            onClick={startVoiceSearch}
            className={`
              absolute right-3 top-1/2 -translate-y-1/2
              p-2 rounded-full transition
              ${
                isListening
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }
            `}
          >
            <FaMicrophone />
          </button>
        </div>
      </div>

      {/* ================= DESKTOP NAVBAR ================= */}
      <nav
        className={`
          hidden md:block sticky top-0 z-50
          bg-white/80 backdrop-blur-md border-b
          transition-transform duration-300
          ${showNav ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-6">

            {/* LOGO */}
            <Link
              to="/"
              className="text-3xl font-bold text-blue-600 tracking-wide"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Hotel<span className="text-gray-800">Stay</span>
            </Link>

            {/* SEARCH BAR */}
            <div className="relative flex-1 max-w-xl">
              <img
                src="/hms.png"
                alt="Search"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 opacity-70"
              />

              <input
                type="text"
                placeholder="Search hotels, cities, room types..."
                value={query}
                onChange={handleSearchChange}
                className="
                  w-full pl-12 pr-12 py-2.5 rounded-full border
                  bg-gray-50 text-sm
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                "
              />

              {/* MIC BUTTON */}
              <button
                onClick={startVoiceSearch}
                className={`
                  absolute right-3 top-1/2 -translate-y-1/2
                  p-2 rounded-full transition
                  ${
                    isListening
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }
                `}
              >
                <FaMicrophone />
              </button>
            </div>

            {/* NAV LINKS */}
            <div className="flex items-center gap-8">

              <Link to="/" className={navLinkClass(isActive("/"))}>
                <FaHome /> Home
              </Link>

              <Link
                to="/hotels"
                className={navLinkClass(isActive("/hotels"))}
              >
                <FaHotel /> Hotels
              </Link>

              <Link
                to="/history"
                className={navLinkClass(isActive("/history"))}
              >
                <FaClipboardList /> My Bookings
              </Link>

              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <Link
                  to="/sign-in"
                  className="
                    flex items-center gap-2
                    bg-blue-600 text-white px-4 py-2
                    rounded-full text-sm font-medium
                    hover:bg-blue-700 transition
                  "
                >
                  <FaSignInAlt /> Sign In
                </Link>
              </SignedOut>

            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div
        className={`
          md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white/80 border-t
          transition-transform duration-300
          ${showNav ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="flex justify-around py-2 text-xs">

          <Link
            to="/"
            className="
              flex flex-col items-center gap-1
              text-gray-700 hover:text-blue-600 transition
            "
          >
            <FaHome className="text-lg" />
            Home
          </Link>

          <Link
            to="/hotels"
            className="
              flex flex-col items-center gap-1
              text-gray-700 hover:text-blue-600 transition
            "
          >
            <FaHotel className="text-lg" />
            Hotels
          </Link>

          <Link
            to="/history"
            className="
              flex flex-col items-center gap-1
              text-gray-700 hover:text-blue-600 transition
            "
          >
            <FaClipboardList className="text-lg" />
            Bookings
          </Link>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link
              to="/sign-in"
              className="
                flex flex-col items-center gap-1 text-blue-600
              "
            >
              <FaSignInAlt className="text-lg" />
              Sign In
            </Link>
          </SignedOut>

        </div>
      </div>
    </>
  );
}