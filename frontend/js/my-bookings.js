// my-bookings.js
//
// Renders the list of bookings on my-bookings.html and lets the
// user cancel a booking.

async function renderBookings() {
  const container = document.getElementById("bookings-list");

  const bookings = await getBookings();

  if (bookings.length === 0) {
    container.innerHTML = "<p>You have no bookings yet.</p>";
    return;
  }

  // Look up each booking's room so we can show its name instead of "r1"
  const items = await Promise.all(
    bookings.map(async (booking) => {
      const room = await getRoomById(booking.roomId);
      const roomName = room ? room.name : booking.roomId;

      return `
        <div class="booking-item">
          <h3>${roomName}</h3>
          <p><strong>Club:</strong> ${booking.clubName}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
          <p><strong>Purpose:</strong> ${booking.purpose}</p>
          <button class="cancel-btn" data-id="${booking.id}">Cancel</button>
        </div>
      `;
    })
  );

  container.innerHTML = items.join("");

  // Attach a click listener to every Cancel button
  container.querySelectorAll(".cancel-btn").forEach((button) => {
    button.addEventListener("click", () => {
      handleCancelClick(button.dataset.id);
    });
  });
}

async function handleCancelClick(bookingId) {
  await deleteBooking(bookingId);
  await renderBookings();
}

document.addEventListener("DOMContentLoaded", renderBookings);