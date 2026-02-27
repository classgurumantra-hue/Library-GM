let selectedSeat = null;
const seatsDiv = document.getElementById("seats");
const info = document.getElementById("info");

// Get shift from previous page or default
let shift = localStorage.getItem("shift") || "Morning";
info.innerText = "Shift: " + shift;

// Fake booked seats can be removed if backend provides API for booked seats
let bookedSeats = []; // optional: fetch from backend if API available

// Generate seat grid
for (let row of ["A","B","C","D","E"]) {
  for (let i = 1; i <= 8; i++) {
    let seatNo = row + i;
    let seat = document.createElement("div");
    seat.classList.add("seat");
    seat.innerText = seatNo;

    if (bookedSeats.includes(seatNo)) {
      seat.classList.add("booked");
    } else {
      seat.onclick = () => selectSeat(seat, seatNo);
    }

    seatsDiv.appendChild(seat);
  }
}

// Seat selection
function selectSeat(el, seatNo) {
  document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
  el.classList.add("selected");
  selectedSeat = seatNo;

  // Save to localStorage for payment page
  localStorage.setItem("selectedSeat", seatNo);
  localStorage.setItem("shift", shift);
}

// Go to payment page
function goPayment() {
  if (!selectedSeat) {
    alert("Please select a seat first!");
    return;
  }
  window.location.href = "payment.html";
}