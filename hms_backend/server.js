const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err.message));

// Routes
app.use("/api/bookings", require("./routes/BookingRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

app.get("/", (req, res) => {
  res.send("Server running with Razorpay");
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);