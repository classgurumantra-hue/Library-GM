const shiftGrid = document.getElementById("shift-grid");

// Get selected section from localStorage
const sectionId = localStorage.getItem("selectedSectionId");
if (!sectionId) {
  alert("No section selected. Redirecting to sections page.");
  window.location.href = "sections.html";
}

// Fetch shifts for this section
fetch(`http://localhost:8087/api/shifts/section/${sectionId}`) // Change backend URL/port if needed
  .then(res => res.json())
  .then(shifts => {
    if (shifts.length === 0) {
      shiftGrid.innerHTML = "<p>No shifts available for this section.</p>";
      return;
    }

    shifts.forEach(shift => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${shift.image || 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'}" class="thumb">
        <h3>${shift.name}</h3>
        <p>${shift.startTime} - ${shift.endTime}</p>
        <button>Select Shift</button>
      `;

      // Click handler
      card.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("selectedShiftId", shift.id);
        window.location.href = "seats.html";
      });

      shiftGrid.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    shiftGrid.innerHTML = "<p>Error loading shifts. Try again later.</p>";
  });