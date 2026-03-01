let selectedSeat = null;

const seatsDiv = document.getElementById("seats");
const info = document.getElementById("info");

const shiftName = localStorage.getItem("selectedShiftName");

if(shiftName){
    document.getElementById("info").innerText = "Shift: " + shiftName;
}

/* Shift ID from localStorage */
const shiftId = localStorage.getItem("selectedShiftId");

console.log("Shift ID:", shiftId);

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
                seatDiv.onclick = () => selectSeat(seatDiv, seat.seatNumber);
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
function selectSeat(el, seatNo) {

    document.querySelectorAll(".seat")
    .forEach(s => s.classList.remove("selected"));

    el.classList.add("selected");

    selectedSeat = seatNo;

    localStorage.setItem("selectedSeat", seatNo);

    const bookingData = {
        zone: localStorage.getItem("selectedZoneName") || "-",
        centre: localStorage.getItem("selectedCentreName") || "-",
        time: localStorage.getItem("selectedShiftName") || "-",
        seat: seatNo,
        mrp: localStorage.getItem("seatMRP") || 0,
        price: localStorage.getItem("finalPrice") || 0,
        discount: localStorage.getItem("discountAmount") || 0
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
}

/* Payment Page */
function goPayment() {

    if (!selectedSeat) {
        alert("Please select a seat first");
        return;
    }

    const bookingData = {
        zone: localStorage.getItem("selectedZoneName") || "-",
        centre: localStorage.getItem("selectedCentreName") || "-",
        time: localStorage.getItem("selectedShiftName") || "-",
        seat: selectedSeat,
        mrp: localStorage.getItem("seatMRP") || 0,
        price: localStorage.getItem("finalPrice") || 0,
        discount: localStorage.getItem("discountAmount") || 0
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    window.location.href = "payment.html";
}

window.addEventListener("DOMContentLoaded", function () {

    const payBtn = document.querySelector(".proceed-payment");

    if (payBtn) {
        payBtn.onclick = function () {
            goPayment();
        };
    }

});