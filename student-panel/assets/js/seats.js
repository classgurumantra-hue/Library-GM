let selectedSeat = null;

const seatsDiv = document.getElementById("seats");
const info = document.getElementById("info");

const shiftName = localStorage.getItem("selectedShiftName");

if(shiftName){
    document.getElementById("info").innerText = "Shift: " + shiftName;
}

/* Shift ID from localStorage */
const shiftId = localStorage.getItem("selectedShiftId");
fetch("http://localhost:8087/api/shifts/" + shiftId)
.then(res => res.json())
.then(shift => {

    if (shift.coinLimitUsage) {
        localStorage.setItem("coinLimitUsage", shift.coinLimitUsage);
    }

});

console.log("ShiftId:", shiftId);


if (!shiftId) {
    alert("Shift not selected");
    window.location.href = "shifts.html";
}

/* Load Shift Seats from Backend */
window.onload = function () {

    fetch("http://localhost:8087/api/seats/" + shiftId)
    .then(res => res.json())
    .then(seats => {

        seatsDiv.innerHTML = "";

        if (!seats || seats.length === 0) {
            seatsDiv.innerHTML = "<p>No seats available</p>";
            return;
        }

        seats.forEach(seat => {

            const seatDiv = document.createElement("div");
            seatDiv.classList.add("seat");

            seatDiv.innerText = seat.seatNumber;

            if (seat.status === "BOOKED") {
                seatDiv.classList.add("booked");
            }
            else {
                seatDiv.onclick = () => selectSeat(seatDiv, seat);
            }

            seatsDiv.appendChild(seatDiv);

        });

    })
    .catch(err => {
        console.error(err);
        seatsDiv.innerHTML = "<p>Error loading seats</p>";
    });

};

/* Seat Selection */
function selectSeat(el, seat){

    document.querySelectorAll(".seat")
    .forEach(s => s.classList.remove("selected"));

    el.classList.add("selected");

    selectedSeat = seat.id;
console.log("Selected Seat:", selectedSeat);

    localStorage.setItem("selectedSeat", seat.seatNumber);
    localStorage.setItem("seatNumber", seat.seatNumber);

    const bookingData = {
        zone: localStorage.getItem("selectedZoneName") || "-",
        centre: localStorage.getItem("selectedCentreName") || "-",
        time: localStorage.getItem("selectedShiftName") || "-",
        seat: seat.seatNumber,
        mrp: localStorage.getItem("seatMRP") || 0,
        price: localStorage.getItem("finalPrice") || 0,
        discount: localStorage.getItem("discountAmount") || 0
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
}

/* Payment Page */
async function goPayment() {

    if (!selectedSeat) {
        alert("Please select a seat first");
        return;
    }

    const shiftId = localStorage.getItem("selectedShiftId");
  fetch("http://localhost:8087/api/shifts/section/" + localStorage.getItem("selectedSectionId"))
.then(res => res.json())
.then(shifts => {

    const shift = shifts.find(s => s.id == shiftId);

    if (shift && shift.coinLimitUsage) {
        localStorage.setItem("coinLimitUsage", shift.coinLimitUsage);
    }

});
    console.log("ShiftId:", shiftId);
console.log("SeatId:", selectedSeat);
   

    try {

console.log("Booking API call start");
const response = await fetch(
"http://localhost:8087/api/bookings?shiftId=" + shiftId +
"&seatId=" + selectedSeat +
"&studentId=" + localStorage.getItem("studentId"),
{
method: "POST"
}
);
console.log("Response:", response);

        if (!response.ok) {
            throw new Error("Booking failed");
        }

const booking = await response.json();

localStorage.setItem("bookingId", booking.id);

window.location.href = "payment.html";

    } catch (err) {
        alert(err.message);
    }
}