async function createZone() {
  const zoneName = document.querySelector(
    "input[placeholder='Zone Name']"
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

    if (window.editingZoneId) {
      url = "http://localhost:8087/api/zones/" + window.editingZoneId;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(zoneData)
    });

    if (!response.ok) {
      alert("Failed to save zone");
      return;
    }

    const data = await response.json();

    alert("Zone saved successfully");

    window.editingZoneId = null;

    loadZones();

  } catch (err) {
    console.error(err);
    alert("Error saving zone");
  }
}


async function loadZones() {
  try {

    const response = await fetch("http://localhost:8087/api/zones");

    const zones = await response.json();

    const table = document.getElementById("zonesTable");

    table.innerHTML = "";

    zones
      .filter((z) => !z.deleted)
      .forEach((zone) => {

        const created = new Date(
          zone.createdDate || zone.createdAt || Date.now()
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

      });

  } catch (err) {
    console.error(err);
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
      });
  } catch (error) {
    console.error("Error loading zones:", error);
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


async function deleteZone(zoneId) {
  if(role === "SUB_ADMIN"){
  alert("Subadmin cannot delete data");
  return;
}
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
    });

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
      });
  } catch (error) {
    console.error("Error loading zones:", error);
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
      });
  } catch (err) {
    console.error(err);
  }

  hideDeleteForSubadmin();
}
