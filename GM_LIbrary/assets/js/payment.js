// seat from previous page
const seat = localStorage.getItem("selectedSeat") || "A1";
document.getElementById("seatName").innerText = seat;
document.getElementById("seatBox").innerText = seat;

function selectMethod(el) {
  document.querySelectorAll(".method").forEach(m => m.classList.remove("active"));
  el.classList.add("active");
}

function makePayment() {
  document.querySelector(".pay-btn").innerText = "Processing...";
  
  setTimeout(() => {
    alert("Payment Successful! Seat " + seat + " booked.");
    window.location.href = "success.html";
  }, 1800);
}
