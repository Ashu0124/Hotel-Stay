import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLock, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "sonner";
import Footer from "../components/Footer";
import axios from "axios";

export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("online");

  const booking = JSON.parse(localStorage.getItem("currentBooking") || "null");

  useEffect(() => {
    if (!booking) {
      navigate("/hotels"); // ❌ no toast (prevents unwanted message)
    }
  }, [booking, navigate]);

  if (!booking) return null;

  // ================= COD =================
  const confirmCOD = async () => {
  try {

    await axios.put(
      `http://localhost:3000/api/bookings/${booking._id}`,
      {
        status: "COD",
        paymentMethod: "COD",
      }
    );

    localStorage.removeItem("currentBooking");

    navigate(`/confirmation/${booking._id}`);

  } catch (err) {

    toast.error("Failed to place COD booking");

  }
};

  // ================= ONLINE PAYMENT =================
  const handleOnlinePayment = async () => {
    try {
      const { data: order } = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        {
          amount: booking.totalPrice,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Hotel Booking",
        description: "Room Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            const res = await axios.post(
              "http://localhost:3000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: booking._id,
              }
            );

            if (res.data.success) {
              await axios.put(
                `http://localhost:3000/api/bookings/${booking._id}`,
                {
                  status: "Paid Online",
                  paymentId: response.razorpay_payment_id,
                  paymentMethod: "Razorpay",
                }
              );

              localStorage.removeItem("currentBooking");

              navigate(`/confirmation/${booking._id}`);

            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Verification error");
          }
        },

        theme: {
          color: "#22c55e",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  // ================= MAIN =================
  const handlePayment = () => {
    if (method === "cod") {
      confirmCOD();
    } else {
      handleOnlinePayment();
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto px-4 py-10">

        <h2 className="text-2xl font-bold mb-6">Payment</h2>

        {/* BOOKING */}
        <div className="bg-white shadow rounded-xl p-6 mb-6">
          <p className="font-semibold">{booking.hotel.name}</p>
          <p className="text-xl font-bold text-green-600">
            ₹{booking.totalPrice}
          </p>
        </div>

        {/* OPTIONS */}
        <div className="bg-white shadow rounded-xl p-6 mb-6 space-y-4">

          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={method === "online"}
              onChange={() => setMethod("online")}
            />
            <FaLock className="text-green-600" />
            Pay Online (Razorpay)
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              checked={method === "cod"}
              onChange={() => setMethod("cod")}
            />
            <FaMoneyBillWave className="text-yellow-600" />
            Cash on Delivery
          </label>

        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-3 rounded-xl"
        >
          {method === "online" ? "Pay Online" : "Place Order"}
        </button>

      </div>

      <Footer />
    </>
  );
}