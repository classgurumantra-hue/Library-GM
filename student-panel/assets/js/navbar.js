document.querySelectorAll(".dropdown").forEach(drop => {

  // Desktop hover
  drop.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
      drop.querySelector(".dropdown-menu").style.display = "block";
    }
  });

  drop.addEventListener("mouseleave", () => {
    if (window.innerWidth > 768) {
      drop.querySelector(".dropdown-menu").style.display = "none";
    }
  });

  // Mobile click
  drop.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const menu = drop.querySelector(".dropdown-menu");
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    }
  });

});
