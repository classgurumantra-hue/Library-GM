// Get seat and shift from previous page
const seat = localStorage.getItem("seat") || "A1";
const shift = localStorage.getItem("shift") || "Morning";

// Update UI
document.querySelector(".sub").innerText = `Seat reserved for ${seat} (${shift} Shift)`;

// Payment method selection
document.querySelectorAll(".method").forEach(el => {
  el.onclick = () => {
    document.querySelectorAll(".method").forEach(m => m.classList.remove("active"));
    el.classList.add("active");
  };
});

// Payment button
document.querySelector(".pay-btn").onclick = async function makePayment() {
  const activeMethod = document.querySelector(".method.active").innerText || "UPI";
  const amount = 1350; // You can dynamically calculate this if needed

  // Build payment object
  const payment = {
    method: activeMethod,
    amount: amount
  };

  // Show processing
  this.innerText = "Processing...";

  try {
    const response = await fetch(`http://localhost:8080/api/payments/${seat}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payment)
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Payment failed! Seat may be already booked.");
    }

    const data = await response.json();
    alert(`Payment Successful! Seat ${seat} booked.`);

    // Redirect to success page
    window.location.href = "success.html";

  } catch (error) {
    alert(error.message);
    this.innerText = `Pay ₹${amount}`;
  }
};