import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import {
  FaHotel,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaDownload,
} from "react-icons/fa";

import jsPDF from "jspdf";
import { useUser } from "@clerk/clerk-react";

export default function BookingHistory() {

  const [bookings, setBookings] = useState([]);

  // ================= CLERK USER =================
  const { user } = useUser();

  // ================= FETCH BOOKINGS =================
  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const res = await fetch(
          "https://hotel-stay-aeam.onrender.com/api/bookings"
        );

        const data = await res.json();

        setBookings(data.reverse());

      } catch (err) {

        console.log(err);

      }
    };

    fetchBookings();

  }, []);

  // ================= DOWNLOAD PDF =================
  const downloadReceipt = (b) => {

    const doc = new jsPDF();

    // ================= COLORS =================
    const primary = [37, 99, 235];
    const lightBlue = [219, 234, 254];
    const dark = [31, 41, 55];

    // ================= HEADER =================

    doc.setFillColor(...primary);

    doc.rect(0, 0, 210, 35, "F");

    // LOGO TITLE
    doc.setTextColor(255, 255, 255);

    doc.setFontSize(28);

    doc.setFont("helvetica", "bold");

    doc.text("HotelStay", 20, 22);

    // SUBTITLE
    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");

    doc.text(
      "Premium Hotel Booking Receipt",
      20,
      30
    );

    // ================= DATE =================

    const date = new Date().toLocaleDateString();

    doc.setTextColor(80);

    doc.setFontSize(10);

    doc.text(`Generated On : ${date}`, 145, 45);

    // ================= USER INFO =================

    doc.setFillColor(...lightBlue);

    doc.roundedRect(
      15,
      52,
      180,
      35,
      5,
      5,
      "F"
    );

    doc.setTextColor(...dark);

    doc.setFontSize(13);

    doc.setFont("helvetica", "bold");

    doc.text("Customer Information", 20, 65);

    doc.setFont("helvetica", "normal");

    // USER NAME
    doc.text(
      `Name : ${
        user?.fullName ||
        user?.firstName ||
        "Guest User"
      }`,
      20,
      75
    );

    // USER EMAIL
    doc.text(
      `Email : ${
        user?.primaryEmailAddress?.emailAddress ||
        "Not Available"
      }`,
      20,
      83
    );

    // ================= BOOKING DETAILS =================

    doc.setTextColor(...dark);

    doc.setFontSize(16);

    doc.setFont("helvetica", "bold");

    doc.text("Booking Details", 20, 105);

    // TABLE BOX
    doc.setDrawColor(220);

    doc.roundedRect(
      15,
      112,
      180,
      95,
      4,
      4
    );

    let y = 125;

    const row = (label, value) => {

      doc.setFontSize(12);

      doc.setFont("helvetica", "bold");

      doc.text(label, 25, y);

      doc.setFont("helvetica", "normal");

      doc.text(String(value || ""), 95, y);

      y += 12;
    };

    row("Hotel Name", b.hotel.name);

    row("City", b.hotel.city);

    row("Room Type", b.hotel.roomType);

    row("Check-In", b.checkIn);

    row("Check-Out", b.checkOut);

    row(
      "Guests",
      `${b.adults} Adults, ${b.children} Children`
    );

    row("Booking Status", b.status);

    row("Payment ID", b.paymentId);

    // ================= TOTAL SECTION =================

    doc.setFillColor(240, 253, 244);

    doc.roundedRect(
      15,
      220,
      180,
      22,
      5,
      5,
      "F"
    );

    doc.setFontSize(16);

    doc.setFont("helvetica", "bold");

    doc.setTextColor(22, 101, 52);

    doc.text(
      `Total Paid : ₹${b.totalPrice}`,
      20,
      234
    );

    // ================= FOOTER =================

    doc.setTextColor(120);

    doc.setFontSize(10);

    doc.text(
      "Thank you for booking with HotelStay",
      58,
      270
    );

    doc.text(
      "For support : support@hotelstay.com",
      58,
      277
    );

    // ================= SAVE =================

    doc.save(
      `HotelStay-Receipt-${b.bookingId}.pdf`
    );
  };

  // ================= EMPTY =================
  if (bookings.length === 0) {

    return (
      <>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500 px-4 text-center">

          <FaHotel className="text-5xl mb-4 text-gray-300" />

          <h2 className="text-lg font-semibold">
            No bookings yet
          </h2>

          <p className="text-sm mt-2 mb-6">
            Your confirmed bookings will appear here
          </p>

          <Link
            to="/hotels"
            className="
              bg-blue-600 text-white
              px-6 py-3 rounded-xl
              text-sm font-medium
            "
          >
            Explore Hotels
          </Link>

        </div>

        <Footer />
      </>
    );
  }

  // ================= UI =================
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-3 sm:px-4">

        <div className="max-w-6xl mx-auto">

          {/* TITLE */}
          <div className="mb-8">

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Booking History
            </h1>

            <p className="text-gray-500 mt-2">
              View all your hotel bookings & receipts
            </p>

          </div>

          {/* BOOKINGS */}
          <div className="space-y-6">

            {bookings.map((b) => (

              <div
                key={b.bookingId}
                className="
                  bg-white rounded-3xl shadow-xl
                  overflow-hidden flex flex-col lg:flex-row
                  border border-gray-100
                "
              >

                {/* IMAGE */}
                <div className="relative lg:w-80 h-56 lg:h-auto">

                  <img
                    src={
                      b.hotel.image ||
                      "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                    }
                    alt={b.hotel.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="
                    absolute top-4 left-4
                    bg-green-500 text-white
                    px-4 py-1 rounded-full text-xs font-semibold
                  ">
                    {b.status}
                  </div>

                </div>

                {/* DETAILS */}
                <div className="flex-1 p-6 flex flex-col justify-between">

                  <div>

                    {/* HOTEL */}
                    <div className="flex items-center gap-3 mb-2">

                      <FaHotel className="text-blue-600 text-xl" />

                      <h2 className="text-2xl font-bold text-gray-800">
                        {b.hotel.name}
                      </h2>

                    </div>

                    <p className="text-gray-500 mb-6">
                      {b.hotel.city} • {b.hotel.roomType}
                    </p>

                    {/* INFO GRID */}
                    <div className="grid sm:grid-cols-2 gap-4">

                      <div className="
                        bg-gray-50 rounded-2xl p-4
                        flex items-center gap-3
                      ">

                        <FaCalendarAlt className="text-blue-600 text-lg" />

                        <div>
                          <p className="text-xs text-gray-500">
                            Stay Duration
                          </p>

                          <h3 className="font-semibold text-sm">
                            {b.checkIn} → {b.checkOut}
                          </h3>
                        </div>

                      </div>

                      <div className="
                        bg-gray-50 rounded-2xl p-4
                        flex items-center gap-3
                      ">

                        <FaUsers className="text-blue-600 text-lg" />

                        <div>
                          <p className="text-xs text-gray-500">
                            Guests
                          </p>

                          <h3 className="font-semibold text-sm">
                            {b.adults} Adults,
                            {" "}
                            {b.children} Children
                          </h3>
                        </div>

                      </div>

                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="
                    mt-8 pt-5 border-t
                    flex flex-col sm:flex-row
                    items-start sm:items-center
                    justify-between gap-4
                  ">

                    {/* PRICE */}
                    <div className="
                      flex items-center gap-2
                      text-2xl font-bold text-green-600
                    ">

                      <FaRupeeSign />

                      {b.totalPrice}

                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() => downloadReceipt(b)}
                      className="
                        flex items-center gap-2
                        bg-green-600 hover:bg-green-700
                        text-white px-6 py-3
                        rounded-2xl font-medium
                        transition
                      "
                    >

                      <FaDownload />

                      Download Receipt

                    </button>
                  </div>

                  {/* BOOKING ID */}
                  <div className="
                    mt-5 text-xs text-gray-400
                  ">

                    Booking ID : {b.bookingId}

                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
