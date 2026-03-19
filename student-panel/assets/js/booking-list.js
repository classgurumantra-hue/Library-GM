let studentId = localStorage.getItem("studentId");

let container = document.getElementById("bookingList");

async function loadBookings(){

  let res = await fetch("http://localhost:8087/api/bookings/student/" + studentId);
  let bookings = await res.json();

  container.innerHTML = "";

  bookings.forEach(b => {

    let centre = b.shift.section.centre.centreName;
    let seat = b.seat.seatNumber;
    let date = new Date(b.bookingTime).toDateString();

    // Status logic
    let expiry = new Date(b.shift.expiryDate);
    let today = new Date();

    let status = today > expiry ? "Expired" : "Active";

    let commissionHTML = "";

    // ⭐ Vendor booking
if(b.vendorId !== null){

  commissionHTML = `
    <p>Total Price: ₹${b.amount}</p>
    <p>Commission: ₹${b.commission}</p>
    <p>Paid After Commission: ₹${b.vendorPayable}</p>
  `;

}
    else{

      commissionHTML = `
        <p>Total Paid: ₹${b.amount}</p>
      `;

    }

    container.innerHTML += `
      <div class="card">
        <h3>${centre}</h3>
        <p>Seat: ${seat}</p>
        <p>Date: ${date}</p>
        ${commissionHTML}
        <p class="${status === 'Active' ? 'status-active' : 'status-expired'}">${status}</p>
      </div>
    `;

  });

}

loadBookings();