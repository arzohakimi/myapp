// Stage 2: Bookings API
//
//   GET    /api/bookings       -> return the full list of bookings
//   POST   /api/bookings       -> create a new booking, save it to bookings.json
//   DELETE /api/bookings/:id   -> remove a booking by id

const express = require("express");
const router = express.Router();
const { readData, writeData } = require("../utils/jsonStore");

// GET /api/bookings
router.get("/", (req, res) => {
  const bookings = readData("bookings.json");
  res.json(bookings);
});

// POST /api/bookings
router.post("/", (req, res) => {
  const { roomId, clubName, date, startTime, endTime, purpose } = req.body;

  if (!roomId || !clubName || !date || !startTime || !endTime || !purpose) {
    return res.status(400).json({
      error:
        "Missing required fields: roomId, clubName, date, startTime, endTime, purpose",
    });
  }

  const bookings = readData("bookings.json");

  const newBooking = {
    id: Date.now().toString(),
    roomId,
    clubName,
    date,
    startTime,
    endTime,
    purpose,
  };

  bookings.push(newBooking);
  writeData("bookings.json", bookings);

  res.status(201).json(newBooking);
});

// DELETE /api/bookings/:id
router.delete("/:id", (req, res) => {
  const bookings = readData("bookings.json");
  const remaining = bookings.filter((b) => b.id !== req.params.id);

  if (remaining.length === bookings.length) {
    return res.status(404).json({ error: "Booking not found" });
  }

  writeData("bookings.json", remaining);
  res.status(200).json({ message: "Booking canceled" });
});

module.exports = router;