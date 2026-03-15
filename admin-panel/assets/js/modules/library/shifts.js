
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
    });

    if (!response.ok) {
      throw new Error("Failed to create shift");
    }

    alert("Shift Created Successfully ✅");
  } catch (error) {
    alert(error.message);
  }
}

function hideDeleteForSubadmin(){

  if(localStorage.getItem("role") === "SUB_ADMIN"){

    document.querySelectorAll("[onclick^='delete']").forEach(btn=>{
      btn.style.display = "none";
    });

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
    });
  } catch (err) {
    console.error("Error loading shifts", err);
  }
  hideDeleteForSubadmin();
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
    });
  } catch (err) {
    console.error("Error loading shift for edit", err);
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