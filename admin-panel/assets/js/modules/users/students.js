async function loadStudents() {

  const res = await fetch("http://localhost:8087/api/auth/role/STUDENT");
  const students = await res.json();

  const table = document.getElementById("studentsTable");

  table.innerHTML = "";

  students.forEach((student) => {

    if (student.role !== "STUDENT") return;

    const row = `
      <tr>

        <td class="fw-bold">${student.fullname}</td>

        <td>${student.email}</td>

        <td>${student.mobile || "-"}</td>

       <td>${student.createdAt ? new Date(student.createdAt).toLocaleDateString("en-GB") : "-"}</td>

        <td>
          <span class="badge bg-success-subtle text-success px-3">
            ${student.walletCoins}
          </span>
        </td>

        <td>
${student.blocked
  ? '<span class="badge bg-danger">Blocked</span>'
  : '<span class="badge bg-success">Active</span>'}
</td>

        <td>
          <button class="btn btn-light btn-sm border"
          onclick="showHistory(${student.id})">
          <i class="bi bi-clock-history"></i>
          </button>
        </td>

        <td>

          <div class="d-flex gap-2">

            <button class="btn btn-light btn-sm"
onclick="openSeat(${student.id})" title="Seat">
<i class="bi bi-person-workspace text-danger"></i>
</button>

<button class="btn btn-warning btn-sm fw-bold"
onclick="blockStudent(${student.id})">
${student.blocked ? "Unblock" : "Block"}
</button>

          </div>

        </td>

      </tr>
    `;

    table.innerHTML += row;

  });

}

async function blockStudent(studentId){

  if(!confirm("Change student status?")){
    return;
  }

  try{

    const res = await fetch(
      "http://localhost:8087/api/auth/block/" + studentId,
      {
        method:"PUT"
      }
    );

    const data = await res.json();

    alert(data.message);

    loadStudents();

  }catch(err){
    console.error(err);
    alert("Status update failed");
  }

}

async function openSeat(studentId) {

  window.selectedStudentId = studentId;

  render("seats");

}

async function blockStudent(studentId){

  if(!confirm("Change student status?")){
    return;
  }

  try{

    const res = await fetch(
      "http://localhost:8087/api/auth/block/" + studentId,
      {
        method:"PUT"
      }
    );

    const data = await res.json();

    alert(data.message);

    // reload students
    loadStudents();

  }catch(err){
    console.error(err);
    alert("Status update failed");
  }

}

async function openSeat(studentId) {
  window.selectedStudentId = studentId;

  render("seats");
}

async function showHistory(studentId) {

  try {

    let res = await fetch("http://localhost:8087/api/bookings/student/" + studentId);
    let data = await res.json();

    const table = document.getElementById("historyTable");

   if (!data || data.length === 0) {
  alert("No bookings found for this student");
  return;
}

    table.innerHTML = "";
   data = data.filter(b => b.paymentStatus === "SUCCESS");

    data.forEach(b => {

      let seat = b.seat ? b.seat.seatNumber : "-";
      let shift = b.shift ? b.shift.name : "-";
      let status = b.paymentStatus || "-";
      let amount = b.amount || "-";
      let time = b.bookingTime ? b.bookingTime.replace("T"," ").substring(0,19) : "-";

      table.innerHTML += `
        <tr>
          <td>${seat}</td>
          <td>${shift}</td>
          <td>${status}</td>
          <td>${amount}</td>
          <td>${time}</td>
        </tr>
      `;
    });

    const modal = new bootstrap.Modal(document.getElementById("historyModal"));
    modal.show();

  } catch (err) {
    alert("Failed to load history");
  }

}

async function openSeat(studentId) {

  window.selectedStudentId = studentId;

  render("seats");

}

async function blockStudent(studentId){

  if(!confirm("Change student status?")){
    return;
  }

  try{

    const res = await fetch(
      "http://localhost:8087/api/auth/block/" + studentId,
      {
        method:"PUT"
      }
    );

    const data = await res.json();

    alert(data.message);

    loadStudents();

  }catch(err){
    console.error(err);
    alert("Status update failed");
  }

}