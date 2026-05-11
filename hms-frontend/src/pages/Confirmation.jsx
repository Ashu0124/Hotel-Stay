import {
  FaCheckCircle,
  FaHome,
  FaHistory,
  FaDownload,
} from "react-icons/fa";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import axios from "axios";
import Footer from "../components/Footer";

import { useUser } from "@clerk/clerk-react";

export default function Confirmation() {

  const { id } = useParams();

  const { user } = useUser();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBooking = async () => {

      try {

        const res = await axios.get(
          `https://hotel-stay-aeam.onrender.com/api/bookings/${id}`
        );

        setBooking(res.data);

        toast.success("Booking confirmed successfully!");

      } catch (err) {

        toast.error("Failed to load booking");

      } finally {

        setLoading(false);

      }
    };

    fetchBooking();

  }, [id]);

  // ================= DOWNLOAD PDF =================

  const downloadReceipt = () => {

    const doc = new jsPDF();

    // ================= COLORS =================
    const primary = [37, 99, 235];
    const lightBlue = [219, 234, 254];
    const dark = [31, 41, 55];

    // ================= HEADER =================

    doc.setFillColor(...primary);
    doc.rect(0, 0, 210, 35, "F");

    // LOGO TEXT
    doc.setTextColor(255, 255, 255);

    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");

    doc.text("HotelStay", 20, 22);

    // SUBTITLE
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    doc.text("Premium Hotel Booking Receipt", 20, 30);

    // ================= USER INFO =================

    doc.setFillColor(...lightBlue);
    doc.roundedRect(15, 45, 180, 30, 5, 5, "F");

    doc.setTextColor(...dark);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    doc.text("Customer Details", 20, 55);

    doc.setFont("helvetica", "normal");

    doc.text(
      `Name: ${user?.fullName || "Guest User"}`,
      20,
      64
    );

    doc.text(
      `Email: ${
        user?.primaryEmailAddress?.emailAddress ||
        "Not Available"
      }`,
      20,
      72
    );

    // ================= BOOKING DETAILS =================

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");

    doc.text("Booking Details", 20, 95);

    // TABLE BOX
    doc.setDrawColor(220);
    doc.roundedRect(15, 102, 180, 85, 4, 4);

    let y = 115;

    const row = (label, value) => {

      doc.setFontSize(12);

      doc.setFont("helvetica", "bold");
      doc.text(label, 25, y);

      doc.setFont("helvetica", "normal");
      doc.text(String(value || ""), 90, y);

      y += 12;
    };

    row("Hotel Name", booking.hotel.name);

    row("City", booking.hotel.city);

    row("Room Type", booking.hotel.roomType);

    row("Check-In", booking.checkIn);

    row("Check-Out", booking.checkOut);

    row("Booking Status", booking.status);

    row("Payment ID", booking.paymentId);

    // ================= TOTAL =================

    doc.setFillColor(240, 253, 244);

    doc.roundedRect(15, 195, 180, 20, 5, 5, "F");

    doc.setFontSize(16);

    doc.setFont("helvetica", "bold");

    doc.setTextColor(22, 101, 52);

    doc.text(
      `Total Paid : ₹${booking.totalPrice}`,
      20,
      208
    );

    // ================= FOOTER =================

    doc.setTextColor(120);

    doc.setFontSize(10);

    doc.text(
      "Thank you for booking with HotelStay",
      60,
      270
    );

    doc.text(
      "For support contact : support@hotelstay.com",
      45,
      277
    );

    // ================= SAVE =================

    doc.save(`HotelStay-Receipt-${booking._id}.pdf`);

    toast.success("Receipt Downloaded");

  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-10 text-center">
        Booking not found
      </div>
    );
  }

  // ================= UI =================

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">

        <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">

          {/* TOP HEADER */}
          <div className="bg-blue-600 text-white text-center py-10 px-6">

            <FaCheckCircle className="text-6xl mx-auto mb-4" />

            <h2 className="text-3xl font-bold">
              Booking Confirmed!
            </h2>

            <p className="mt-2 text-blue-100">
              Your hotel booking has been successfully completed.
            </p>

          </div>

          {/* BOOKING DETAILS */}
          <div className="p-8">

            <div className="grid sm:grid-cols-2 gap-5">

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Hotel Name
                </p>

                <h3 className="font-bold text-lg mt-1">
                  {booking.hotel.name}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  City
                </p>

                <h3 className="font-bold text-lg mt-1">
                  {booking.hotel.city}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Room Type
                </p>

                <h3 className="font-bold text-lg mt-1">
                  {booking.hotel.roomType}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Total Amount
                </p>

                <h3 className="font-bold text-lg mt-1 text-green-600">
                  ₹{booking.totalPrice}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Check-In
                </p>

                <h3 className="font-bold text-lg mt-1">
                  {booking.checkIn}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-gray-500 text-sm">
                  Check-Out
                </p>

                <h3 className="font-bold text-lg mt-1">
                  {booking.checkOut}
                </h3>
              </div>

            </div>

            {/* PAYMENT */}
            <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5">

              <p className="text-sm text-green-700">
                Payment Status
              </p>

              <h3 className="text-xl font-bold text-green-700 mt-1">
                {booking.status}
              </h3>

              <p className="text-sm text-gray-600 mt-3">
                Payment ID :
                <span className="font-medium ml-2">
                  {booking.paymentId}
                </span>
              </p>

            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <Link
                to="/"
                className="
                  flex-1 flex items-center justify-center gap-2
                  bg-blue-600 hover:bg-blue-700
                  text-white py-4 rounded-2xl
                  font-medium transition
                "
              >
                <FaHome />
                Home
              </Link>

              <Link
                to="/history"
                className="
                  flex-1 flex items-center justify-center gap-2
                  border-2 border-blue-600 text-blue-600
                  hover:bg-blue-50
                  py-4 rounded-2xl
                  font-medium transition
                "
              >
                <FaHistory />
                History
              </Link>

              <button
                onClick={downloadReceipt}
                className="
                  flex-1 flex items-center justify-center gap-2
                  bg-green-600 hover:bg-green-700
                  text-white py-4 rounded-2xl
                  font-medium transition
                "
              >
                <FaDownload />
                Receipt
              </button>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
