const toggleBtn = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
}

document.addEventListener("DOMContentLoaded", () => {

  const role = localStorage.getItem("role");

  if(role === "CO_ADMIN"){

    console.log("COADMIN SIDEBAR FIX FINAL");

    // 🔥 sidebar के अंदर सभी items लो
    const allItems = document.querySelectorAll("#sidebar *");

    allItems.forEach(el => {

      if(el.innerText){
        const text = el.innerText.toLowerCase();

        // ❌ जो booking नहीं है → hide
        if(!text.includes("booking")){
          el.style.display = "none";
        }
      }

    });

  }

});