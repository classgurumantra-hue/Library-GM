let bookings = [
  { id:1, place:"GM Library", seat:"A12", date:"20 Feb 2026", status:"Active" },
  { id:2, place:"GM Library", seat:"B05", date:"25 Feb 2026", status:"Active" }
];

let container = document.getElementById("bookingList");

bookings.forEach(b => {
  container.innerHTML += `
    <div class="card">
      <h3>${b.place}</h3>
      <p>Seat: ${b.seat}</p>
      <p>Date: ${b.date}</p>
      <p class="status">${b.status}</p>
    </div>
  `;
});
