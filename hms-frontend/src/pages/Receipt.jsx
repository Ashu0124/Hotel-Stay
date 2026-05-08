import {
  FaEnvelope,
  FaCheckCircle,
  FaHotel,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaIdCard,
  FaDownload,
} from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import jsPDF from "jspdf";
import { useUser } from "@clerk/clerk-react";

export default function Receipt() {
  const { bookingId } = useParams();

  const history =
    JSON.parse(localStorage.getItem("bookingHistory")) || [];

  const booking = history.find(
    (b) => b.bookingId.toString() === bookingId
  );

  // Clerk user
  const { user } = useUser();

  const userEmail =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    "guest@email.com";

  const userName =
    user?.fullName ||
    user?.firstName ||
    "Guest User";

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  // ================= PDF DOWNLOAD =================
  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("HotelStay Invoice", 20, 20);

    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Date: ${date}`, 20, 28);

    doc.line(20, 32, 190, 32);

    let y = 45;

    const row = (label, value) => {
      doc.setFont(undefined, "bold");
      doc.text(label, 20, y);
      doc.setFont(undefined, "normal");
      doc.text(String(value), 90, y);
      y += 8;
    };

    row("Customer Name", userName);
    row("Email", userEmail);
    row("Hotel", booking.hotel.name);
    row("City", booking.hotel.city);
    row("Room Type", booking.hotel.roomType);
    row("Check-in", booking.checkIn);
    row("Check-out", booking.checkOut);
    row("Guests", `${booking.adults} Adults, ${booking.children} Children`);
    row("Payment ID", booking.paymentId);

    y += 10;
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("Total Amount", 20, y);
    doc.text(`₹${booking.totalPrice}`, 160, y);

    doc.save(`receipt-${booking.bookingId}.pdf`);
  };

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <p className="text-lg font-medium">Receipt not found</p>
        <Link to="/history" className="text-blue-600 underline">
          Back to history
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-10">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6" data-aos="fade-right">
        <FaEnvelope className="text-blue-600 text-2xl" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Booking Receipt
          </h2>
          <p className="text-sm text-gray-500">
            Confirmation & payment details
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

        {/* IMAGE */}
        <div className="relative h-40 sm:h-56 w-full">
          <img
            src={
              booking.hotel.image ||
              "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
            }
            className="w-full h-full object-cover"
            alt={booking.hotel.name}
          />

          <div className="absolute bottom-3 left-4 text-white">
            <h3 className="text-lg font-semibold">
              {booking.hotel.name}
            </h3>
            <p className="text-xs">{booking.hotel.city}</p>
          </div>
        </div>

        {/* STATUS */}
        <div className="bg-green-50 border-b p-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <FaCheckCircle />
            Booking Confirmed
          </div>

          <span className="text-xs text-gray-500">
            ID: {booking.paymentId}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-5">

          <p className="text-sm text-gray-500">
            <b>To:</b> {userEmail}
          </p>

          <p className="text-sm">
            Hello <b>{userName}</b>, your booking is confirmed.
          </p>

          {/* DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <Detail icon={<FaHotel />} label="Hotel"
              value={`${booking.hotel.name}, ${booking.hotel.city}`} />

            <Detail icon={<FaIdCard />} label="Room"
              value={booking.hotel.roomType} />

            <Detail icon={<FaCalendarAlt />} label="Stay"
              value={`${booking.checkIn} → ${booking.checkOut}`} />

            <Detail icon={<FaUsers />} label="Guests"
              value={`${booking.adults} Adults, ${booking.children} Children`} />

            <Detail icon={<FaRupeeSign />} label="Total"
              value={`₹${booking.totalPrice}`} bold />

          </div>

          {/* BUTTON */}
          <button
            onClick={downloadReceipt}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 transition w-full"
          >
            <FaDownload />
            Download Receipt
          </button>

        </div>
      </div>
    </div>
  );
}

/* ================= DETAIL COMPONENT ================= */

function Detail({ icon, label, value, bold }) {
  return (
    <div className="flex gap-3 bg-gray-50 p-4 rounded-xl">
      <div className="text-blue-600 mt-1">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-sm ${bold ? "font-bold" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}