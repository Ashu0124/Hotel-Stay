const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* =========================
   CREATE ORDER
========================= */
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
};

/* =========================
   VERIFY PAYMENT
========================= */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment is verified

      // 👉 OPTIONAL: update booking in DB
      // await Booking.findByIdAndUpdate(bookingId, {
      //   status: "Paid",
      //   paymentId: razorpay_payment_id,
      // });

      return res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
};