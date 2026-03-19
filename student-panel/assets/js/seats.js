let selectedSeat = null;
let selectedDuration = null;

let basePrice = 0;
let currentPrice = 0;

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


if (!shiftId || shiftId === "null" || shiftId === "undefined") {
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
localStorage.setItem("selectedSeatId", seat.id);
localStorage.setItem("seatNumber", seat.seatNumber);

    
}

/* Payment Page */
async function goPayment() {

    const selectedSeat = localStorage.getItem("seatNumber");
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

        const role = localStorage.getItem("role");
if(role === "VENDOR"){

    const email = localStorage.getItem("vendorStudentEmail");
    localStorage.setItem("vendorStudentId", localStorage.getItem("studentId"));

    const vendor = localStorage.getItem("vendorName") || "-";

    const zone = localStorage.getItem("selectedZoneName") || "-";
    const centre = localStorage.getItem("selectedCentreName") || "-";
    const section = localStorage.getItem("selectedSectionName") || "-";
    const shift = localStorage.getItem("selectedShiftName") || "-";
    const seat = localStorage.getItem("seatNumber") || "-";

const centreId = localStorage.getItem("selectedCentreId");
const shiftId = localStorage.getItem("selectedShiftId");
const seatId = localStorage.getItem("selectedSeatId");

const url =
"http://localhost:8087/api/auth/send-admission-verification"
+ "?studentEmail=" + encodeURIComponent(email)
+ "&vendorName=" + encodeURIComponent(vendor)
+ "&zone=" + encodeURIComponent(zone)
+ "&centre=" + encodeURIComponent(centre)
+ "&section=" + encodeURIComponent(section)
+ "&shift=" + encodeURIComponent(shift)
+ "&seat=" + encodeURIComponent(seat)
+ "&centreId=" + centreId
+ "&shiftId=" + shiftId
+ "&seatId=" + seatId
+ "&studentId=" + localStorage.getItem("studentId");

    fetch(url);

    alert("Verification email sent to student.");

    // ⭐ IMPORTANT

    return;
}
console.log("Booking API call start");
const coins = localStorage.getItem("coinUsed") || 0;

const response = await fetch(
"http://localhost:8087/api/bookings?shiftId=" + shiftId +
"&seatId=" + localStorage.getItem("selectedSeatId") +
"&studentId=" + localStorage.getItem("studentId") +
"&coinUsed=" + coins,
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


async function loadUserCoins(){

    const userId = localStorage.getItem("studentId");

    if(!userId) return;

    try{

        const res = await fetch("http://localhost:8087/api/bookings/student/" + userId);
        const data = await res.json();

        console.log("USER BOOKING DATA:", data);

        let coins = 0;

        if(data && data.length > 0){
            coins = data[data.length - 1].student.walletCoins || 0;
        }

        localStorage.setItem("walletCoins", coins);

        document.getElementById("availableCoins").innerText = coins;

        console.log("FINAL COINS:", coins);

    }catch(err){
        console.log(err);
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

document.getElementById("shiftDuration").innerText = "Not Selected";

document.getElementById("shiftPrice").innerText = shift.price;
document.getElementById("availableCoins").innerText = localStorage.getItem("walletCoins") || 0;

/* discount UI only */

document.getElementById("d90").innerText =
shift.discount90Days ? shift.discount90Days : 0;

document.getElementById("d180").innerText =
shift.discount180Days ? shift.discount180Days : 0;

document.getElementById("d270").innerText =
shift.discount270Days ? shift.discount270Days : 0;

document.getElementById("d360").innerText =
shift.discount360Days ? shift.discount360Days : 0;

basePrice = Number(shift.mrp || shift.price);
currentPrice = Number(shift.price || shift.mrp);
console.log("BASE PRICE:", basePrice);
console.log("CURRENT PRICE:", currentPrice);
document.getElementById("totalPrice").innerText = currentPrice;

}catch(err){

console.log(err);

}
}
function openPackage(){

    document.getElementById("packageModal").style.display = "flex";

    loadShiftDetails();
    loadUserCoins();   // ⭐ ADD THIS LINE

}
function selectDuration(days){

selectedDuration = days;

console.log("Selected Duration:", days);
document.getElementById("shiftDuration").innerText = days + " Days";

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
currentPrice = price;

let total = price + 30; // admission fee

document.getElementById("totalPrice").innerText = total;

document.getElementById("couponPrice").innerText = 0;
document.getElementById("coinPrice").innerText = 0;
document.getElementById("coinInput").value = "";
document.getElementById("couponCode").value = "";

}

async function applyCoupon(){

const code = document.getElementById("couponCode").value;

if(!code){
alert("Enter coupon code");
return;
}

const centreId = localStorage.getItem("selectedCentreId");

try{

const response = await fetch(
`http://localhost:8087/api/coupons/validate?code=${code}&price=${currentPrice}&centreId=${centreId}&gender=MALE&userType=${localStorage.getItem("role")}`,
{ method:"POST" }
);

const data = await response.json();

if(!response.ok){
alert(data.message);
return;
}

const discount = Number(data.discount || 0);

document.getElementById("couponPrice").innerText = discount;

let total = currentPrice - discount + 30;

document.getElementById("totalPrice").innerText = total;

alert("Coupon applied");

}catch(err){

console.log(err);
alert("Coupon error");

}
}

document.getElementById("coinInput").addEventListener("input", applyCoins);

console.log("COIN DEBUG:", {
  inputCoins: document.getElementById("coinInput").value,
  available: document.getElementById("availableCoins").innerText,
  basePrice: basePrice,
  currentPrice: currentPrice
});

function applyCoins(){

let coins = Number(document.getElementById("coinInput").value);

let available = Number(localStorage.getItem("walletCoins") || 0);

let maxAllowed = Number(localStorage.getItem("coinLimitUsage") || 0);

if(coins > maxAllowed){
coins = maxAllowed;
}

if(coins > available){
coins = available;
}

const coinEl = document.getElementById("coinPrice");

if(coinEl){
    coinEl.innerText = coins;
}

let remaining = available - coins;
const afterEl = document.getElementById("afterCoins");

if(afterEl){
    afterEl.innerText = remaining;
}

let coupon = Number(document.getElementById("couponPrice").innerText);

let base = Number(document.getElementById("shiftPrice").innerText || 0);

let total = base - coupon - coins + 30;

if(total < 0){
total = 0;
}

const totalEl = document.getElementById("totalPrice");

if(totalEl){
    totalEl.innerText = total;
}

}


function checkSeat(){

if(!selectedSeat){
alert("Please select a seat first");
return;
}

openPackage();

}
let purchaseProcessing = false;
async function purchaseSeat(){

console.log("PURCHASE BUTTON CLICKED");
 console.log("centreId:", localStorage.getItem("selectedCentreId"));
console.log("shiftId:", localStorage.getItem("selectedShiftId"));
console.log("studentId:", localStorage.getItem("studentId"));

    // ⭐ double click prevent
const btn = document.querySelector(".purchase-btn");
btn.disabled = true;
const shiftId = localStorage.getItem("selectedShiftId");


const res = await fetch("http://localhost:8087/api/shifts/" + shiftId);
const shift = await res.json();
console.log("SHIFT DATA:", shift);  


let coupon = Number(document.getElementById("couponPrice").innerText || 0);
let coins = Number(document.getElementById("coinInput").value || 0);

let total = currentPrice - coupon - coins + 30;

if(total < 0){
    total = 0;
}


const bookingData = {
    zone: localStorage.getItem("selectedZoneName"),
    centre: localStorage.getItem("selectedCentreName"),
    centreId: localStorage.getItem("selectedCentreId"),

    shiftId: localStorage.getItem("selectedShiftId"),
    seatId: localStorage.getItem("selectedSeatId"),

    time: localStorage.getItem("selectedShiftName"),
    seat: localStorage.getItem("seatNumber"),

    mrp: shift.mrp || shift.price,
    price: shift.price,
    finalPrice: total,

    couponDiscount: coupon,
    coinUsed: coins
    
};
localStorage.setItem("coinUsed", coins);

console.log("BOOKING DATA CREATED:", bookingData);
localStorage.setItem("coinUsed", coins);
localStorage.setItem("bookingData", JSON.stringify(bookingData));


localStorage.setItem("finalPayable", total);

goPayment();

}
