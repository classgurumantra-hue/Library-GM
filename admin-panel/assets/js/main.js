document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("header-toggle");
  const body = document.body;

  // Sidebar Toggle for Mobile
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("toggled");
    });
  }

  // Menu Active Link Handler
  const currentPath = window.location.pathname;
  document.querySelectorAll(".sub-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes(currentPath)) {
      link.classList.add("text-white", "fw-bold");
    }
  });
});

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
const savedPage = localStorage.getItem("activePage") || "students";
render(savedPage);

function render(page) {
  const role = localStorage.getItem("role");

// 🔥 COADMIN RESTRICTION
if(role === "CO_ADMIN"){

  const observer = new MutationObserver(() => {

    const sidebar = document.querySelector(".sidebar");

    if(sidebar){

      console.log("COADMIN FULL CLEAN");

  sidebar.innerHTML = `
  <div style="padding: 20px;">

    <!-- 🔥 Title -->
    <h6 style="
      color: #aaa;
      font-size: 12px;
      margin-bottom: 20px;
      letter-spacing: 1px;
    ">
      COADMIN DASHBOARD
    </h6>

    <!-- 🔥 Menu -->
    <ul style="list-style: none; padding: 0; margin: 0;">

      <li>
        <a href="#" id="l-booking-history"
          onclick="render('booking-history')"
          style="
            display: block;
            padding: 12px 16px;
            border-radius: 10px;
            background: linear-gradient(90deg, #5f5fff, #7a5cff);
            color: white;
            text-decoration: none;
            font-weight: 500;
          ">
          Booking History
        </a>
      </li>

    </ul>

  </div>
`;

      observer.disconnect();
    }

  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

}

  localStorage.setItem("activePage", page);
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
            <th>Status</th>
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

    // hide delete buttons for subadmin
    if (localStorage.getItem("role") === "SUB_ADMIN") {
      setTimeout(() => {
        document.querySelectorAll("[onclick^='delete']").forEach((btn) => {
          btn.style.display = "none";
        });
      }, 100);
    }
  } else if (page === "seats") {
    const root = document.getElementById("mainContent");

    root.innerHTML = `
  <div class="card-pro">

    <h4 class="fw-bold mb-4">Seat Booking</h4>

   <div class="row g-3 mb-4">

  <div class="col-md-4">
    <label class="form-label">Zone</label>
    <select id="seatZoneSelect" class="form-select">
      <option value="">Loading zones...</option>
    </select>
  </div>

  <div class="col-md-4">
    <label class="form-label">Centre</label>
    <select id="seatCentreSelect" class="form-select">
      <option value="">Select Centre</option>
    </select>
  </div>

  <div class="col-md-4">
  <label class="form-label">Section</label>
  <select id="seatSectionSelect" class="form-select">
    <option value="">Select Section</option>
  </select>
</div>

</div>

    <div id="seatLayout"></div>

  </div>
  `;

    // zones load
    loadZonesIntoDropdown();

    // centre change → load sections
    setTimeout(() => {
      const centreSelect = document.getElementById("seatCentreSelect");

      if (centreSelect) {
        centreSelect.addEventListener("change", function () {
          loadSectionsForSeatBooking(this.value);
        });
      }
    }, 200);

    // section change -> load seats
    setTimeout(() => {
      const sectionSelect = document.getElementById("seatSectionSelect");

      if (sectionSelect) {
        sectionSelect.addEventListener("change", function () {
          loadSeatsForSection(this.value);
        });
      }
    }, 200);

    // zone change -> load centres
    setTimeout(() => {
      const zoneSelect = document.getElementById("seatZoneSelect");
      if (zoneSelect) {
        zoneSelect.addEventListener("change", function () {
          loadCentresForSeatBooking(this.value);
        });
      }
    }, 200);

    async function loadSectionsForSeatBooking(centreId) {
      if (!centreId) return;

      try {
        const response = await fetch("http://localhost:8087/api/sections");
        const sections = await response.json();

        const sectionSelect = document.getElementById("seatSectionSelect");

        if (!sectionSelect) return;

        sectionSelect.innerHTML = '<option value="">Select Section</option>';

        sections
          .filter((s) => s.centre && s.centre.id == centreId)
          .forEach((section) => {
            const option = document.createElement("option");

            option.value = section.id;
            option.textContent = section.name;

            sectionSelect.appendChild(option);
          });
      } catch (error) {
        console.error("Error loading sections:", error);
      }
    }

  } else if (["subadmin", "coadmin", "vendor", "canteen-man"].includes(page)) {
    let role = document.getElementById(`l-${page}`).innerText;

    let acts =
      page === "vendor" || page === "canteen-man"
        ? '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button> <button class="btn btn-info btn-sm text-white fw-bold">Booking List</button>'
        : '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button>';

    root.innerHTML = `

<div class="card-pro mx-auto" style="max-width: 800px;">
<h4>Register ${role}</h4>

<div class="row g-3">

<div class="col-md-6">
<label class="form-label">Full Name</label>
<input type="text" class="form-control" placeholder="Full Name">
</div>

<div class="col-md-6">
<label class="form-label">Mobile</label>
<input type="text" class="form-control" placeholder="Mobile Number">
</div>

<div class="col-12">
<label class="form-label">Email</label>

<div class="input-group">
<input type="email" class="form-control" placeholder="Email" autocomplete="off">
<button class="btn btn-dark" onclick="showOTP('rO')">Send OTP</button>
</div>

<div id="rO" class="otp-dropdown">
<p class="small fw-bold">Enter Otp</p>

<div class="d-flex gap-2">
<input type="text" id="rIn" class="form-control w-25 text-center" placeholder="OTP">
<button class="btn btn-primary" onclick="vOTP('rO','rIn')">Verify OTP</button>
</div>

</div>
</div>

<div class="col-md-6">
<label class="form-label">Create Password</label>

<div class="input-group">
<input type="password" id="p1" class="form-control pass-f" placeholder="Password" autocomplete="new-password">
<span class="input-group-text eye-btn" onclick="eye('p1')">
<i class="bi bi-eye"></i>
</span>
</div>

</div>

<div class="col-md-6">
<label class="form-label">Confirm Password</label>

<div class="input-group">
<input type="password" id="p2" class="form-control pass-f" placeholder="Confirm Password" autocomplete="new-password">
<span class="input-group-text eye-btn" onclick="eye('p2')">
<i class="bi bi-eye"></i>
</span>
</div>

</div>
${page === "vendor" ? `
<div class="col-md-6">
<label class="form-label">Select Zone</label>
<select id="vendorZoneSelect" class="form-select">
<option value="">Select Zone</option>
</select>
</div>

<div class="col-md-6">
<label class="form-label">Commission (%)</label>
<input type="number" id="vendorCommission" class="form-control"
placeholder="Enter commission %">
</div>

<div class="col-12">
<label class="form-label">Select Centres</label>
<div id="vendorCentreList" class="border rounded p-3">
Loading centres...
</div>
</div>
` : ``}
<div class="col-12 text-end mt-3">
<button id="subadminBtn" class="btn btn-primary px-5"
onclick="${
  page === 'vendor'
    ? 'registerVendor()'
    : page === 'coadmin'
    ? 'registerCoadmin()'
    : 'registerSubadmin()'
}">Register</button>
</div>

</div>
</div>


<div class="card-pro">

<h5 class="fw-bold mb-3">${role} List</h5>

<div class="table-responsive">

<table class="table">

<thead>
<tr>
<th>Name</th>
<th>Email</th>

${page === "vendor" ? `
<th>Zone</th>
<th>Centres</th>
<th>Commission</th>
` : ``}

<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody id="${page}Table">

<tr>
<td colspan="3" class="text-center">Loading...</td>
</tr>

</tbody>

</table>

</div>

</div>

`;

    setTimeout(() => {
      loadUsersByRole(page);
    }, 100);

    if (page === "vendor") {
      setTimeout(loadVendorZones, 200);
    }

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
      });
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
      });

    document
      .getElementById("shiftCentreSelect")
      .addEventListener("change", function () {
        loadSectionsForShift(this.value);
      });
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

<div class="col-md-12">
<label class="form-label">Applicable For</label>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="studentCheck">
<label class="form-check-label">Student</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="vendorCheck">
<label class="form-check-label">Vendor</label>
</div>

<div class="form-check">
<input class="form-check-input" type="checkbox" id="allUserCheck" checked>
<label class="form-check-label">All</label>
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

<div class="col-md-6">
<label class="form-label">Discount Type</label>
<select id="discountType" class="form-select">
  <option value="PERCENTAGE">Percentage</option>
  <option value="FLAT">Flat</option>
</select>
</div>

<div class="col-md-6">
<label class="form-label">Discount Value</label>
<input type="number" id="discountValue" class="form-control">
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

<div class="col-md-4">
<label class="small fw-bold">Search</label>
<div class="input-group">
  <span class="input-group-text"><i class="bi bi-search"></i></span>
  <input type="text" id="bookingSearch" class="form-control" placeholder="Search by name...">
</div>
</div>

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
<label class="small fw-bold">Start Date</label>
<input type="date" id="filterStartDate" class="form-control">
</div>

<div class="col-md-3">
<label class="small fw-bold">End Date</label>
<input type="date" id="filterEndDate" class="form-control">
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
            <div class="table-responsive mt-4"><table class="table"><thead>
<tr>
<th>Name</th>
<th>Mobile</th>
<th>Email</th>
<th>Zone</th>
<th>Centre</th>
<th>Section</th>
<th>Shift Timing</th>
<th>Seat</th>
<th>Start Date</th>
<th>Expiry Date</th>
<th>Status</th>
<th style="min-width:120px">Action</th>
</tr>
</thead><tbody id="bookingTableBody"></tbody></table></div></div>`;

    loadBookings();
    loadFilterZones();

  setTimeout(() => {
  document
    .getElementById("applyFilterBtn")
    ?.addEventListener("click", applyBookingFilter);
}, 100);

document.getElementById("bookingSearch")
  ?.addEventListener("input", applyBookingFilter);
  }
}


async function applyBookingFilter() {
  const zone = document.getElementById("filterZone").value;
  const centre = document.getElementById("filterCentre").value;

  const startDate = document.getElementById("filterStartDate")?.value;
const endDate = document.getElementById("filterEndDate")?.value;

  let url = "http://localhost:8087/api/bookings";

  if (zone) {
    url += "?zoneId=" + zone;
  }

  const response = await fetch(url);
  const bookings = await response.json();

  console.log("BOOKINGS DATA:", bookings);
 

  let filtered = bookings;

  const search = document.getElementById("bookingSearch")?.value?.toLowerCase();
  console.log("SEARCH VALUE:", search);

if (search) {
  filtered = filtered.filter(b => {
    const name = b.student?.fullname?.toLowerCase() || "";
    const email = b.student?.email?.toLowerCase() || "";
    const mobile = (b.student?.mobile || "").toLowerCase();

    return (
      name.includes(search) ||
      email.includes(search) ||
      mobile.includes(search)
    );
  });
}

if (centre) {
  filtered = filtered.filter(b =>
    b.shift?.section?.centre?.id == centre
  );
}


if (startDate) {
  filtered = filtered.filter(b =>
    b.shift?.startDate && new Date(b.shift.startDate) >= new Date(startDate)
  );
}

if (endDate) {
  filtered = filtered.filter(b =>
    b.shift?.startDate && new Date(b.shift.startDate) <= new Date(endDate)
  );
}

  const table = document.getElementById("bookingTableBody");
  table.innerHTML = "";

  if (filtered.length === 0) {
  table.innerHTML = `
    <tr>
      <td colspan="12" class="text-center text-muted py-4">
        No bookings found
      </td>
    </tr>
  `;
  return;
}

  filtered.forEach((b) => {
const today = new Date();
today.setHours(0,0,0,0);

let expiry = b.shift?.expiryDate ? new Date(b.shift.expiryDate) : null;

if (expiry) {
  expiry.setHours(0,0,0,0);
}

let statusText = "Active";
let statusColor = "success";

// 1️⃣ पहले Pending check होगा
if (!b.payment) {
    statusText = "Pending";
    statusColor = "warning";
}
// 2️⃣ फिर Expired
else if (expiry && expiry < today) {
    statusText = "Expired";
    statusColor = "secondary";
}
// 3️⃣ बाकी सब Active

let row = `
<tr>
    <td>${b.student?.fullname || "-"}</td>
    <td>${b.student?.mobile || "-"}</td>
    <td>${b.student?.email || "-"}</td>
    <td>${b.shift?.section?.centre?.zone?.zoneName || "-"}</td>
    <td>${b.shift?.section?.centre?.centreName || "-"}</td>
    <td>${b.shift?.section?.name || "-"}</td>
    <td>${b.shift?.startTime || "-"}</td>
    <td>${b.seat?.seatNumber || "-"}</td>
   <td>${b.shift?.startDate ? new Date(b.shift.startDate).toLocaleDateString() : "-"}</td>
<td>${b.shift?.expiryDate ? new Date(b.shift.expiryDate).toLocaleDateString() : "-"}</td>
    <td><span class="badge bg-${statusColor}">${statusText}</span></td>
    
    <td>
      <button class="btn btn-danger btn-sm" onclick="removeBooking(${b.id})">
        Remove
      </button>
    </td>
</tr>
`;

    table.innerHTML += row;
  });
}


