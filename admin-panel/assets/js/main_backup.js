document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("header-toggle");
  const body = document.body;

  // Sidebar Toggle for Mobile
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("toggled");
  }

  // Menu Active Link Handler
  const currentPath = window.location.pathname;
  document.querySelectorAll(".sub-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes(currentPath)) {
      link.classList.add("text-white", "fw-bold");
    }

function toggleSidebar() {
  document.getElementById("appBody").classList.toggle("toggled");
}

function toggleDrop(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "none" ? "block" : "none";
}

function tglE(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
function showOTP(id) {
  alert("Demo OTP: 2026");
  document.getElementById(id).style.display = "block";
}
function vOTP(bId, iId) {
  if (document.getElementById(iId).value === "2026") {
    alert("Verified Successfully! ✅");
    document.getElementById(bId).style.display = "none";
  } else {
    alert("Wrong OTP!");
  }
}
function save() {
  alert("Updated! ✅");
  document
    .querySelectorAll(".edit-box")
    .forEach((b) => (b.style.display = "none"));
}
function eye(id) {
  const f = document.getElementById(id);
  const i = f.nextElementSibling.querySelector("i");
  if (f.type === "password") {
    f.type = "text";
    i.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    f.type = "password";
    i.classList.replace("bi-eye-slash", "bi-eye");
  }
}

// Default Load
render("students");

// ============ Library =========

function toggleSidebar() {
  document.getElementById("appBody").classList.toggle("toggled");
}

function toggleDrop(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "none" ? "block" : "none";
}

async function showHistory(studentId) {
  try {
    const res = await fetch(
      "http://localhost:8087/api/bookings/student/" + studentId,
    );
    const bookings = await res.json();

    if (!bookings || bookings.length === 0) {
      alert("No booking history found");
      return;
    }

    let text = "";

    bookings.forEach((b) => {
      text +=
        "Seat: " +
        b.seat.seatNumber +
        " | Shift: " +
        b.shift.name +
        " | Status: " +
        b.paymentStatus +
        " | Time: " +
        b.bookingTime +
        "\n";

    alert(text);
  } catch (err) {
    alert("Error loading history");
  }
}

function render(page) {
  const root = document.getElementById("mainContent");
  document
    .querySelectorAll(".sub-link")
    .forEach((l) => l.classList.remove("active"));
  if (document.getElementById(`l-${page}`))
    document.getElementById(`l-${page}`).classList.add("active");
  if (
    window.innerWidth <= 992 &&
    document.getElementById("appBody").classList.contains("toggled")
  )
    toggleSidebar();

  if (page === "students") {
    const root = document.getElementById("mainContent");

    root.innerHTML = `
  <div class="card-pro">
    <h4 class="fw-bold mb-4">Register Student List</h4>

    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Reg. Date</th>
            <th>Coins</th>
            <th>History</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody id="studentsTable">
          <tr>
            <td colspan="7" class="text-center">Loading students...</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
  `;

    loadStudents();
  } else if (page === "seats") {
    const root = document.getElementById("mainContent");

    root.innerHTML = `
  <div class="card-pro">

    <h4 class="fw-bold mb-4">Seat Booking</h4>

    <div class="row g-3 mb-4">

      <div class="col-md-4">
        <label class="form-label">Zone</label>
        <select id="seatZoneSelect" class="form-select" onchange="loadCentresForSeatBooking(this.value)">
          <option value="">Loading zones...</option>
        </select>
      </div>
        <div class="col-md-4">
          <label class="form-label">Centre</label>
          <select id="seatCentreSelect" class="form-select">
            <option value="">Select Centre</option>
          </select>
        </div>

    </div>

    <div id="seatLayout"></div>

  </div>
  `;

    // zones load
      setTimeout(()=>{
        const z=document.getElementById("seatZoneSelect");
        if(z) z.onchange=(e)=>loadCentresForSeatBooking(e.target.value);
      },100);
    loadZonesIntoDropdown();
      document.getElementById("seatZoneSelect").onchange = function(){
        loadCentresForSeatBooking(this.value);
      };
      setTimeout(() => {
        const zoneSelect = document.getElementById("seatZoneSelect");
        if(zoneSelect){
          zoneSelect.addEventListener("change", function(){
            console.log("Selected Zone ID:", zoneId);
        }
      }, 200);
        console.log("Selected Zone ID:", zoneId);
  } else if (["subadmin", "coadmin", "vendor", "canteen-man"].includes(page)) {
    let role = document.getElementById(`l-${page}`).innerText;
    let acts =
      page === "vendor" || page === "canteen-man"
        ? '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button> <button class="btn btn-info btn-sm text-white fw-bold">Booking List</button>'
        : '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button>';
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 800px;"><h4>Register ${role}</h4><div class="row g-3"><div class="col-md-6"><label class="form-label">Full Name</label><input type="text" class="form-control" placeholder="Full Name"></div><div class="col-md-6"><label class="form-label">Mobile</label><input type="text" class="form-control" placeholder="Mobile Number"></div><div class="col-12"><label class="form-label">Email</label><div class="input-group"><input type="email" class="form-control" placeholder="Email"><button class="btn btn-dark" onclick="showOTP('rO')">Send OTP</button></div><div id="rO" class="otp-dropdown"><p class="small fw-bold">Demo OTP: 2026</p><div class="d-flex gap-2"><input type="text" id="rIn" class="form-control w-25 text-center" placeholder="OTP"><button class="btn btn-primary" onclick="vOTP('rO', 'rIn')">Verify OTP</button></div></div></div><div class="col-md-6"><label class="form-label">Create Password</label><div class="input-group"><input type="password" id="p1" class="form-control pass-f" placeholder="Password"><span class="input-group-text eye-btn" onclick="eye('p1')"><i class="bi bi-eye"></i></span></div></div><div class="col-md-6"><label class="form-label">Confirm Password</label><div class="input-group"><input type="password" id="p2" class="form-control pass-f" placeholder="Confirm Password"><span class="input-group-text eye-btn" onclick="eye('p2')"><i class="bi bi-eye"></i></span></div></div><div class="col-12 text-end mt-3"><button class="btn btn-primary px-5">Register</button></div></div></div><div class="card-pro"><h5 class="fw-bold mb-3">${role} List</h5><div class="table-responsive"><table class="table"><thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead><tbody><tr><td>Demo User</td><td>test@lib.com</td><td>${acts}</td></tr></tbody></table></div></div>`;
  } else if (page === "create-zone") {
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 700px;"><h4>Create Zone</h4><div class="row g-3"><div class="col-12"><label class="form-label">Name</label><input type="text" class="form-control" placeholder="Zone Name"></div><div class="col-12"><label class="form-label">Select State</label><select id="state" class="form-select"></select></div><div class="col-12"><label class="form-label">Upload</label><input type="file" class="form-control"></div><div class="col-12"><label class="form-label">Description</label><textarea class="form-control" placeholder="Description"></textarea></div><div class="col-12 mt-3"><button class="btn btn-primary w-100" onclick="createZone()">Submit</button></div></div></div>`;
    root.innerHTML += `

<div class="card-pro mt-4">

<h4 class="fw-bold mb-3">Zone List</h4>

<div class="table-responsive">

<table class="table align-middle table-hover">

<thead class="table-light">
<tr>
<th>Zone Name</th>
<th>State</th>
<th>Created Date</th>
<th>Status</th>
<th class="text-center">Actions</th>
</tr>
</thead>

<tbody id="zonesTable">

<tr>
<td colspan="4" class="text-center">Loading zones...</td>
</tr>

</tbody>

</table>

</div>

</div>
`;
loadStates();
    loadZones();
  } else if (page === "create-centre") {
    root.innerHTML = `
  <div class="card-pro mx-auto" style="max-width: 750px;">
    <h4>Create Centre</h4>

    <div class="row g-3">

      <div class="col-md-6">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" placeholder="Centre Name">
      </div>

      <div class="col-md-6">
        <label class="form-label">Select Zone</label>
        <select class="form-select" id="centreZoneSelect">
          <option value="">Loading zones...</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Admission fee</label>
        <input type="number" class="form-control" placeholder="0">
      </div>

      <div class="col-md-6">
        <label class="form-label">Seat Capacity</label>
        <input type="number" class="form-control" placeholder="0">
      </div>

      <div class="col-12">
        <label class="form-label">Upload</label>
        <input type="file" class="form-control">
      </div>

      <div class="col-12">
        <label class="form-label">Description</label>
        <textarea class="form-control" placeholder="Description"></textarea>
      </div>

      <div class="col-12 mt-3">
       <button class="btn btn-primary w-100" onclick="createCentre()">Submit</button>
      </div>
 
    </div>
  </div>
  `;

    const zoneSelect = document.getElementById("centreZoneSelect");
    loadZonesIntoDropdown();

    root.innerHTML += `

<div class="card-pro mt-4">

<h4 class="fw-bold mb-3">Centre List</h4>

<div class="table-responsive">

<table class="table align-middle table-hover">

<thead class="table-light">
<tr>
<th>Centre Name</th>
<th>Zone</th>
<th>Admission Fee</th>
<th>Seat Capacity</th>
<th>Created Date</th>
<th>Status</th>
<th class="text-center">Actions</th>
</tr>
</thead>

<tbody id="centresTable">

<tr>
<td colspan="6" class="text-center">Loading centres...</td>
</tr>

</tbody>

</table>

</div>

</div>
`;

    loadCentres();
  } else if (page === "create-section") {
    root.innerHTML = `
  <div class="card-pro mx-auto" style="max-width: 800px;">
    <h4>Create Section</h4>

    <div class="row g-3">

      <div class="col-md-4">
        <label class="form-label">Section Name</label>
        <input type="text" class="form-control" id="sectionName" placeholder="Section Name">
      </div>

      <div class="col-md-4">
        <label class="form-label">Select Zone</label>
        <select class="form-select" id="sectionZoneSelect">
          <option value="">Loading zones...</option>
        </select>
      </div>

      <div class="col-md-4">
        <label class="form-label">Select Centre</label>
        <select class="form-select" id="sectionCentreSelect">
          <option value="">Select Centre</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label">Start Seat Number</label>
        <input type="number" class="form-control" id="startSeat">
      </div>

      <div class="col-md-3">
        <label class="form-label">End Seat Number</label>
        <input type="number" class="form-control" id="endSeat">
      </div>

      <div class="col-md-3">
  <label class="form-label">Total Rows</label>
  <input type="number" class="form-control" id="totalRows">
</div>

<div class="col-md-3">
  <label class="form-label">Total Columns</label>
  <input type="number" class="form-control" id="totalColumns">
</div>

      <div class="col-12 mt-3 text-end">
        <button class="btn btn-primary px-5" onclick="createSection()">Submit</button>
      </div>

    </div>
  </div>
  `;

    root.innerHTML += `
<div class="card-pro mt-4">

<h4>Section List</h4>

<div class="table-responsive">

<table class="table table-bordered align-middle">

<thead class="table-light">
<tr>
<th style="min-width:150px">Section Name</th>
<th style="min-width:180px">Centre</th>
<th style="min-width:120px">Zone</th>
<th style="min-width:90px">Start Seat</th>
<th style="min-width:90px">End Seat</th>
<th style="min-width:70px">Rows</th>
<th style="min-width:90px">Columns</th>
<th style="min-width:90px">Status</th>
<th style="min-width:150px">Actions</th>

</tr>
</thead>

<tbody id="sectionsTable">

<tr>
<td colspan="9" class="text-center text-muted">
Loading sections...
</td>
</tr>

</tbody>

</table>

</div>

</div>
`;

    const zoneSelect = document.getElementById("sectionZoneSelect");
    loadZonesIntoDropdown(zoneSelect);
    loadSections();

    document
      .getElementById("sectionZoneSelect")
      .addEventListener("change", function () {
        loadCentresByZone(this.value);
  } else if (page === "create-shift") {
    root.innerHTML = `<div class="card-pro"><h4>Create Shift</h4><div class="row g-3">
            <div class="col-md-4"><label class="form-label">Name</label><input type="text" class="form-control" placeholder="Shift Name"></div>
            <div class="col-md-4"><label class="form-label">Select Zone</label><select class="form-select" id="shiftZoneSelect">
  <option value="">Loading zones...</option>
</select></div>
            <div class="col-md-4"><label class="form-label">Select Centres</label><select class="form-select" id="shiftCentreSelect">
  <option value="">Select Centre</option>
</select></div>
            <div class="col-md-4"><label class="form-label">Select Section</label><select class="form-select" id="shiftSectionSelect">
  <option value="">Select Section</option>
</select></div>
             
        
            
            <div class="col-md-4"><label class="form-label">Start time</label><input type="time" class="form-control"></div>
            <div class="col-md-4"><label class="form-label">Shift duration in minutes</label><input type="number" class="form-control" placeholder="120"></div>
            <div class="col-md-4"><label class="form-label">MRP</label><input type="number" class="form-control" placeholder="0"></div>
            <div class="col-md-4"><label class="form-label">Discount</label><input type="number" class="form-control" placeholder="0"></div>
            <div class="col-md-4"><label class="form-label">Price</label><input type="number" class="form-control" placeholder="0"></div>
            <div class="col-md-4">
<label class="form-label">Coin limit usage box</label>
<input type="number" id="coinLimitUsage" class="form-control" placeholder="Max coins">
</div>
            <div class="col-md-4"><label class="form-label">Duration</label><input type="text" class="form-control" placeholder="e.g. 2 Hours"></div>
            <div class="col-md-4"><label class="form-label">Interval</label><input type="text" class="form-control" placeholder="Break time"></div>
            <div class="col-md-12"><label class="form-label">Upload </label><input type="file" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 90 Days %</label><input type="number" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 180 Days %</label><input type="number" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 270 Days %</label><input type="number" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 360 Days %</label><input type="number" class="form-control"></div>
            <div class="col-12 mt-4 text-end"><button class="btn btn-primary px-5" onclick="createShift()">Submit</button></div>

            </div></div>

<div class="card-pro mt-4">
<h4>Shift List</h4>

<div class="table-responsive">
<table class="table table-bordered align-middle">

<thead>
<tr>
<th style="min-width:150px">Shift Name</th>
<th style="min-width:150px">Centre</th>
<th style="min-width:120px">Section</th>
<th style="min-width:120px">Start Time</th>
<th style="min-width:120px">Duration</th>
<th style="min-width:100px">Price</th>
<th style="min-width:100px">Status</th>
<th style="min-width:150px">Actions</th>
</tr>
</thead>

<tbody id="shiftTableBody">

</tbody>

</table>
</div>
</div>
        </div></div>`;
    loadZonesIntoDropdown(document.getElementById("shiftZoneSelect"));

    document
      .getElementById("shiftZoneSelect")
      .addEventListener("change", function () {
        loadCentresForShift(this.value);

    document
      .getElementById("shiftCentreSelect")
      .addEventListener("change", function () {
        loadSectionsForShift(this.value);
    loadShifts();
  } else if (page === "create-coupon") {
    root.innerHTML = `
<div class="card-pro">
<h4>Create Coupon</h4>

<div class="row g-3">

<div class="col-md-6">
<label class="form-label">Coupon Name</label>
<input type="text" class="form-control" id="couponName">
</div>

<div class="col-md-6">
<label class="form-label">Coupon Code</label>
<input type="text" class="form-control" id="couponCode">
</div>

<div class="col-md-12">
<label class="form-label">Select Centres</label>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="allCentres">
<label class="form-check-label">All Centres</label>
</div>

<div id="centreList">
Loading centres...
</div>

</div>

<div class="col-md-12">
<label class="form-label">Select Gender</label>

<div class="form-check">
<input class="form-check-input" type="checkbox" value="MALE">
<label class="form-check-label">Male</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" value="FEMALE">
<label class="form-check-label">Female</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" value="OTHER">
<label class="form-check-label">Other</label>
</div>

</div>

<div class="col-md-4">
<label class="form-label">Minimum Price</label>
<input type="number" class="form-control" id="minPrice">
</div>

<div class="col-md-4">
<label class="form-label">Start Date</label>
<input type="date" class="form-control" id="startDate">
</div>

<div class="col-md-4">
<label class="form-label">Expiry Date</label>
<input type="date" class="form-control" id="expiryDate">
</div>

<div class="col-12 mt-3 text-end">
<button class="btn btn-primary px-5" onclick="createCoupon()">Submit</button>
</div>

</div>
</div>
`;

    loadCentresForCoupon();
  } else if (page === "booking-history") {
    root.innerHTML = `<div class="card-pro"><h4>Booking History List</h4><h6 class="text-muted mb-4">Show All Booking</h6><div class="filter-section">
  <h6 class="fw-bold mb-3"><i class="bi bi-funnel"></i> Filter system</h6>
  <div class="row g-3">

    <div class="col-md-3">
      <label class="small fw-bold">Choose zone</label>
      <select id="filterZone" class="form-select"></select>
    </div>

    <div class="col-md-3">
      <label class="small fw-bold">Choose Centre</label>
      <select id="filterCentre" class="form-select"></select>
    </div>

    <div class="col-md-3">
      <label class="small fw-bold">Choose Section</label>
      <select id="filterSection" class="form-select"></select>
    </div>

    <div class="col-md-3">
      <label class="small fw-bold">Choose Shift</label>
      <select id="filterShift" class="form-select"></select>
    </div>

    <div class="col-12 mt-3">
      <button id="applyFilterBtn" class="btn btn-primary px-4 fw-bold">Apply</button>
    </div>

  </div>
</div>
            <div class="table-responsive mt-4"><table class="table"><thead><tr><th>ID</th><th>User</th><th>Seat</th><th>Status</th></tr></thead><tbody id="bookingTableBody"></tbody></table></div></div>`;

    // loadBookings();
    loadFilterZones();

    document
      .getElementById("applyFilterBtn")
      .addEventListener("click", applyBookingFilters);
  }
}

function tglE(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
function showOTP(id) {
  alert("Demo OTP: 2026");
  document.getElementById(id).style.display = "block";
}
function vOTP(bId, iId) {
  if (document.getElementById(iId).value === "2026") {
    alert("Verified Successfully! ✅");
    document.getElementById(bId).style.display = "none";
  } else {
    alert("Wrong OTP!");
  }
}
function save() {
  alert("Updated! ✅");
  document
    .querySelectorAll(".edit-box")
    .forEach((b) => (b.style.display = "none"));
}

async function createZone() {
  const zoneName = document.querySelector(
    "input[placeholder='Zone Name']",
  ).value;
  const stateName = document.querySelector("select").value;
  const description = document.querySelector("textarea").value;

  const zoneData = {
    zoneName: zoneName,
    stateName: stateName,
    description: description,
  };

  try {
    let url = "http://localhost:8087/api/zones";
    let method = "POST";

    // अगर edit mode है
    if (window.editingZoneId) {
      url = "http://localhost:8087/api/zones/" + window.editingZoneId;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zoneData),

    if (!response.ok) {
      alert("Failed to save zone");
      return;
    }

    alert("Zone saved successfully");

    // reset edit mode
    window.editingZoneId = null;

    // reload list
    loadZones();
  } catch (err) {
    alert("Error saving zone");
  }
}

async function loadZonesIntoDropdown() {
  try {
    const response = await fetch("http://localhost:8087/api/zones");
    const zones = await response.json();

    const selectElement =
      document.getElementById("seatZoneSelect") ||
      document.getElementById("centreZoneSelect") ||
      document.getElementById("sectionZoneSelect") ||
      document.getElementById("shiftZoneSelect");

    if (!selectElement) return;

    selectElement.innerHTML = '<option value="">Select Zone</option>';

    zones
      .filter((z) => !z.deleted)
      .forEach((zone) => {
        const option = document.createElement("option");

        option.value = zone.id;
        option.textContent = zone.zoneName;

        selectElement.appendChild(option);
  } catch (error) {
    console.error("Error loading zones:", error);
  }
}

  if (!zoneId) return;

  try {
    const response = await fetch(`http://localhost:8087/api/centres/zone/${zoneId}`);
    const centres = await response.json();

    const centreSelect = document.getElementById("seatCentreSelect");
    if (!centreSelect) return;

    centreSelect.innerHTML = "<option value="">Select Centre</option>";

    centres.forEach((centre) => {
      const option = document.createElement("option");
      option.value = centre.id;
      option.textContent = centre.centreName;
      centreSelect.appendChild(option);

  } catch (error) {
    console.error("Error loading centres:", error);
  }
}
async function createCentre() {
  const name = document.querySelector('input[placeholder="Centre Name"]').value;
  const zoneId = document.getElementById("centreZoneSelect").value;
  const admissionFee = document.querySelector('input[placeholder="0"]').value;
  const seatCapacity = document.querySelectorAll('input[placeholder="0"]')[1]
    .value;
  const description = document.querySelector("textarea").value;

  if (!name || !zoneId) {
    alert("Centre Name and Zone required");
    return;
  }

  try {
    let url = `http://localhost:8087/api/centres/${zoneId}`;
    let method = "POST";

    if (window.editingCentreId) {
      url = `http://localhost:8087/api/centres/${window.editingCentreId}/${zoneId}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        centreName: name,
        admissionFee: admissionFee,
        capacity: seatCapacity,
        description: description,
      }),

    if (!response.ok) {
      throw new Error("Failed to create centre");
    }

    alert("Centre Created Successfully ✅");

    window.editingCentreId = null;
    loadCentres();
  } catch (err) {
    alert(err.message);
  }
}

async function loadCentresByZone(zoneId) {
  const centreSelect = document.getElementById("sectionCentreSelect");

  if (!zoneId) {
    centreSelect.innerHTML = '<option value="">Select Centre</option>';
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8087/api/centres/zone/${zoneId}`,
    );
    const centres = await response.json();

    centreSelect.innerHTML = '<option value="">Select Centre</option>';

    centres.forEach((centre) => {
      const option = document.createElement("option");

      option.value = centre.id;
      option.textContent = centre.centreName;

      centreSelect.appendChild(option);
  } catch (error) {
    console.error("Error loading centres:", error);
  }
}

async function createSection() {
  const name = document.getElementById("sectionName").value;
  const centreId = document.getElementById("sectionCentreSelect").value;
  const startSeat = document.getElementById("startSeat").value;
  const endSeat = document.getElementById("endSeat").value;
  const totalRows = document.getElementById("totalRows").value;
  const totalColumns = document.getElementById("totalColumns").value;

  if (!name || !centreId) {
    alert("Section Name and Centre required");
    return;
  }

  try {
    let url = `http://localhost:8087/api/sections/${centreId}`;
    let method = "POST";

    if (window.editingSectionId) {
      url = `http://localhost:8087/api/sections/${window.editingSectionId}/${centreId}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        startSeatNumber: startSeat,
        endSeatNumber: endSeat,
        numberOfRows: totalRows,
        numberOfColumns: totalColumns,
      }),
    if (!response.ok) {
      throw new Error("Failed to create section");
    }

    alert("Section Created Successfully ✅");

    window.editingSectionId = null;
    loadSections();

    loadSections();
  } catch (err) {
    alert(err.message);
  }
}

async function loadCentresForShift(zoneId) {
  const centreSelect = document.getElementById("shiftCentreSelect");

  if (!zoneId) {
    centreSelect.innerHTML = '<option value="">Select Centre</option>';
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8087/api/centres/zone/${zoneId}`,
    );
    const centres = await response.json();

    centreSelect.innerHTML = '<option value="">Select Centre</option>';

    centres.forEach((centre) => {
      const option = document.createElement("option");
      option.value = centre.id;
      option.textContent = centre.centreName;
      centreSelect.appendChild(option);
  } catch (error) {
    console.error("Error loading centres:", error);
  }
}

async function loadSectionsForShift(centreId) {
  const sectionSelect = document.getElementById("shiftSectionSelect");

  if (!centreId) {
    sectionSelect.innerHTML = '<option value="">Select Section</option>';
    return;
  }

  try {
    const response = await fetch(`http://localhost:8087/api/sections`);
    const sections = await response.json();

    sectionSelect.innerHTML = '<option value="">Select Section</option>';

    sections
      .filter((section) => section.centre.id == centreId)
      .forEach((section) => {
        const option = document.createElement("option");
        option.value = section.id;
        option.textContent = section.name;
        sectionSelect.appendChild(option);
  } catch (error) {
    console.error("Error loading sections:", error);
  }
}

async function createShift() {
  const name = document.querySelector('input[placeholder="Shift Name"]').value;
  const sectionId = document.getElementById("shiftSectionSelect").value;
  const startTime = document.querySelector('input[type="time"]').value;
  const duration = document.querySelector('input[placeholder="120"]').value;

  const mrp = document.querySelector('input[placeholder="0"]').value;
  const discount = document.querySelectorAll('input[placeholder="0"]')[1].value;
  const coinLimitUsage = document.getElementById("coinLimitUsage").value;

  if (!name || !sectionId || !startTime || !mrp) {
    alert("Required fields missing");
    return;
  }

  const url = "http://localhost:8087/api/shifts/" + sectionId;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  name: name,
  startTime: startTime,
  mrp: Number(mrp),
  discountValue: Number(discount),
  discountType: "PERCENTAGE",
  coinLimitUsage: Number(coinLimitUsage)
}),

    if (!response.ok) {
      throw new Error("Failed to create shift");
    }

    alert("Shift Created Successfully ✅");
  } catch (error) {
    alert(error.message);
  }
}

async function loadStudents() {
  try {
    const res = await fetch("http://localhost:8087/api/auth/students");
    const students = await res.json();

    const table = document.getElementById("studentsTable");

    table.innerHTML = "";

    students
      .filter((s) => s.role === "STUDENT")
      .forEach((student) => {
        const row = `
        <tr>

          <td class="fw-bold">${student.fullname}</td>

          <td>${student.email}</td>

          <td>${student.mobile || "-"}</td>

          <td>${new Date().toLocaleDateString()}</td>

          <td>
            <span class="badge bg-success-subtle text-success px-3">
              450
            </span>
          </td>

          <td>
            <button class="btn btn-light btn-sm border"
        onclick="showHistory(${student.id})">
  <i class="bi bi-clock-history"></i> History
</button>
          </td>

          <td>

            <div class="d-flex gap-2">

<button class="btn btn-light btn-sm"
onclick="openSeat(${student.id})" title="Seat">
<i class="fa-solid fa-chair text-danger"></i>
</button>

<button class="btn btn-warning btn-sm fw-bold"
onclick="blockStudent(${student.id})">
Block
</button>

            </div>

          </td>

        </tr>
        `;

        table.innerHTML += row;
  } catch (err) {
    console.error(err);
  }
}

async function showHistory(studentId) {
  try {
    const res = await fetch(
      "http://localhost:8087/api/bookings/student/" + studentId,
    );
    const bookings = await res.json();

    let history = "Booking History:\n\n";

    bookings.forEach((b) => {
      history +=
        "Seat ID: " +
        b.seat.id +
        " | Shift ID: " +
        b.shift.id +
        " | Status: " +
        b.paymentStatus +
        "\n";

    if (bookings.length === 0) {
      history = "No booking history found";
    }

    alert(history);
  } catch (err) {
    console.error(err);
    alert("Failed to load history");
  }
}

async function showHistory(studentId) {
  try {
    const response = await fetch(
      "http://localhost:8087/api/bookings/student/" + studentId,
    );

    const bookings = await response.json();

    const table = document.getElementById("historyTable");

    table.innerHTML = "";

    if (bookings.length === 0) {
      table.innerHTML = "<tr><td colspan='5'>No booking history</td></tr>";
    }

    bookings.forEach((b) => {
      const row = `
            <tr>
            <td>${b.seat.seatNumber}</td>
            <td>${b.shift.name}</td>
            <td>
            <span class="badge ${b.paymentStatus === "SUCCESS" ? "bg-success" : "bg-warning text-dark"}">
            ${b.paymentStatus}
            </span>
            </td>
            <td>${b.amount}</td>
            <td>
${new Date(b.bookingTime).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})}
|
${new Date(b.bookingTime).toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
})}
</td>
            </tr>
            `;

      table.innerHTML += row;

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

async function loadStudents() {
  const res = await fetch("http://localhost:8087/api/auth/students");
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
        <td>-</td>
        <td>
          <span class="badge bg-success-subtle text-success px-3">0</span>
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

            <button class="btn btn-warning btn-sm fw-bold">
            Block
            </button>

          </div>
        </td>
      </tr>
    `;

    table.innerHTML += row;
}

async function blockStudent(studentId) {
  console.log("Block clicked:", studentId);

  if (!confirm("Are you sure you want to block this student?")) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8087/api/auth/block/" + studentId,
      {
        method: "PUT",
      },
    );

    const data = await response.json();

    alert(data.message);

    loadStudents();
  } catch (err) {
    alert("Error blocking student");
  }
}

async function loadZones() {
  try {
    const response = await fetch("http://localhost:8087/api/zones");

    const zones = await response.json();

    const table = document.getElementById("zonesTable");

    table.innerHTML = "";

    if (zones.length === 0) {
      table.innerHTML = `
            <tr>
                <td colspan="4" class="text-center">No zones created</td>
            </tr>
            `;

      return;
    }

    zones
      .filter((z) => !z.deleted)
      .forEach((zone) => {
        const created = new Date(
          zone.createdDate || zone.createdAt || Date.now(),
        ).toLocaleDateString("en-GB");

        table.innerHTML += `
            <tr>

                <td>${zone.zoneName}</td>

                <td>${zone.stateName || "-"}</td>
<td>${created}</td>

<td>
${
  zone.active
    ? '<span class="badge bg-success">Active</span>'
    : '<span class="badge bg-danger">Blocked</span>'
}
</td>

<td class="text-center">

                    <button class="btn btn-sm btn-primary me-2"
                    onclick="editZone(${zone.id})">
                    Edit
                    </button>

                    <button class="btn btn-sm btn-danger me-2"
                    onclick="deleteZone(${zone.id})">
                    Delete
                    </button>

                   <button class="btn btn-sm btn-warning"
onclick="blockZone(${zone.id})">
${zone.active ? "Block" : "Unblock"}
</button>

                </td>

            </tr>
            `;
  } catch (err) {
    console.error(err);
  }
}

async function loadCentres() {
  try {
    const response = await fetch("http://localhost:8087/api/centres");
    const centres = await response.json();

    const table = document.getElementById("centresTable");

    table.innerHTML = "";

    if (centres.length === 0) {
      table.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">No centres created</td>
            </tr>
            `;

      return;
    }

    centres.forEach((centre) => {
      const created = new Date().toLocaleDateString("en-GB");

      table.innerHTML += `
            <tr>

                <td>${centre.centreName}</td>

                <td>${centre.zone.zoneName}</td>

                <td>${centre.admissionFee}</td>

                <td>${centre.capacity || "-"}</td>

                <td>${created}</td>

                <td>
                ${
                  centre.active === true
                    ? '<span class="badge bg-success">Active</span>'
                    : '<span class="badge bg-danger">Blocked</span>'
                }
                </td>

                <td class="text-center">

                    <button class="btn btn-sm btn-primary me-2"
                    onclick="editCentre(${centre.id})">
                    Edit
                    </button>

                    <button class="btn btn-sm btn-danger me-2"
                    onclick="deleteCentre(${centre.id})">
                    Delete
                    </button>

                    <button class="btn btn-sm btn-warning"
onclick="blockCentre(${centre.id})">
${centre.active === true ? "Block" : "Unblock"}
</button>

                </td>

            </tr>
            `;
  } catch (err) {
    console.error(err);
  }
}

async function loadSections() {
  try {
    const response = await fetch("http://localhost:8087/api/sections");
    const sections = await response.json();

    const table = document.getElementById("sectionsTable");

    if (!table) return;

    table.innerHTML = "";

    if (sections.length === 0) {
      table.innerHTML = `
            <tr>
                <td colspan="9" class="text-center">No sections created</td>
            </tr>
            `;

      return;
    }

    sections.forEach((section) => {
      table.innerHTML += `
            <tr>

                <td>${section.name || "-"}</td>

                <td>${section.centre?.centreName || "-"}</td>

                <td>${section.centre?.zone?.zoneName || "-"}</td>

                <td>${section.startSeatNumber || "-"}</td>

                <td>${section.endSeatNumber || "-"}</td>

                <td>${section.numberOfRows || "-"}</td>

                <td>${section.numberOfColumns || "-"}</td>

                <td>
                ${
                  section.active
                    ? '<span class="badge bg-success">Active</span>'
                    : '<span class="badge bg-danger">Blocked</span>'
                }
                </td>

                <td class="text-center">

                    <button class="btn btn-sm btn-primary me-2"
                    onclick="editSection(${section.id})">
                    Edit
                    </button>

                    <button class="btn btn-sm btn-danger me-2"
    onclick="deleteSection(${section.id})">
    Delete
    </button>

                    <button class="btn btn-sm btn-warning"
                    onclick="blockSection(${section.id})">
                    ${section.active ? "Block" : "Unblock"}
                    </button>

                </td>

            </tr>
            `;
  } catch (err) {
    console.error(err);
  }
}

async function deleteCentre(centreId) {
  if (!confirm("Are you sure you want to delete this centre?")) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8087/api/centres/" + centreId,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
  alert("Unable to delete centre. Please try again.");
  return;
}

    alert("Centre deleted");

    loadCentres();
  } catch (err) {
    alert("Error deleting centre");
  }
}

async function editCentre(centreId) {
  try {
    const response = await fetch(
      "http://localhost:8087/api/centres/" + centreId,
    );

    if (!response.ok) {
      alert("Failed to load centre");
      return;
    }

    const centre = await response.json();

    document.querySelector('input[placeholder="Centre Name"]').value =
      centre.centreName;

    document.getElementById("centreZoneSelect").value = centre.zone.id;

    document.querySelectorAll('input[placeholder="0"]')[0].value =
      centre.admissionFee;

    document.querySelectorAll('input[placeholder="0"]')[1].value =
      centre.capacity;

    document.querySelector("textarea").value = centre.description || "";

    window.editingCentreId = centre.id;
  } catch (err) {
    alert("Error loading centre");
  }
}

async function deleteZone(zoneId) {
  if (!confirm("Are you sure you want to delete this zone?")) {
    return;
  }

  try {
    // zone data fetch
    const res = await fetch("http://localhost:8087/api/zones/" + zoneId);
    const zone = await res.json();

    // mark as deleted
    zone.deleted = true;

    const response = await fetch("http://localhost:8087/api/zones/" + zoneId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zone),

    if (!response.ok) {
      alert("Delete failed");
      return;
    }

    alert("Zone deleted");

    loadZones();
  } catch (err) {
    alert("Error deleting zone");
  }
}

async function deleteSection(sectionId) {
  if (!confirm("Are you sure you want to delete this section?")) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8087/api/sections/" + sectionId,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      alert("Delete failed");
      return;
    }

    alert("Section deleted");

    loadSections();
  } catch (err) {
    alert("Error deleting section");
  }
}

async function blockZone(zoneId) {
  try {
    const response = await fetch(
      "http://localhost:8087/api/zones/block/" + zoneId,
      {
        method: "PUT",
      },
    );

    if (!response.ok) {
      throw new Error("Block failed");
    }

    alert("Zone status updated");

    loadZones();
  } catch (err) {
    alert(err.message);
  }
}

async function editZone(zoneId) {
  try {
    const response = await fetch("http://localhost:8087/api/zones/" + zoneId);

    const zone = await response.json();

    document.querySelector('input[placeholder="Zone Name"]').value =
      zone.zoneName;

    document.querySelector("select").value = zone.stateName;

    document.querySelector("textarea").value = zone.description || "";

    window.editZoneId = zone.id;
  } catch (err) {
    alert("Failed to load zone");
  }
}

async function editZone(zoneId) {
  try {
    const response = await fetch("http://localhost:8087/api/zones/" + zoneId);

    if (!response.ok) {
      alert("Failed to load zone");
      return;
    }

    const zone = await response.json();

    // form fields fill
    document.querySelector("input[placeholder='Zone Name']").value =
      zone.zoneName;
    document.querySelector("select").value = zone.stateName || "";
    document.querySelector("textarea").value = zone.description || "";

    // store editing id
    window.editingZoneId = zoneId;
  } catch (err) {
    alert("Error loading zone");
  }
}

async function blockCentre(centreId) {
  try {
    const response = await fetch(
      "http://localhost:8087/api/centres/block/" + centreId,
      {
        method: "PUT",
      },
    );

    if (!response.ok) {
      alert("Block failed");
      return;
    }

    const data = await response.json();

    alert("Centre status updated");

    loadCentres();
  } catch (err) {
    alert("Error updating centre");
  }
}

async function editSection(sectionId) {
  try {
    const response = await fetch(
      "http://localhost:8087/api/sections/" + sectionId,
    );

    const section = await response.json();

    // form fields fill
    document.getElementById("sectionName").value = section.name;
    document.getElementById("startSeat").value = section.startSeatNumber;
    document.getElementById("endSeat").value = section.endSeatNumber;
    document.getElementById("totalRows").value = section.numberOfRows;
    document.getElementById("totalColumns").value = section.numberOfColumns;

    // centre select
    document.getElementById("sectionCentreSelect").value = section.centre.id;

    // zone select
    document
      .getElementById("sectionZoneSelect")
      .addEventListener("change", function () {
        loadCentresByZone(this.value);

    // store editing id
    window.editingSectionId = sectionId;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
  } catch (err) {
    console.error("Edit section error", err);
  }
}

async function loadShifts() {
  try {
    const response = await fetch("http://localhost:8087/api/shifts");
    const shifts = await response.json();

    const tableBody = document.getElementById("shiftTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    shifts.forEach((shift) => {
      const row = `
            <tr>
                <td>${shift.name}</td>
                <td>${shift.section.centre.centreName}</td>
                <td>${shift.section.name}</td>
                <td>${shift.startTime}</td>
                <td>${shift.durationDays || "-"}</td>
<td>${shift.price ?? "-"}</td>
                <td>
                    ${
                      shift.active
                        ? '<span class="badge bg-success">Active</span>'
                        : '<span class="badge bg-danger">Blocked</span>'
                    }
                </td>

                <td class="d-flex gap-2">
                    <button class="btn btn-sm btn-primary me-2"
onclick="editShift(${shift.id})">
Edit
</button>
                    <button class="btn btn-sm btn-warning me-2"
onclick="blockShift(${shift.id})">
${shift.active ? "Block" : "Unblock"}
</button>

<button class="btn btn-sm btn-danger"
onclick="deleteShift(${shift.id})">
Delete
</button>
                </td>
            </tr>
            `;

      tableBody.innerHTML += row;
  } catch (err) {
    console.error("Error loading shifts", err);
  }
}

async function editShift(shiftId) {
  try {
    const response = await fetch("http://localhost:8087/api/shifts/section/{sectionId}" + shiftId);
    const shift = await response.json();

    // form fields fill
    document.querySelector('input[placeholder="Shift Name"]').value =
      shift.name;

    document.getElementById("shiftZoneSelect").value =
      shift.section.centre.zone.id;

    await loadCentresForShift(shift.section.centre.zone.id);

    document.getElementById("shiftCentreSelect").value =
      shift.section.centre.id;

    await loadSectionsForShift(shift.section.centre.id);

    document.getElementById("shiftSectionSelect").value = shift.section.id;

    document.querySelector('input[type="time"]').value = shift.startTime;

    document.querySelector('input[placeholder="0"]').value = shift.mrp;

    window.editingShiftId = shiftId;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
  } catch (err) {
    console.error("Error loading shift for edit", err);
  }
}

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
  } catch (e) {
    console.log("Booking load error", e);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  loadBookings();

async function loadFilterZones() {
  const res = await fetch("http://localhost:8087/api/zones");
  const zones = await res.json();

  const zoneSelect = document.getElementById("filterZone");

  zoneSelect.innerHTML = `<option value="">All Zones</option>`;

  zones
    .filter((z) => !z.deleted)
    .forEach((z) => {
      zoneSelect.innerHTML += `<option value="${z.id}">${z.zoneName}</option>`;
  zoneSelect.addEventListener("change", function () {
    loadFilterCentresByZone(this.value);
}

async function applyBookingFilter() {
  const zone = document.getElementById("filterZone").value;

  let url = "http://localhost:8087/api/bookings";

  if (zone) {
    url += "?zoneId=" + zone;
  }

  const response = await fetch(url);
  const bookings = await response.json();

  const table = document.getElementById("bookingTableBody");
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
  centreSelect.addEventListener("change", function () {
    loadSectionsByCentre(this.value);
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
  sectionSelect.addEventListener("change", function () {
    loadShiftsBySection(this.value);
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
}

async function blockSection(sectionId) {
  if (!confirm("Are you sure you want to block/unblock this section?")) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8087/api/sections/block/" + sectionId,
      {
        method: "PUT",
      },
    );

    if (!response.ok) {
      alert("Block failed");
      return;
    }

    alert("Section status updated");

    loadSections();
  } catch (err) {
    console.error(err);
    alert("Error blocking section");
  }
}

async function blockShift(shiftId) {
  if (!confirm("Are you sure you want to block/unblock this shift?")) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8087/api/shifts/block/" + shiftId,
      {
        method: "PUT",
      },
    );

    if (!response.ok) {
      alert("Block failed");
      return;
    }

    alert("Shift status updated");

    loadShifts();
  } catch (err) {
    console.error(err);
    alert("Error blocking shift");
  }
}

async function deleteShift(shiftId) {
  if (!confirm("Are you sure you want to delete this shift?")) {
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8087/api/shifts/" + shiftId,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      alert("Delete failed");
      return;
    }

    alert("Shift deleted");

    loadShifts();
  } catch (err) {
    console.error(err);
    alert("Error deleting shift");
  }
}

function eye(id) {
  const f = document.getElementById(id);
  const i = f.nextElementSibling.querySelector("i");
  if (f.type === "password") {
    f.type = "text";
    i.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    f.type = "password";
    i.classList.replace("bi-eye-slash", "bi-eye");
  }
}

render("students");
async function bookSeat(seatId) {
  if (!confirm("Book this seat?")) return;

  try {
    const res = await fetch("http://localhost:8087/api/seats/book/" + seatId, {
      method: "POST",

    if (!res.ok) {
      alert("Seat booking failed");
      return;
    }

    alert("Seat booked successfully ✅");
  } catch (e) {
    alert("Booking error");
  }
}

async function loadCentresForCoupon() {
  try {
    const res = await fetch("http://localhost:8087/api/centres");
    const centres = await res.json();

    const container = document.getElementById("centreList");

    if (!container) return;

    container.innerHTML = "";

    centres.forEach((c) => {
      const div = document.createElement("div");

      div.className = "form-check";

      div.innerHTML = `
        <input class="form-check-input centre-checkbox"
        type="checkbox"
        value="${c.id}">

        <label class="form-check-label">
        ${c.centreName}
        </label>
      `;

      container.appendChild(div);
    const allBox = document.getElementById("allCentres");

    if (allBox) {
      allBox.addEventListener("change", function () {
        const centreBoxes = document.querySelectorAll(".centre-checkbox");

        centreBoxes.forEach((cb) => {
          cb.checked = this.checked;
    }
  } catch (err) {
    console.error("Centre load error", err);
  }
}

async function submitCoupon() {
  const name = document.getElementById("couponName").value;
  const code = document.getElementById("couponCode").value;
  const minPrice = document.getElementById("minPrice").value;
  const startDate = document.getElementById("startDate").value;
  const expiryDate = document.getElementById("expiryDate").value;

  const centres = [];
  document.querySelectorAll(".centre-checkbox:checked").forEach((c) => {
    centres.push(c.value);

  const genders = [];
  document
    .querySelectorAll(
      "input[type='checkbox'][value='MALE']:checked, input[value='FEMALE']:checked, input[value='OTHER']:checked",
    )
    .forEach((g) => {
      genders.push(g.value);

  console.log({
    name,
    code,
    minPrice,
    startDate,
    expiryDate,
    centres,
    genders,

  alert("Coupon data captured ✔ check console");
}

async function createCoupon() {
  const name = document.getElementById("couponName").value;
  const code = document.getElementById("couponCode").value;
  const minPrice = document.getElementById("minPrice").value;
  const startDate = document.getElementById("startDate").value;
  const expiryDate = document.getElementById("expiryDate").value;

  const data = {
    name: name,
    code: code,
    minPrice: minPrice,
    startDate: startDate,
    expiryDate: expiryDate,
  };

  try {
    const res = await fetch("http://localhost:8087/api/coupons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),

    if (!res.ok) {
      alert("Failed to create coupon");
      return;
    }
    const result = await res.json();

    alert("Coupon Created Successfully");

    console.log(result);

    document.getElementById("couponName").value = "";
    document.getElementById("couponCode").value = "";
    document.getElementById("minPrice").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("expiryDate").value = "";

    document.querySelectorAll(".centre-checkbox").forEach(c => {
  c.checked = false;

document.querySelectorAll("input[type='checkbox'][value='MALE'], input[value='FEMALE'], input[value='OTHER']").forEach(g => {
  g.checked = false;

document.getElementById("allCentres").checked = false;
  } catch (e) {
    console.error(e);
    alert("Error creating coupon");
  }
}
async function loadStates() {
  
  const stateDropdown = document.getElementById("state");
    if (!stateDropdown) return;

    const response = await fetch("http://localhost:8087/api/states");
    const states = await response.json();


    stateDropdown.innerHTML = '<option value="">Select State</option>';

    states.forEach(state => {

        const option = document.createElement("option");
        option.value = state.id;
        option.text = state.stateName;

        stateDropdown.appendChild(option);


}

setTimeout(loadStates, 500);