let editingId = null;

async function registerCoadmin() {

  const fullname = document.querySelector("input[placeholder='Full Name']").value;
  const mobile = document.querySelector("input[placeholder='Mobile Number']").value;
  const email = document.querySelector("input[placeholder='Email']").value;
  const password = document.getElementById("p1").value;

  if (!fullname || !mobile || !email || !password) {
    alert("All fields required");
    return;
  }

  try {

    const url = editingId
      ? `http://localhost:8087/api/coadmin/${editingId}`
      : "http://localhost:8087/api/coadmin";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullname,
        mobile,
        email,
        password
      })
    });

    if (res.ok) {

      alert(editingId ? "CoAdmin Updated Successfully" : "CoAdmin Registered Successfully");

      // reset state
      editingId = null;

      // reset form
      document.querySelector("input[placeholder='Full Name']").value = "";
      document.querySelector("input[placeholder='Mobile Number']").value = "";
      document.querySelector("input[placeholder='Email']").value = "";
      document.getElementById("p1").value = "";

      // button back to normal
      document.getElementById("subadminBtn").innerText = "Register";

      loadUsersByRole("coadmin");

    } else {
      alert("Error creating coadmin");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}


async function editUser(role, id) {

  editingId = id;

  const res = await fetch("http://localhost:8087/api/coadmin/list");
  const data = await res.json();

  const user = data.find(u => u.id == id);

  if (!user) return;

  document.querySelector("input[placeholder='Full Name']").value = user.fullname || "";
  document.querySelector("input[placeholder='Mobile Number']").value = user.mobile || "";
  document.querySelector("input[placeholder='Email']").value = user.email || "";

  // button text change
  document.getElementById("subadminBtn").innerText = "Update";
}

function editCoadmin(id){
  editUser("coadmin", id);
}

async function toggleCoadmin(id){

  if(!confirm("Change coadmin status?")) return;

  try{
    const res = await fetch(
      "http://localhost:8087/api/coadmin/block/" + id,
      {
        method: "PUT"
      }
    );

    const data = await res.json();

    alert(data.message);

    // reload list
    loadUsersByRole("coadmin");

  }catch(err){
    console.error(err);
    alert("Error changing status");
  }
}