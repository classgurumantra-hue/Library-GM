let selectedSeat = null;

const seatsDiv = document.getElementById("seats");
const info = document.getElementById("info");

let shift = localStorage.getItem("shift");
info.innerText = "Shift: " + shift;

// Fake booked seats
let bookedSeats = ["A3","A4","B2","C5"];

for(let row of ["A","B","C","D","E"]) {
  for(let i=1;i<=8;i++) {
    let seatNo = row + i;
    let seat = document.createElement("div");
    seat.classList.add("seat");
    seat.innerText = seatNo;

    if(bookedSeats.includes(seatNo)) {
      seat.classList.add("booked");
    } else {
      seat.onclick = () => selectSeat(seat, seatNo);
    }

    seatsDiv.appendChild(seat);
  }
}

function selectSeat(el, seatNo) {
  document.querySelectorAll(".seat").forEach(s=>{
    s.classList.remove("selected");
  });

  el.classList.add("selected");
  selectedSeat = seatNo;
  localStorage.setItem("seat", seatNo);
}

function goPayment() {
  let selected = document.querySelectorAll('.seat.selected');

  if (selected.length === 0) {
    alert("Please select at least 1 seat");
    return;
  }

  // Temporary redirect
  window.location.href = "payment.html";
}
