const sectionGrid = document.getElementById("section-grid");

// Fetch sections from backend
fetch("http://localhost:8087/api/sections") // Change if backend URL or port is different
  .then(res => res.json())
  .then(sections => {
    if (sections.length === 0) {
      sectionGrid.innerHTML = "<p>No sections available.</p>";
      return;
    }

    sections.forEach(section => {
      const card = document.createElement("div");
      card.classList.add("card");
      if (section.type === "premium") card.classList.add("premium");

      card.innerHTML = `
        <img src="${section.image || 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80'}" class="thumb">
        <h3>${section.name}</h3>
        <p>Start Seat: ${section.startSeat}</p>
        <button>Select Section</button>
      `;

      // Click handler
      card.querySelector("button").addEventListener("click", () => {
        localStorage.setItem("selectedSectionId", section.id);
        window.location.href = "shifts.html";
      });

      sectionGrid.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    sectionGrid.innerHTML = "<p>Error loading sections. Try again later.</p>";
  });