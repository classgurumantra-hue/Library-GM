let selectedSeat = null;
let selectedDuration = null;

let basePrice = 0;

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
    centreId: localStorage.getItem("centreId") || 0,
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
async function loadShiftDetails(){

const shiftId = localStorage.getItem("selectedShiftId");

if(!shiftId){
console.log("Shift id missing");
return;
}

try{

const res = await fetch("http://localhost:8087/api/shifts/" + shiftId);

const shift = await res.json();

console.log("SHIFT DATA", shift);

document.getElementById("shiftName").innerText = shift.name;

document.getElementById("shiftStart").innerText = shift.startTime;

document.getElementById("shiftDuration").innerText = "Custom Package";

document.getElementById("shiftPrice").innerText = shift.price;
document.getElementById("availableCoins").innerText = shift.coinLimitUsage;

/* discount UI only */

document.getElementById("d90").innerText =
shift.discount90Days ? shift.discount90Days : 0;

document.getElementById("d180").innerText =
shift.discount180Days ? shift.discount180Days : 0;

document.getElementById("d270").innerText =
shift.discount270Days ? shift.discount270Days : 0;

document.getElementById("d360").innerText =
shift.discount360Days ? shift.discount360Days : 0;

basePrice = shift.price;

}catch(err){

console.log(err);

}
}
function openPackage(){

document.getElementById("packageModal").style.display = "flex";

loadShiftDetails();

}
function selectDuration(days){

selectedDuration = days;

console.log("Selected Duration:", days);

localStorage.setItem("selectedDuration", days);

/* remove old highlight */

document.querySelectorAll(".duration-buttons button")
.forEach(btn => btn.classList.remove("active-duration"));

/* highlight selected */

document.querySelectorAll(".duration-buttons button")
.forEach(btn => {
if(btn.innerText == days){
btn.classList.add("active-duration");
}
});

/* price calculation */

let price = (basePrice / 30) * days;

document.getElementById("totalPrice").innerText = price;

document.getElementById("couponPrice").innerText = 0;
document.getElementById("coinPrice").innerText = 0;
document.getElementById("coinInput").value = "";
document.getElementById("couponCode").value = "";
document.getElementById("totalPrice").innerText = price + 30;

}

async function applyCoupon(){

const code = document.getElementById("couponCode").value;

if(!code){
alert("Enter coupon code");
return;
}

const centreId = localStorage.getItem("centreId");

try{

const response = await fetch(
"http://localhost:8087/api/coupons/validate?code="+code+
"&price="+document.getElementById("totalPrice").innerText+
"&centreId="+centreId+
"&gender=MALE",
{ method:"POST" }
);

if(!response.ok){
alert("Invalid or expired coupon");
return;
}

const discount = Number(await response.text());

document.getElementById("couponPrice").innerText = discount;

let total = basePrice - discount + 30;

document.getElementById("totalPrice").innerText = total;

alert("Coupon applied");

}catch(err){

console.log(err);
alert("Coupon error");

}
}

document.getElementById("coinInput").addEventListener("input", applyCoins);

function applyCoins(){

let coins = Number(document.getElementById("coinInput").value);

let available = Number(document.getElementById("availableCoins").innerText);

let maxAllowed = basePrice * 0.30;

if(coins > maxAllowed){
coins = maxAllowed;
}

if(coins > available){
coins = available;
}

document.getElementById("coinPrice").innerText = coins;

let coupon = Number(document.getElementById("couponPrice").innerText);

let total = basePrice - coupon - coins + 30;

if(total < 0){
total = 0;
}

document.getElementById("totalPrice").innerText = total;

}

function checkSeat(){

if(!selectedSeat){
alert("Please select a seat first");
return;
}

openPackage();

}

function purchaseSeat(){

let duration = selectedDuration || 30;

let coupon = Number(document.getElementById("couponPrice").innerText);
let coins = Number(document.getElementById("coinPrice").innerText);
let total = Number(document.getElementById("totalPrice").innerText);

let bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");

bookingData.duration = duration;
bookingData.couponDiscount = coupon;
bookingData.coinUsed = coins;
bookingData.finalPrice = total;

localStorage.setItem("bookingData", JSON.stringify(bookingData));

localStorage.setItem("finalPayable", total);

window.location.href = "payment.html";

}