// ---------- zones----------
function goCentre(zone) {
  localStorage.setItem("zone", zone);
  window.location.href = "centres.html";
}

// ---------- centres ----------
function goSection(centre) {
  localStorage.setItem("centre", centre);
  window.location.href = "sections.html";
}

// ---------- SECTION ----------
function goShift() {
  window.location.href = "shifts.html";
}

// ---------- SHIFT ----------
function goSeats(shift) {
  localStorage.setItem("shift", shift);
  window.location.href = "seats.html";
}

// ---------- Seats ----------
function selectSeat(seat) {
  localStorage.setItem("seat", seat);
}

function goPayment() {
  window.location.href = "payment.html";
}
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


function toggleMenu() {
  document.getElementById("gmNavMenu").classList.toggle("show");
}
