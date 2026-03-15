async function createCentre() {

  const name = document.querySelector('input[placeholder="Centre Name"]').value;

  const zoneId = document.getElementById("centreZoneSelect").value;

  const admissionFee = document.querySelector('input[placeholder="0"]').value;

  const seatCapacity = document.querySelectorAll('input[placeholder="0"]')[1].value;

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

    });

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



async function loadCentresForSeatBooking(zoneId) {

  if (!zoneId) return;

  try {

    const response = await fetch(`http://localhost:8087/api/centres/zone/${zoneId}`);
    const centres = await response.json();

    const centreSelect = document.getElementById("seatCentreSelect");

    if (!centreSelect) return;

    centreSelect.innerHTML = '<option value="">Select Centre</option>';

    centres.forEach((centre) => {

      const option = document.createElement("option");

      option.value = centre.id;
      option.textContent = centre.centreName;

      centreSelect.appendChild(option);

    });

  } catch (error) {

    console.error("Error loading centres:", error);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    alert("Error loading centre");
  }
}


async function deleteCentre(centreId) {

  if(role === "SUB_ADMIN"){
  alert("Subadmin cannot delete data");
  return;
}
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
    });
  } catch (error) {
    console.error("Error loading centres:", error);
  }
}


async function loadCentresForSeatBooking(zoneId) {

  if (!zoneId) return;

  try {

    const response = await fetch(`http://localhost:8087/api/centres/zone/${zoneId}`);
    const centres = await response.json();

    const centreSelect = document.getElementById("seatCentreSelect");

    if (!centreSelect) return;

    centreSelect.innerHTML = '<option value="">Select Centre</option>';

    centres.forEach((centre) => {

      const option = document.createElement("option");

      option.value = centre.id;
      option.textContent = centre.centreName;

      centreSelect.appendChild(option);

    });

  } catch (error) {

    console.error("Error loading centres:", error);

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
    });
  } catch (error) {
    console.error("Error loading centres:", error);
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
    });
  } catch (err) {
    console.error(err);
  }
  hideDeleteForSubadmin();
}
