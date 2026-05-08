const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Save booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const saved = await booking.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        error: "Booking not found",
      });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking after payment
router.put("/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;