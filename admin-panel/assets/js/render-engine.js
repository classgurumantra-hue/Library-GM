function render(page){

const main = document.getElementById("mainContent");

document.querySelectorAll(".sub-link").forEach(l=>l.classList.remove("active"));

const activeLink = document.getElementById("l-"+page);

if(activeLink) activeLink.classList.add("active");

if(page==="students"){
loadStudents();
return;
}

if(page==="create-zone"){
loadZones();
return;
}

if(page==="create-centre"){
loadCentres();
return;
}

if(page==="create-section"){
loadSections();
return;
}

if(page==="create-shift"){
loadShifts();
return;
}

if(page==="booking-history"){
loadStudents();
return;
}

if(page==="create-coupon"){
loadCoupons();
return;
}

if(page==="subadmin"){
loadCentres();
return;
}

}