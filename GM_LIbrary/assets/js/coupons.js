const coupons = [
  {
    title: "Discount Coupon",
    valid: "20 Feb 2026"
  },
  {
    title: "Test Series Coupon",
    valid: "10 Mar 2026"
  },
  {
    title: "Library Membership Coupon",
    valid: "05 Apr 2026"
  }
];

const container = document.getElementById("couponContainer");

coupons.forEach(c => {
  const card = document.createElement("div");
  card.className = "coupon-card";

  card.innerHTML = `
    <div class="coupon-left">
      <h3>${c.title}</h3>
      <p>Valid till: ${c.valid}</p>
    </div>
    <div class="coupon-right">
      <button onclick="viewHistory('${c.title}')">View History</button>
    </div>
  `;

  container.appendChild(card);
});

function viewHistory(title){
  alert("History for: " + title);
}
