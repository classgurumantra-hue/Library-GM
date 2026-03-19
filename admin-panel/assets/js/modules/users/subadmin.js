async function registerSubadmin(){

  const fullname = document.querySelector("input[placeholder='Full Name']").value;
  const mobile = document.querySelector("input[placeholder='Mobile Number']").value;
  const email = document.querySelector("input[type='email']").value;
  const password = document.getElementById("p1").value;
  const confirmPassword = document.getElementById("p2").value;

  if(!fullname || !mobile || !email){
    alert("Please fill all fields");
    return;
  }

  if(password !== confirmPassword){
    alert("Passwords do not match");
    return;
  }

  try{

    let url = "http://localhost:8087/api/subadmin/register";
    let method = "POST";

    // EDIT MODE
    if(window.editingSubadminId){
     url = "http://localhost:8087/api/subadmin/" + window.editingSubadminId;
      method = "PUT";
    }

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
        gender: "Female"
      })
    });

    const data = await res.json();

    alert(data.message);

    // reset form
    document.querySelector("input[placeholder='Full Name']").value="";
    document.querySelector("input[placeholder='Mobile Number']").value="";
    document.querySelector("input[type='email']").value="";
    document.getElementById("p1").value="";
    document.getElementById("p2").value="";

    window.editingSubadminId = null;
    document.getElementById("subadminBtn").innerText = "Register";

    loadSubadmins();

  }catch(err){
    console.error(err);
    alert("Subadmin save failed");
  }

}

async function loadSubadmins(){

  try{

    const res = await fetch("http://localhost:8087/api/subadmin/list");
    const data = await res.json();

    const table = document.getElementById("subadminTable");

    if(!data.length){
      table.innerHTML = "<tr><td colspan='4' class='text-center'>No Subadmins Found</td></tr>";
      return;
    }

    let html = "";

    data.forEach(u => {

 const statusBadge = !u.blocked
  ? `<span class="badge bg-success">Active</span>`
  : `<span class="badge bg-danger">Blocked</span>`;

const actionButton = !u.blocked
  ? `<button class="btn btn-danger btn-sm" onclick="blockSubadmin(${u.id})">Block</button>`
  : `<button class="btn btn-warning btn-sm" onclick="blockSubadmin(${u.id})">Unblock</button>`;
      html += `
        <tr>
          <td>${u.fullname}</td>
          <td>${u.email}</td>
          <td>${statusBadge}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="editSubadmin(${u.id})">Edit</button>
            ${actionButton}
          </td>
        </tr>
      `;
    });

    table.innerHTML = html;

  }catch(err){
    console.error("Subadmin load error", err);
  }

}
async function editSubadmin(id){

  try{

    const res = await fetch("http://localhost:8087/api/subadmin/list");
    const data = await res.json();

    const user = data.find(u => u.id === id);

    if(!user){
      alert("Subadmin not found");
      return;
    }

    // form fill
    document.querySelector("input[placeholder='Full Name']").value = user.fullname || "";
    document.querySelector("input[placeholder='Mobile Number']").value = user.mobile || "";
    document.querySelector("input[type='email']").value = user.email || "";

    window.editingSubadminId = id;

    // button change
    document.getElementById("subadminBtn").innerText = "Update";

    // scroll to form
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }catch(err){
    console.error(err);
    alert("Failed to load subadmin");
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

