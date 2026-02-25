// HERO SLIDER
let heroSlides = document.querySelectorAll(".hero-slide");
let heroIndex = 0;

setInterval(()=>{
  heroSlides.forEach(s=>s.classList.remove("active"));
  heroSlides[heroIndex].classList.add("active");
  heroIndex = (heroIndex+1) % heroSlides.length;
},3000);


// FEATURE SLIDER
let featureSlides = document.querySelectorAll(".feature-slide");
let featureIndex = 0;

setInterval(()=>{
  featureSlides.forEach(s=>s.classList.remove("active"));
  featureSlides[featureIndex].classList.add("active");
  featureIndex = (featureIndex+1) % featureSlides.length;
},3500);
