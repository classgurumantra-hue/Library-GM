async function loadSeatsForSection(sectionId){

  if(!sectionId) return;

  try{

    const res = await fetch("http://localhost:8087/api/seats/section/" + sectionId);
    const seats = await res.json();

    const layout = document.getElementById("seatLayout");

    if(!layout) return;

    layout.innerHTML = "";

    layout.style.display = "grid";
    layout.style.gridTemplateColumns = "repeat(10, 60px)";
    layout.style.gap = "10px";
    layout.style.marginTop = "20px";

    const uniqueSeats = [];
    const seen = new Set();

    seats.forEach(seat => {

      if(seat.status !== "AVAILABLE") return;

      if(!seen.has(seat.seatNumber)){
        seen.add(seat.seatNumber);
        uniqueSeats.push(seat);
      }

    });

    uniqueSeats.forEach(seat => {

      const btn = document.createElement("button");

      btn.innerText = seat.seatNumber;

      btn.style.height = "50px";

      btn.className =
        "btn " +
        (seat.status === "AVAILABLE" ? "btn-success" : "btn-danger");

      btn.onclick = () => openManualBooking(seat);

      layout.appendChild(btn);

    });

  }catch(err){
    console.error("Seat load error", err);
  }

}


async function openManualBooking(seat){

  document.getElementById("selectedSeatNumber").innerText = seat.seatNumber;

  document.getElementById("selectedStudentId").innerText = window.selectedStudentId;

  window.selectedSeatId = seat.id;

  const res = await fetch("http://localhost:8087/api/shifts");
  const shifts = await res.json();

  const shiftSelect = document.getElementById("bookingShiftSelect");

  shiftSelect.innerHTML = '<option value="">Select Shift</option>';

  shifts.forEach(shift=>{
      const option = document.createElement("option");
      option.value = shift.id;
      option.textContent = shift.name + " (₹" + shift.price + ")";
      shiftSelect.appendChild(option);
  });

  const modal = new bootstrap.Modal(document.getElementById("manualBookingModal"));

  modal.show();

}


async function confirmManualBooking(){

  const shiftId = document.getElementById("bookingShiftSelect").value;
  const startDate = document.getElementById("bookingStartDate").value;

  if(!shiftId){
    alert("Select shift first");
    return;
  }

  if(!startDate){
    alert("Select start date");
    return;
  }

  try{

    const res = await fetch("http://localhost:8087/api/seats/manual-book",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        seatId: window.selectedSeatId,
        shiftId: shiftId,
        studentId: window.selectedStudentId,
        startDate: startDate
      })
    });

    if(!res.ok){
      alert("Booking failed");
      return;
    }

    alert("Seat booked successfully ✅");

    location.reload();

  }catch(err){
    console.error(err);
    alert("Booking error");
  }

}


async function openManualBooking(seat){

  console.log("Seat clicked:", seat);

  document.getElementById("selectedSeatNumber").innerText = seat.seatNumber;

  document.getElementById("selectedStudentId").innerText = window.selectedStudentId;

  window.selectedSeatId = seat.id;

  // shift load
  const res = await fetch("http://localhost:8087/api/shifts");
  const shifts = await res.json();

  const shiftSelect = document.getElementById("bookingShiftSelect");

  shiftSelect.innerHTML = '<option value="">Select Shift</option>';

  shifts.forEach(shift=>{
      const option = document.createElement("option");
      option.value = shift.id;
      option.textContent = shift.name + " (₹" + shift.price + ")";
      shiftSelect.appendChild(option);
  });

  const modal = new bootstrap.Modal(document.getElementById("manualBookingModal"));

  modal.show();

}


async function confirmManualBooking(){

  const shiftId = document.getElementById("bookingShiftSelect").value;
  const startDate = document.getElementById("bookingStartDate").value;

  if(!shiftId){
    alert("Select shift first");
    return;
  }

  if(!startDate){
    alert("Select start date");
    return;
  }

  try{

    const res = await fetch("http://localhost:8087/api/seats/manual-book",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        seatId: window.selectedSeatId,
        shiftId: shiftId,
        studentId: window.selectedStudentId,
        startDate: startDate
      })
    });

    if(!res.ok){
      alert("Booking failed");
      return;
    }

    alert("Seat booked successfully ✅");

    location.reload();

  }catch(err){
    console.error(err);
    alert("Booking error");
  }

}

async function bookSeat(seatId) {
  if (!confirm("Book this seat?")) return;

  try {
    const res = await fetch("http://localhost:8087/api/seats/book/" + seatId, {
      method: "POST",
    });

    if (!res.ok) {
      alert("Seat booking failed");
      return;
    }

    alert("Seat booked successfully ✅");
  } catch (e) {
    alert("Booking error");
  }
}
