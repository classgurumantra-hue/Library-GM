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

    });

    if (!response.ok) {

      throw new Error("Failed to create section");

    }

    alert("Section Created Successfully ✅");

    window.editingSectionId = null;

    loadSections();

  } catch (err) {

    alert(err.message);

  }

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
      });

    // store editing id
    window.editingSectionId = sectionId;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } catch (err) {
    console.error("Edit section error", err);
  }
}

async function deleteSection(sectionId) {
  if(role === "SUB_ADMIN"){
  alert("Subadmin cannot delete data");
  return;
}
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
      });
  } catch (error) {
    console.error("Error loading sections:", error);
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
    });
  } catch (err) {
    console.error(err);
  }
  hideDeleteForSubadmin();
}