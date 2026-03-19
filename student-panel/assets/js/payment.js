let basePrice = 0;
async function loadPrice(){

const shiftId = localStorage.getItem("selectedShiftId");

const res = await fetch("http://localhost:8087/api/shifts/" + shiftId);
const shift = await res.json();

console.log("SHIFT FROM API:", shift);

const mrp = shift.mrp;
const price = shift.price;

document.getElementById("mrp").innerText = mrp;
document.getElementById("price").innerText = price;

document.getElementById("subtotal").innerText = price;

const total = price + 30;

document.getElementById("payAmount").innerText = total;

}

document.addEventListener("DOMContentLoaded", async function () {
  
  const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
  console.log("BOOKING DATA:", bookingData);
  const role = localStorage.getItem("role");

if(role === "VENDOR" && (!bookingData || Object.keys(bookingData).length === 0)){
    window.location.href = "seats.html";
}

let shiftId =
    bookingData.shiftId ||
    localStorage.getItem("selectedShiftId");

if (!shiftId || shiftId === "null" || shiftId === "undefined") {
    shiftId = localStorage.getItem("selectedShiftId");
}

if (!shiftId) {
    alert("Shift missing. Please select seat again.");
    window.location.href = "seats.html";
    return;
}
const userId =
    localStorage.getItem("studentId") ||
    localStorage.getItem("vendorStudentId") ||
    localStorage.getItem("vendorId");
const centreId =
    bookingData.centreId ||
    localStorage.getItem("selectedCentreId");

    console.log("PAYMENT PARAMS:", shiftId, userId, centreId);

fetch(
"http://localhost:8087/api/payments/calculate" +
"?shiftId=" + shiftId +
"&userId=" + userId +
"&centreId=" + centreId +
"&gender=MALE",
{ method: "POST" }
)
.then(res => res.json())
.then(data => {

const mrp = data.shiftMrp || data.shiftPrice || 0;
const price = data.shiftPrice || 0;
const subtotal = price;

const coupon = data.couponDiscount || 0;

console.log("LOCAL STORAGE BOOKING DATA:", localStorage.getItem("bookingData"));
const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
const coins = Number(bookingData.coinUsed || 0);

const commission = subtotal * 0.10;
const vendorPayable = subtotal - commission;

// student pays after commission cut
let payable = vendorPayable;


basePrice = subtotal;

document.getElementById("subtotalAmount").innerText = subtotal;
document.getElementById("couponAmount").innerText = coupon;
document.getElementById("coinAmount").innerText = coins;

document.getElementById("commissionAmount").innerText = commission.toFixed(2);
document.getElementById("vendorPayableAmount").innerText = vendorPayable.toFixed(2);

document.getElementById("payableAmount").innerText = payable;
document.getElementById("payAmount").innerText = payable;

})
.catch(err=>{
console.log(err);
});

  let bookingId = localStorage.getItem("bookingId");

  // ⭐ Vendor booking create if not exists

if(role === "VENDOR" && !bookingId){

const seatId = bookingData.seatId;
const vendorId = localStorage.getItem("vendorId");

try{

const res = await fetch(
"http://localhost:8087/api/bookings/vendor"
+ "?shiftId=" + shiftId
+ "&seatId=" + seatId
+ "&studentId=" + userId
+ "&vendorId=" + vendorId,
{ method:"POST" }
);

const booking = await res.json();

bookingId = booking.id || booking.bookingId;

localStorage.setItem("bookingId", bookingId);

console.log("BOOKING ID SAVED:", bookingId);
bookingId = booking.id;

console.log("Vendor booking created:", booking.id);

}catch(err){
console.log(err);
alert("Vendor booking failed");
}

}
  

  const sub = document.querySelector(".sub");
  const summary = document.querySelector(".booking-summary");

  if (bookingData.seat) {
    sub.innerText = `Seat reserved for ${bookingData.seat}`;
  }

  if (summary) {
    summary.innerHTML = `
            <span>Zone</span><span>${bookingData.zone || "-"}</span>
            <span>Centre</span><span>${bookingData.centre || "-"}</span>
            <span>Time</span><span>${bookingData.time || "-"}</span>
            <span>Seat</span><span>${bookingData.seat || "-"}</span>
            `;
  }

  const payBtn = document.querySelector(".pay-btn");

  if (payBtn) {
   payBtn.onclick = async function () {

 const payable = Math.round(Number(document.getElementById("payAmount").innerText));
 const amount = payable;
      if (!bookingId) {
        alert("Booking ID missing!");
        return;
      }

      try {
        // 1️⃣ Create order from backend
        

       console.log("PAYABLE SENT TO BACKEND:", payable);

const orderResponse = await fetch(
  "http://localhost:8087/api/payments/create-order?amount=" + payable,
  { method: "POST" }
);

        const orderText = await orderResponse.text();
        const order = JSON.parse(orderText);

        // 2️⃣ Razorpay options
        const options = {
          key: "rzp_test_SNE9rQ7TRmA6PN",
          amount: order.amount,
          display_amount: payable,
          currency: "INR",
          name: "GM Library",
          description: "Seat Booking Payment",
          order_id: order.id,

          handler: async function (response) {
            console.log("PAYMENT SUCCESS", response);

            // 3️⃣ Save payment in backend
            await fetch(
              "http://localhost:8087/api/payments/create?bookingId=" +
                bookingId +
                "&razorpayOrderId=" +
                response.razorpay_order_id,
              { method: "POST" },
            );

            alert("Payment Successful!");

            localStorage.removeItem("selectedSeat");
            localStorage.removeItem("bookingId");
            localStorage.removeItem("bookingData");

            window.location.href = "success.html";
          },
        };

        // 4️⃣ Open Razorpay popup
        console.log("OPENING RAZORPAY");
        const rzp = new Razorpay(options);
        rzp.open();
      } catch (err) {
        console.log(err);
        alert("Payment failed: " + err);
      }
    };
  }
});
async function applyCoupon(){

const code = document.getElementById("couponCode").value;

if(!code){
alert("Enter coupon code");
return;
}

const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
console.log("BOOKING DATA PAYMENT PAGE:", bookingData);

if(!bookingData || Object.keys(bookingData).length === 0){
    alert("Booking data missing. Please select seat again.");
}
const shiftId =
  bookingData.shiftId ||
  localStorage.getItem("selectedShiftId");

const userId =
  localStorage.getItem("studentId") ||
  localStorage.getItem("vendorStudentId");

const centreId =
  bookingData.centreId ||
  localStorage.getItem("selectedCentreId");

console.log("PAYMENT PARAMS:", {
  shiftId,
  userId,
  centreId
});

try{

const response = await fetch(
"http://localhost:8087/api/coupons/validate?code="+code+
"&price="+basePrice+
"&centreId="+centreId+
"&gender=MALE",
{ method:"POST" }
);

if(!response.ok){
alert("Coupon expired or invalid");
return;
}

const discount = Number(await response.text());

document.getElementById("couponAmount").innerText = discount;

let coins = Number(document.getElementById("coinAmount").innerText || 0);
payableAmount = basePrice - discount - coins;

document.getElementById("payableAmount").innerText = payableAmount;

document.getElementById("payAmount").innerText = payableAmount;

alert("Coupon applied");

}catch(err){

alert("Invalid coupon");

}

}

const coinInput = document.querySelector(".coin-box input[type='number']");
coinInput.addEventListener("input", applyCoins);
document.querySelectorAll("input[name='coin']").forEach(r => r.addEventListener("change", applyCoins));
const coinRadios = document.querySelectorAll("input[name='coin']");

coinRadios.forEach(radio=>{
radio.addEventListener("change", ()=>{

if(radio.value === "Yes" || radio.checked && radio.parentElement.innerText.trim() === "Yes"){

let coins = Number(coinInput.value || 0);

document.getElementById("coinAmount").innerText = coins;
let afterCoupon = Number(document.getElementById("payableAmount").innerText);
payableAmount = afterCoupon - coins;

document.getElementById("payableAmount").innerText = payableAmount;

document.getElementById("payAmount").innerText = payableAmount;

}

});
});

function applyCoins(){

const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
let price = basePrice - Number(document.getElementById("couponAmount").innerText || 0);

let coins = Number(document.getElementById("coinInput").value || 0);

const coinLimit = Number(localStorage.getItem("coinLimitUsage") || 0);

// coin limit check
if (coinLimit && coins > coinLimit) {
    coins = coinLimit;
}

// price se zyada coin allowed nahi
let maxPrice = (bookingData.finalPrice || bookingData.price);

if(coins > maxPrice){
    coins = maxPrice;
}

document.getElementById("coinInput").value = coins;

document.getElementById("coinAmount").innerText = coins;

let payable = (bookingData.finalPrice || bookingData.price) - coins;

// minimum ₹1 payment rule
if(payable < 1){
    payable = 1;
}

document.getElementById("payableAmount").innerText = payable;
document.getElementById("payAmount").innerText = payable;

}
