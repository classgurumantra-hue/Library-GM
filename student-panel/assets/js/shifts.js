const shiftGrid = document.getElementById("shift-grid");

const sectionId = localStorage.getItem("selectedSectionId");



if (!sectionId) {
  window.location.href = "sections.html";
}


/* Fetch shifts by section */
fetch(`http://localhost:8087/api/shifts/section/${sectionId}`)
.then(res => res.json())
.then(shifts => {

    if (!shiftGrid) return;

    shiftGrid.innerHTML = "";

    if (!shifts || shifts.length === 0) {
        shiftGrid.innerHTML = "<p>No shifts available for this section.</p>";
        return;
    }

    shifts.forEach(shift => {

        const card = document.createElement("div");
        card.className = "card shadow border-0 col-md-4 mb-3";

        card.innerHTML = `
            <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800"
            class="thumb">

            <div class="card-body text-center">

                <h3>${shift.name}</h3>

                <p>${shift.startTime} - ${shift.endTime}</p>

                <button class="btn btn-primary btn-sm select-shift-btn">
                Select Shift
                </button>

            </div>
        `;

        card.querySelector("button").addEventListener("click", () => {

            localStorage.setItem("selectedShiftId", shift.id);
            localStorage.setItem("selectedShiftName", shift.name);

            window.location.href = "seats.html";

        });

        shiftGrid.appendChild(card);

    });

})
.catch(err => {
    console.error(err);
    shiftGrid.innerHTML = "<p>Error loading shifts.</p>";
});