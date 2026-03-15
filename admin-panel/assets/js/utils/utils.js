function save() {
  alert("Updated! ✅");
  document
    .querySelectorAll(".edit-box")
    .forEach((b) => (b.style.display = "none"));
}

function hideDeleteForSubadmin() {
  if (localStorage.getItem("role") === "SUB_ADMIN") {
    document.querySelectorAll("[onclick^='delete']").forEach((btn) => {
      btn.style.display = "none";
    });
  }
}