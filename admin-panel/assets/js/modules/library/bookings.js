async function loadBookings() {
  try {

    const response = await fetch("http://localhost:8087/api/bookings");
    const bookings = await response.json();

    const table = document.getElementById("bookingTableBody");

    if (!table) return;

    table.innerHTML = "";

    bookings.forEach((b) => {

      const student = b.student || {};
      const seat = b.seat || {};
      const shift = b.shift || {};
      const section = shift.section || {};
      const centre = section.centre || {};
      const zone = centre.zone || {};

      let status = "Pending";
      let statusColor = "warning";

      if (shift.expiryDate) {

        const today = new Date();
        const expiry = new Date(shift.expiryDate);

        if (expiry < today) {
          status = "Expired";
          statusColor = "danger";
        } else {
          status = "Active";
          statusColor = "success";
        }

      }

      const row = `
<tr>

<td id="student-${b.id}">Loading...</td>

<td>${student.mobile || "-"}</td>

<td>${student.email || "-"}</td>

<td>${zone.zoneName || "-"}</td>

<td>${centre.centreName || "-"}</td>

<td>${section.name || "-"}</td>

<td>${shift.startTime ? shift.startTime.substring(0,5) : "-"} - ${shift.endTime ? shift.endTime.substring(0,5) : "-"}</td>

<td>${seat.seatNumber || "-"}</td>

<td>${shift.startDate || "-"}</td>

<td>${shift.expiryDate || "-"}</td>

<td>
<span class="badge bg-${statusColor}">
${status}
</span>
</td>

<td>
<button class="btn btn-danger btn-sm"
onclick="removeBooking(${b.id})">
Remove
</button>
</td>

</tr>
`;

      table.innerHTML += row;
      // load student info
fetch("http://localhost:8087/api/auth/user/" + b.studentId)
.then(res => res.json())
.then(student => {

  const cell = document.getElementById("student-" + b.id);

  if(cell){
   cell.innerHTML = student.fullname;

const mobileCell = cell.parentElement.children[1];
const emailCell = cell.parentElement.children[2];

if(mobileCell) mobileCell.innerText = student.mobile;
if(emailCell) emailCell.innerText = student.email;
  }

});

    });

  } catch (e) {
    console.log("Booking load error", e);
  }
}

async function loadFilterZones() {
  const res = await fetch("http://localhost:8087/api/zones");
  const zones = await res.json();

  const zoneSelect = document.getElementById("filterZone");

  zoneSelect.innerHTML = `<option value="">All Zones</option>`;

  zones
    .filter((z) => !z.deleted)
    .forEach((z) => {
      zoneSelect.innerHTML += `<option value="${z.id}">${z.zoneName}</option>`;
    });
  zoneSelect.addEventListener("change", function () {
    loadFilterCentresByZone(this.value);
  });
}


async function applyBookingFilters() {
  alert("Filter button clicked");

  const zoneId = document.getElementById("filterZone")?.value;
  const centreId = document.getElementById("filterCentre")?.value;
  const sectionId = document.getElementById("filterSection")?.value;
  const shiftId = document.getElementById("filterShift")?.value;

  let url = "http://localhost:8087/api/bookings";

  if (shiftId) {
    url = `http://localhost:8087/api/bookings/shift/${shiftId}`;
  } else if (sectionId) {
    url = `http://localhost:8087/api/bookings/section/${sectionId}`;
  } else if (centreId) {
    url = `http://localhost:8087/api/bookings/centre/${centreId}`;
  } else if (zoneId) {
    url = `http://localhost:8087/api/bookings/zone/${zoneId}`;
  }

  try {
    const response = await fetch(url);
    const bookings = await response.json();

    const table = document.getElementById("bookingTableBody");
    table.innerHTML = "";

    bookings.forEach((b) => {
      const row = `
            <tr>
                <td>${b.id}</td>
                <td>${b.studentId}</td>
                <td>${b.seat ? b.seat.seatNumber : "-"}</td>
                <td>${b.paymentStatus}</td>
            </tr>
            `;

      table.innerHTML += row;
    });
  } catch (err) {
    console.log("Filter error", err);
  }
}


async function loadFilterCentresByZone(zoneId) {
  const response = await fetch(
    `http://localhost:8087/api/centres/zone/${zoneId}`,
  );
  const centres = await response.json();

  const centreSelect = document.getElementById("filterCentre");
  centreSelect.innerHTML = `<option value="">All Centres</option>`;

  centres.forEach((c) => {
    centreSelect.innerHTML += `<option value="${c.id}">${c.centreName}</option>`;
  });
  centreSelect.addEventListener("change", function () {
    loadSectionsByCentre(this.value);
  });
}


async function loadSectionsByCentre(centreId) {
  const response = await fetch(
    `http://localhost:8087/api/sections/centre/${centreId}`,
  );
  const sections = await response.json();

  const sectionSelect = document.getElementById("filterSection");
  sectionSelect.innerHTML = `<option value="">All Sections</option>`;

  sections.forEach((s) => {
    sectionSelect.innerHTML += `<option value="${s.id}">${s.name}</option>`;
  });
  sectionSelect.addEventListener("change", function () {
    loadShiftsBySection(this.value);
  });
}
async function loadShiftsBySection(sectionId) {
  const response = await fetch(
    `http://localhost:8087/api/shifts/section/${sectionId}`,
  );
  const shifts = await response.json();

  const shiftSelect = document.getElementById("filterShift");
  shiftSelect.innerHTML = `<option value="">All Shifts</option>`;

  shifts.forEach((sh) => {
    shiftSelect.innerHTML += `<option value="${sh.id}">${sh.name}</option>`;
  });
}
async function removeBooking(id){

  if(!confirm("Are you sure you want to remove this booking?")){
    return;
  }

  try{

    const res = await fetch("http://localhost:8087/api/bookings/" + id,{
      method:"DELETE"
    });

    const data = await res.json();

    alert(data.message);

    loadBookings();

  }catch(err){
    console.log("Remove booking error",err);
  }

}