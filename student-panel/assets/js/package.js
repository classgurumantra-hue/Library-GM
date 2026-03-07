let shiftData = null;
let selectedDays = 30;

async function loadShiftDetails(){

const shiftId = localStorage.getItem("selectedShiftId");

if(!shiftId){
console.log("Shift not found");
return;
}

try{

const res = await fetch("http://localhost:8087/api/shifts/" + shiftId);

shiftData = await res.json();

console.log("SHIFT DATA", shiftData);

document.getElementById("shiftName").innerText = shiftData.name;

document.getElementById("shiftStart").innerText = shiftData.startTime;

document.getElementById("shiftDuration").innerText = shiftData.durationMinutes + " minutes";

document.getElementById("price").innerText = shiftData.price;

updatePrice();

}catch(err){

console.log(err);

}

}