document.addEventListener("click", function(e){
  if(e.target.classList.contains("toggle-btn")){
    document.querySelector(".sidebar").classList.toggle("collapsed");
  }
});
