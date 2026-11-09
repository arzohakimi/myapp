// booking.js
//
// Handles the "Book a Room" form on booking.html.

async function populateRoomSelect() {
  const select = document.getElementById("room-select");

  const rooms = await getRooms();

  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.id;
    option.textContent = room.name;
    select.appendChild(option);
  });
}

async function handleBookingSubmit(event) {
  event.preventDefault();

  const statusEl = document.getElementById("form-status");
  statusEl.className = "status-message";

  // Read every field in the form into one object, using each field's name
  const bookingData = Object.fromEntries(new FormData(event.target));

  try {
    const booking = await createBooking(bookingData);
    console.log("Booking created:", booking);

    statusEl.textContent = "Booking submitted!";
    statusEl.classList.add("success");
    event.target.reset();
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Something went wrong. Please try again.";
    statusEl.classList.add("error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateRoomSelect();
  document
    .getElementById("booking-form")
    .addEventListener("submit", handleBookingSubmit);
});