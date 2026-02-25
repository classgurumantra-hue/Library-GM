
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
    if (link.getAttribute("href").includes(currentPath)) {
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
    root.innerHTML = `<div class="card-pro"><h4 class="fw-bold mb-4">Register Student List</h4><div class="table-responsive"><table class="table align-middle"><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Reg. Date</th><th>Coins</th><th>History</th><th>Actions</th></tr></thead><tbody><tr><td class="fw-bold">Rahul Sharma</td><td>rahul@test.com</td><td>+91 99988 77766</td><td>18-02-2026</td><td><span class="badge bg-success-subtle text-success px-3">450</span></td><td><button class="btn btn-light btn-sm border"><i class="bi bi-clock-history"></i> History</button></td><td><div class="d-flex gap-2"><button class="btn btn-outline-danger btn-sm px-3"><i class="bi bi-chair-fill"></i> Seat</button><button class="btn btn-warning btn-sm fw-bold">Block</button></div></td></tr></tbody></table></div></div>`;
  } else if (page === "admin") {
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 800px;">
            <h4 class="fw-bold mb-4">Admin Profile Settings</h4>
            <div class="profile-item border-bottom py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Name</p><h6 class="fw-bold mb-0">Super Admin</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eN')">Edit</button></div>
            <div id="eN" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><input type="text" class="form-control mb-2" placeholder="Enter Full Name"><button class="btn btn-primary btn-sm" onclick="save()">Save</button></div>
            <div class="profile-item border-bottom py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Mobile</p><h6 class="fw-bold mb-0">+91 98765 43210</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eM')">Edit</button></div>
            <div id="eM" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><input type="text" class="form-control mb-2" placeholder="Enter Mobile Number"><button class="btn btn-primary btn-sm" onclick="save()">Save</button></div>
            <div class="profile-item border-bottom py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Email</p><h6 class="fw-bold mb-0">admin@libpro.com</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eE')">Edit</button></div>
            <div id="eE" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><div class="input-group mb-2"><input type="email" class="form-control" placeholder="Enter New Email"><button class="btn btn-dark" onclick="showOTP('admO')">Verify</button></div><div id="admO" class="otp-dropdown"><p class="small fw-bold">Demo OTP: 2026</p><div class="d-flex gap-2"><input type="text" id="admIn" class="form-control w-25 text-center" placeholder="OTP"><button class="btn btn-primary" onclick="vOTP('admO', 'admIn')">Verify OTP</button></div></div><button class="btn btn-primary btn-sm mt-2" onclick="save()">Save Email</button></div>
            <div class="profile-item py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Password Security</p><h6 class="fw-bold mb-0">••••••••••••</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eP')">Edit</button></div>
            <div id="eP" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><div class="mb-3"><label class="small fw-bold">New Password</label><div class="input-group"><input type="password" id="ap1" class="form-control pass-f" placeholder="New Password"><span class="input-group-text eye-btn" onclick="eye('ap1')"><i class="bi bi-eye"></i></span></div></div><button class="btn btn-primary btn-sm w-100" onclick="save()">Update Password</button></div>
        </div>`;
  }
  // ... baki saari else if conditions bhi yahan copy kar lena ...
  else if (["subadmin", "coadmin", "vendor", "canteen-man"].includes(page)) {
    let role = document.getElementById(`l-${page}`).innerText;
    let acts =
      page === "vendor" || page === "canteen-man"
        ? '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button> <button class="btn btn-info btn-sm text-white fw-bold">Booking List</button>'
        : '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button>';
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 800px;"><h4>Register ${role}</h4><div class="row g-3"><div class="col-md-6"><label class="form-label">Full Name</label><input type="text" class="form-control" placeholder="Full Name"></div><div class="col-md-6"><label class="form-label">Mobile</label><input type="text" class="form-control" placeholder="Mobile Number"></div><div class="col-12"><label class="form-label">Email</label><div class="input-group"><input type="email" class="form-control" placeholder="Email"><button class="btn btn-dark" onclick="showOTP('rO')">Send OTP</button></div><div id="rO" class="otp-dropdown"><p class="small fw-bold">Demo OTP: 2026</p><div class="d-flex gap-2"><input type="text" id="rIn" class="form-control w-25 text-center" placeholder="OTP"><button class="btn btn-primary" onclick="vOTP('rO', 'rIn')">Verify OTP</button></div></div></div><div class="col-md-6"><label class="form-label">Create Password</label><div class="input-group"><input type="password" id="p1" class="form-control pass-f" placeholder="Password"><span class="input-group-text eye-btn" onclick="eye('p1')"><i class="bi bi-eye"></i></span></div></div><div class="col-md-6"><label class="form-label">Confirm Password</label><div class="input-group"><input type="password" id="p2" class="form-control pass-f" placeholder="Confirm Password"><span class="input-group-text eye-btn" onclick="eye('p2')"><i class="bi bi-eye"></i></span></div></div><div class="col-12 text-end mt-3"><button class="btn btn-primary px-5">Register</button></div></div></div><div class="card-pro"><h5 class="fw-bold mb-3">${role} List</h5><div class="table-responsive"><table class="table"><thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead><tbody><tr><td>Demo User</td><td>test@lib.com</td><td>${acts}</td></tr></tbody></table></div></div>`;
  }
  // ... (rest of your logic conditions)
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
    root.innerHTML = `<div class="card-pro"><h4 class="fw-bold mb-4">Register Student List</h4><div class="table-responsive"><table class="table align-middle"><thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Reg. Date</th><th>Coins</th><th>History</th><th>Actions</th></tr></thead><tbody><tr><td class="fw-bold">Rahul Sharma</td><td>rahul@test.com</td><td>+91 99988 77766</td><td>18-02-2026</td><td><span class="badge bg-success-subtle text-success px-3">450</span></td><td><button class="btn btn-light btn-sm border"><i class="bi bi-clock-history"></i> History</button></td><td><div class="d-flex gap-2"><button class="btn btn-outline-danger btn-sm px-3"><i class="bi bi-chair-fill"></i> Seat</button><button class="btn btn-warning btn-sm fw-bold">Block</button></div></td></tr></tbody></table></div></div>`;
  } else if (page === "admin") {
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 800px;">
            <h4 class="fw-bold mb-4">Admin Profile Settings</h4>
            <div class="profile-item border-bottom py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Name</p><h6 class="fw-bold mb-0">Super Admin</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eN')">Edit</button></div>
            <div id="eN" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><input type="text" class="form-control mb-2" placeholder="Enter Full Name"><button class="btn btn-primary btn-sm" onclick="save()">Save</button></div>
            <div class="profile-item border-bottom py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Mobile</p><h6 class="fw-bold mb-0">+91 98765 43210</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eM')">Edit</button></div>
            <div id="eM" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><input type="text" class="form-control mb-2" placeholder="Enter Mobile Number"><button class="btn btn-primary btn-sm" onclick="save()">Save</button></div>
            <div class="profile-item border-bottom py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Email</p><h6 class="fw-bold mb-0">admin@libpro.com</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eE')">Edit</button></div>
            <div id="eE" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><div class="input-group mb-2"><input type="email" class="form-control" placeholder="Enter New Email"><button class="btn btn-dark" onclick="showOTP('admO')">Verify</button></div><div id="admO" class="otp-dropdown"><p class="small fw-bold">Demo OTP: 2026</p><div class="d-flex gap-2"><input type="text" id="admIn" class="form-control w-25 text-center" placeholder="OTP"><button class="btn btn-primary" onclick="vOTP('admO', 'admIn')">Verify OTP</button></div></div><button class="btn btn-primary btn-sm mt-2" onclick="save()">Save Email</button></div>
            <div class="profile-item py-3 d-flex justify-content-between"><div><p class="text-muted small mb-0">Password Security</p><h6 class="fw-bold mb-0">••••••••••••</h6></div><button class="btn btn-sm btn-light border" onclick="tglE('eP')">Edit</button></div>
            <div id="eP" class="edit-box p-3 bg-light rounded mt-2" style="display:none;"><div class="mb-3"><label class="small fw-bold">New Password</label><div class="input-group"><input type="password" id="ap1" class="form-control pass-f" placeholder="New Password"><span class="input-group-text eye-btn" onclick="eye('ap1')"><i class="bi bi-eye"></i></span></div></div><button class="btn btn-primary btn-sm w-100" onclick="save()">Update Password</button></div>
        </div>`;
  } else if (["subadmin", "coadmin", "vendor", "canteen-man"].includes(page)) {
    let role = document.getElementById(`l-${page}`).innerText;
    let acts =
      page === "vendor" || page === "canteen-man"
        ? '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button> <button class="btn btn-info btn-sm text-white fw-bold">Booking List</button>'
        : '<button class="btn btn-primary btn-sm">Edit</button> <button class="btn btn-warning btn-sm fw-bold">Block</button>';
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 800px;"><h4>Register ${role}</h4><div class="row g-3"><div class="col-md-6"><label class="form-label">Full Name</label><input type="text" class="form-control" placeholder="Full Name"></div><div class="col-md-6"><label class="form-label">Mobile</label><input type="text" class="form-control" placeholder="Mobile Number"></div><div class="col-12"><label class="form-label">Email</label><div class="input-group"><input type="email" class="form-control" placeholder="Email"><button class="btn btn-dark" onclick="showOTP('rO')">Send OTP</button></div><div id="rO" class="otp-dropdown"><p class="small fw-bold">Demo OTP: 2026</p><div class="d-flex gap-2"><input type="text" id="rIn" class="form-control w-25 text-center" placeholder="OTP"><button class="btn btn-primary" onclick="vOTP('rO', 'rIn')">Verify OTP</button></div></div></div><div class="col-md-6"><label class="form-label">Create Password</label><div class="input-group"><input type="password" id="p1" class="form-control pass-f" placeholder="Password"><span class="input-group-text eye-btn" onclick="eye('p1')"><i class="bi bi-eye"></i></span></div></div><div class="col-md-6"><label class="form-label">Confirm Password</label><div class="input-group"><input type="password" id="p2" class="form-control pass-f" placeholder="Confirm Password"><span class="input-group-text eye-btn" onclick="eye('p2')"><i class="bi bi-eye"></i></span></div></div><div class="col-12 text-end mt-3"><button class="btn btn-primary px-5">Register</button></div></div></div><div class="card-pro"><h5 class="fw-bold mb-3">${role} List</h5><div class="table-responsive"><table class="table"><thead><tr><th>Name</th><th>Email</th><th>Actions</th></tr></thead><tbody><tr><td>Demo User</td><td>test@lib.com</td><td>${acts}</td></tr></tbody></table></div></div>`;
  } else if (page === "create-zone") {
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 700px;"><h4>Create Zone</h4><div class="row g-3"><div class="col-12"><label class="form-label">Name</label><input type="text" class="form-control" placeholder="Zone Name"></div><div class="col-12"><label class="form-label">Select State</label><select class="form-select"><option>Madhya Pradesh</option></select></div><div class="col-12"><label class="form-label">Upload</label><input type="file" class="form-control"></div><div class="col-12"><label class="form-label">Description</label><textarea class="form-control" placeholder="Description"></textarea></div><div class="col-12 mt-3"><button class="btn btn-primary w-100">Submit</button></div></div></div>`;
  } else if (page === "create-centre") {
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 750px;"><h4>Create Centre</h4><div class="row g-3"><div class="col-md-6"><label class="form-label">Name</label><input type="text" class="form-control" placeholder="Centre Name"></div><div class="col-md-6"><label class="form-label">Select Zone</label><select class="form-select"><option>Zone 1</option></select></div><div class="col-md-6"><label class="form-label">Admission fee</label><input type="number" class="form-control" placeholder="0"></div><div class="col-md-6"><label class="form-label">Seat Capacity</label><input type="number" class="form-control" placeholder="0"></div><div class="col-12"><label class="form-label">Upload</label><input type="file" class="form-control"></div><div class="col-12"><label class="form-label">Description</label><textarea class="form-control" placeholder="Description"></textarea></div><div class="col-12 mt-3"><button class="btn btn-primary w-100">Submit</button></div></div></div>`;
  } else if (page === "create-section") {
    root.innerHTML = `<div class="card-pro mx-auto" style="max-width: 800px;"><h4>Create Section</h4><div class="row g-3"><div class="col-md-4"><label class="form-label">Name</label><input type="text" class="form-control" placeholder="Section Name"></div><div class="col-md-4"><label class="form-label">Select Zone</label><select class="form-select"><option>Zone 1</option></select></div><div class="col-md-4"><label class="form-label">Select Centres</label><select class="form-select"><option>Centre A</option></select></div><div class="col-md-3"><label class="form-label">Start Seat Number</label><input type="number" class="form-control"></div><div class="col-md-3"><label class="form-label">End Seat Number</label><input type="number" class="form-control"></div><div class="col-md-3"><label class="form-label">Total Raw</label><input type="number" class="form-control"></div><div class="col-md-3"><label class="form-label">Total coloumn</label><input type="number" class="form-control"></div><div class="col-12 mt-3 text-end"><button class="btn btn-primary px-5">Submit</button></div></div></div>`;
  } else if (page === "create-shift") {
    root.innerHTML = `<div class="card-pro"><h4>Create Shift</h4><div class="row g-3">
            <div class="col-md-4"><label class="form-label">Name</label><input type="text" class="form-control" placeholder="Shift Name"></div>
            <div class="col-md-4"><label class="form-label">Select Zone</label><select class="form-select"><option>Zone 1</option></select></div>
            <div class="col-md-4"><label class="form-label">Select Centres</label><select class="form-select"><option>Centre A</option></select></div>
            <div class="col-md-4"><label class="form-label">Select Section</label><select class="form-select"><option>Section 1</option></select></div>
            <div class="col-md-4"><label class="form-label">Start time</label><input type="time" class="form-control"></div>
            <div class="col-md-4"><label class="form-label">Shift duration in minutes</label><input type="number" class="form-control" placeholder="120"></div>
            <div class="col-md-4"><label class="form-label">MRP</label><input type="number" class="form-control" placeholder="0"></div>
            <div class="col-md-4"><label class="form-label">Discount</label><input type="number" class="form-control" placeholder="0"></div>
            <div class="col-md-4"><label class="form-label">Price</label><input type="number" class="form-control" placeholder="0"></div>
            <div class="col-md-4"><label class="form-label">Coin limit usage box</label><input type="number" class="form-control" placeholder="Max coins"></div>
            <div class="col-md-4"><label class="form-label">Duration</label><input type="text" class="form-control" placeholder="e.g. 2 Hours"></div>
            <div class="col-md-4"><label class="form-label">Interval</label><input type="text" class="form-control" placeholder="Break time"></div>
            <div class="col-md-12"><label class="form-label">Upload </label><input type="file" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 90 Days %</label><input type="number" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 180 Days %</label><input type="number" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 270 Days %</label><input type="number" class="form-control"></div>
            <div class="col-md-3"><label class="form-label">Discount 360 Days %</label><input type="number" class="form-control"></div>
            <div class="col-12 mt-4 text-end"><button class="btn btn-primary px-5">Submit</button></div>
        </div></div>`;
  } else if (page === "booking-history") {
    root.innerHTML = `<div class="card-pro"><h4>Booking History List</h4><h6 class="text-muted mb-4">Show All Booking</h6><div class="filter-section">
            <h6 class="fw-bold mb-3"><i class="bi bi-funnel"></i> Filter system</h6><div class="row g-3">
            <div class="col-md-3"><label class="small fw-bold">Choose zone</label><div class="check-group"><div class="form-check"><input class="form-check-input" type="checkbox" id="z1"><label class="form-check-label small" for="z1">Zone 1</label></div></div></div>
            <div class="col-md-3"><label class="small fw-bold">Choose Centre</label><div class="check-group"><div class="form-check"><input class="form-check-input" type="checkbox" id="c1"><label class="form-check-label small" for="c1">Centre A</label></div></div></div>
            <div class="col-md-3"><label class="small fw-bold">Choose Section</label><div class="check-group"><div class="form-check"><input class="form-check-input" type="checkbox" id="s1"><label class="form-check-label small" for="s1">Section 1</label></div></div></div>
            <div class="col-md-3"><label class="small fw-bold">Choose Shift</label><div class="check-group"><div class="form-check"><input class="form-check-input" type="checkbox" id="sh1"><label class="form-check-label small" for="sh1">Shift 1</label></div></div></div>
            <div class="col-12 mt-3"><button class="btn btn-primary px-4 fw-bold">Apply button</button></div></div></div>
            <div class="table-responsive mt-4"><table class="table"><thead><tr><th>ID</th><th>User</th><th>Seat</th><th>Status</th></tr></thead><tbody><tr><td>#101</td><td>Rahul Sharma</td><td>A-45</td><td><span class="badge bg-success">Confirmed</span></td></tr></tbody></table></div></div>`;
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
