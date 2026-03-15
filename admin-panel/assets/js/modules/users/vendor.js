async function loadUsersByRole(page){

  let roleMap = {
    "subadmin": "SUB_ADMIN",
    "coadmin": "CO_ADMIN",
    "vendor": "VENDOR",
    "canteen-man": "CANTEEN_MAN"
  };

  const role = roleMap[page];

  if(!role) return;

  try{

    const res = await fetch("http://localhost:8087/api/auth/role/" + role);
    const users = await res.json();

    const table = document.getElementById("subadminTable");

    if(!table) return;

    table.innerHTML = "";

    if(!users.length){
      table.innerHTML = `
        <tr>
          <td colspan="7" class="text-center">No users found</td>
        </tr>
      `;
      return;
    }

    users.forEach(u => {

      const statusBadge = !u.blocked
      ? `<span class="badge bg-success">Active</span>`
      : `<span class="badge bg-danger">Blocked</span>`;

      const zoneName = u.zone ? u.zone.zoneName : "-";

      const centres = u.centre ? u.centre.centreName : "-";

      const commission = u.commission || "-";

table.innerHTML += `
<tr>

<td>${u.fullname || "-"}</td>

<td>${u.email}</td>

${role === "VENDOR" ? `
<td>${zoneName}</td>
<td>${centres}</td>
<td>${commission}</td>
` : ``}

<td>${statusBadge}</td>

<td>

<button class="btn btn-primary btn-sm"
onclick="editVendor(${u.id})">
Edit
</button>

<button class="btn btn-warning btn-sm"
onclick="blockSubadmin(${u.id})">
${u.blocked ? "Unblock" : "Block"}
</button>

</td>

</tr>
`;

    });

  }catch(err){
    console.error("Role load error", err);
  }

}

async function loadVendorZones(){

  const res = await fetch("http://localhost:8087/api/zones");
  const zones = await res.json();

  const zoneSelect = document.getElementById("vendorZoneSelect");

  if(!zoneSelect) return;

  zoneSelect.innerHTML = '<option value="">Select Zone</option>';

  zones.forEach(z=>{
    zoneSelect.innerHTML += `<option value="${z.id}">${z.zoneName}</option>`;
  });

  zoneSelect.addEventListener("change", function(){
      loadVendorCentres(this.value);
  });

}

async function loadVendorCentres(zoneId){

  const res = await fetch("http://localhost:8087/api/centres");
  const centres = await res.json();

  const box = document.getElementById("vendorCentreList");

  if(!box) return;

  box.innerHTML = "";

  centres
  .filter(c => c.zone && c.zone.id == zoneId)
  .forEach(c => {

    box.innerHTML += `
      <div class="form-check">
        <input class="form-check-input vendor-centre"
        type="checkbox"
        value="${c.id}">

        <label class="form-check-label">
          ${c.centreName}
        </label>
      </div>
    `;

  });

}

async function registerVendor(){

  const fullname = document.querySelector("input[placeholder='Full Name']").value;
  const mobile = document.querySelector("input[placeholder='Mobile Number']").value;
  const email = document.querySelector("input[type='email']").value;
  const password = document.getElementById("p1").value;
  const confirmPassword = document.getElementById("p2").value;
  const commissionEl = document.getElementById("vendorCommission");
const commission = commissionEl ? commissionEl.value : null;
 const zoneEl = document.getElementById("vendorZoneSelect");
const zoneId = zoneEl ? zoneEl.value : null;

  const centres = [];
  document.querySelectorAll(".vendor-centre:checked").forEach(c => {
    centres.push(Number(c.value));
  });

  if(!fullname || !mobile || !email){
    alert("Please fill all fields");
    return;
  }

  if(password !== confirmPassword){
    alert("Passwords do not match");
    return;
  }

  try{

    const url = editingVendorId
      ? "http://localhost:8087/api/auth/vendor/update/" + editingVendorId
      : "http://localhost:8087/api/auth/vendor/register";

    const method = editingVendorId ? "PUT" : "POST";

    const res = await fetch(url,{
      method: method,
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        fullname: fullname,
        mobile: mobile,
        email: email,
        username: email,
        password: password,
        role: "VENDOR",
        commission: Number(commission),
        zoneId: Number(zoneId),
        centreIds: centres
      })
    });

    const data = await res.json();

    alert(data.message || "Vendor saved");

    editingVendorId = null;

    loadUsersByRole("vendor"); // reload vendor page

  }catch(err){
    console.error(err);
    alert("Vendor save failed");
  }

}

let editingVendorId = null;

async function editVendor(id){

  try{

    editingVendorId = id;

    const res = await fetch("http://localhost:8087/api/auth/user/" + id);
    const data = await res.json();

    // form fill
    document.querySelector("input[placeholder='Full Name']").value = data.fullname || "";
    document.querySelector("input[placeholder='Mobile Number']").value = data.mobile || "";
    document.querySelector("input[type='email']").value = data.email || "";

    document.getElementById("vendorCommission").value = data.commission || "";

    // zone select
    if(data.zoneId){
      document.getElementById("vendorZoneSelect").value = data.zoneId;

      // centre reload
      await loadVendorCentres(data.zoneId);

      // centre select
      if(data.centreId){
        document.querySelectorAll(".vendor-centre").forEach(c=>{
          if(Number(c.value) === data.centreId){
            c.checked = true;
          }
        });
      }
    }

    // scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }catch(err){
    console.error(err);
    alert("Vendor load failed");
  }

}

async function blockSubadmin(id){

  if(!confirm("Change subadmin status?")){
    return;
  }

  try{

    const res = await fetch(
      "http://localhost:8087/api/subadmin/block/" + id,
      {
        method:"PUT"
      }
    );

    const data = await res.json();

    alert(data.message);

    // force reload table
    setTimeout(() => {
      loadSubadmins();
    },300);

  }catch(err){
    console.error(err);
    alert("Error changing status");
  }

}
// Hide delete buttons for SUB_ADMIN
document.addEventListener("DOMContentLoaded", function () {

  if(localStorage.getItem("role") === "SUB_ADMIN"){

    document.querySelectorAll("[onclick^='delete']").forEach(btn => {
      btn.style.display = "none";
    });

  }

});