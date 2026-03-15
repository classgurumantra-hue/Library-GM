
async function loadBookings() {
  try {
    const response = await fetch("http://localhost:8087/api/bookings");
    const bookings = await response.json();

    const table = document.getElementById("bookingTableBody");

    if (!table) return;

    table.innerHTML = "";

    bookings.forEach((b) => {
      let statusColor =
        b.paymentStatus === "SUCCESS"
          ? "success"
          : b.paymentStatus === "PENDING"
            ? "warning"
            : "secondary";

      let row = `
<tr>
    <td>${b.id}</td>
    <td>${b.studentId}</td>
    <td>${b.seat ? b.seat.seatNumber : "-"}</td>
    <td><span class="badge bg-${statusColor}">${b.paymentStatus}</span></td>
</tr>
`;

      table.innerHTML += row;
    });
  } catch (e) {
    console.log("Booking load error", e);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  loadBookings();
});


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
