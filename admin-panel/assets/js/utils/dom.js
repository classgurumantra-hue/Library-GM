function toggleSidebar() {
  document.getElementById("appBody").classList.toggle("toggled");
}

function toggleDrop(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "none" ? "block" : "none";
}

function tglE(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function eye(id) {
  const f = document.getElementById(id);
  const i = f.nextElementSibling.querySelector("i");

  if (f.type === "password") {
    f.type = "text";
    i.classList.replace("bi-eye", "bi-eye-slash");
  } else {
    f.type = "password";
    i.classList.replace("bi-eye-slash", "bi-eye");
  }
}

function toggleSidebar() {

document.getElementById("appBody").classList.toggle("toggled");

}


function toggleDrop(id){

const el = document.getElementById(id);

if(el.style.display==="none"){

el.style.display="block";

}else{

el.style.display="none";

}

}


function tglE(id){

const el=document.getElementById(id);

if(el.style.display==="block"){

el.style.display="none";

}else{

el.style.display="block";

}

}


function eye(id){

const f=document.getElementById(id);

const i=f.nextElementSibling.querySelector("i");

if(f.type==="password"){

f.type="text";

i.classList.replace("bi-eye","bi-eye-slash");

}else{

f.type="password";

i.classList.replace("bi-eye-slash","bi-eye");

}

}