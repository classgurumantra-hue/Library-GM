document.addEventListener("DOMContentLoaded", function(){
  console.log("SECTIONS JS LOADED");
const sectionGrid = document.getElementById("section-grid");

const centreId = localStorage.getItem("selectedCentreId");

if (!centreId) {
  window.location.href = "centres.html";
}

fetch(`http://localhost:8087/api/sections/centre/${centreId}`)
  .then(res => res.json())
  .then(sections => {

    if (!sectionGrid) return;

    sectionGrid.innerHTML = "";

    if (sections.length === 0) {
      sectionGrid.innerHTML = "<p>No sections available.</p>";
      return;
    }

    sections.forEach(section => {

      const card = document.createElement("div");
      card.classList.add("card");

     card.innerHTML = `
  <img src="${section.image || 'https://images.unsplash.com/photo-1588072432836-e10032774350'}" class="thumb">

  <h3>${section.name}</h3>

  <p>
  Seat Range: ${section.startSeatNumber} - ${section.endSeatNumber}
  </p>

  <button onclick="selectSection('${section.id}','${section.name}')">
    Select Section
  </button>
`;

      console.log("Button found:", card.querySelector("button"));
card.querySelector("button").addEventListener("click", () => {

  const sectionName = card.querySelector("h3").innerText;

  localStorage.setItem("selectedSectionId", section.id);
  localStorage.setItem("selectedSectionName", sectionName);

  console.log("Section Saved:", sectionName);

  window.location.href = "shifts.html";

});

      sectionGrid.appendChild(card);
      console.log("CARD HTML:", card.innerHTML);
    });

  })
  .catch(err => {
    console.error(err);
    sectionGrid.innerHTML = "<p>Error loading sections.</p>";
  });
  });

  document.querySelectorAll("button").forEach(btn => {

  btn.addEventListener("click", function(){

    const sectionName =
      document.querySelector("h3").innerText;

    localStorage.setItem("selectedSectionName", sectionName);

    console.log("Section Saved:", sectionName);

  });

});
function selectSection(id, name){

  localStorage.setItem("selectedSectionId", id);
  localStorage.setItem("selectedSectionName", name);

  console.log("Section Saved:", name);

  window.location.href = "shifts.html";

}