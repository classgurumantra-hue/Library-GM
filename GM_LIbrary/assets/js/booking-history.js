let history = [
  { place:"GM Library", seat:"A12", date:"Jan 2026", amount:"₹1500", status:"Paid" },
  { place:"GM Library", seat:"B05", date:"Dec 2025", amount:"₹1500", status:"Paid" }
];

let table = document.getElementById("historyTable");

history.forEach(h => {
  table.innerHTML += `
    <tr>
      <td>${h.place}</td>
      <td>${h.seat}</td>
      <td>${h.date}</td>
      <td>${h.amount}</td>
      <td class="success">${h.status}</td>
    </tr>
  `;
});
