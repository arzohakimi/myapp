// api.js
//
// This file is the ONLY place that talks to the backend.
// It uses fetch() to call the Express API running at the same address
// as the website (http://localhost:3000).

// ---------- Rooms ----------

async function getRooms() {
  const response = await fetch("/api/rooms");
  return await response.json();
}

async function getRoomById(id) {
  const response = await fetch(`/api/rooms/${id}`);
  return await response.json();
}

// ---------- Bookings ----------

async function getBookings() {
  const response = await fetch("/api/bookings");
  return await response.json();
}

async function createBooking(bookingData) {
  // bookingData looks like:
  // { roomId, clubName, date, startTime, endTime, purpose }
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    throw new Error("Could not create booking");
  }

  return await response.json();
}

async function deleteBooking(id) {
  const response = await fetch(`/api/bookings/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Could not delete booking");
  }

  return await response.json();
}