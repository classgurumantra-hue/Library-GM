document.addEventListener("DOMContentLoaded", function () {

    const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");

    const bookingId = localStorage.getItem("bookingId");

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
            <span>MRP</span><span>₹${bookingData.mrp || 0}</span>
            <span>Price</span><span>₹${bookingData.price || 0}</span>
            <span>Discount</span><span class="green">-₹${bookingData.discount || 0}</span>
        `;
    }

    const payBtn = document.querySelector(".pay-btn");

    if (payBtn) {

        payBtn.onclick = async function () {

            if (!bookingId) {
                alert("Booking ID missing!");
                return;
            }

            this.innerText = "Processing...";

            try {

                const response = await fetch(
                    "http://localhost:8087/api/payments/" + bookingId,
                    {
                        method: "POST"
                    }
                );

                if (!response.ok) {
                    throw new Error("Payment failed");
                }

                alert("Payment Successful!");

                localStorage.removeItem("selectedSeat");
                localStorage.removeItem("bookingId");
                localStorage.removeItem("bookingData");

                window.location.href = "success.html";

            } catch (err) {
                alert(err.message);
            }

            this.innerText = "Pay Now";
        };
    }

});