let studentId = localStorage.getItem("studentId");

let table = document.getElementById("historyTable");

async function loadHistory(){

  let res = await fetch("http://localhost:8087/api/bookings/student/" + studentId);
  let bookings = await res.json();

  table.innerHTML = "";

  bookings.forEach(b => {

    let centre = b.shift.section.centre.centreName;
    let seat = b.seat.seatNumber;
    let date = new Date(b.bookingTime).toDateString();
    let amount = "₹" + b.amount;
    let status = b.paymentStatus;

    table.innerHTML += `
      <tr>
        <td>${centre}</td>
        <td>${seat}</td>
        <td>${date}</td>
        <td>${amount}</td>
       <td class="status-${status.toLowerCase()}">${status}</td>
      </tr>
    `;
  });

}

loadHistory();

