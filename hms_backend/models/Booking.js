const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  hotel: Object,
  adults: Number,
  children: Number,
  checkIn: String,
  checkOut: String,
  nights: Number,
  totalPrice: Number,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);