function toggleBox(type){
document.getElementById(type+"Box").classList.toggle("active");
}

document.querySelectorAll(".otp input").forEach((input,i,arr)=>{
input.addEventListener("input",()=>{
if(input.value && arr[i+1]) arr[i+1].focus();
});
input.addEventListener("keydown",(e)=>{
if(e.key==="Backspace" && !input.value && arr[i-1]){
arr[i-1].focus();
}
});
});

function sendOTP(){ alert("Demo OTP: 654321"); }

function getOTP(box){
let otp="";
box.querySelectorAll(".otp input").forEach(i=>otp+=i.value);
return otp;
}

function saveName(){
nameText.innerText=newName.value;
nameBox.classList.remove("active");
}

function saveMobile(){
if(getOTP(mobileBox)=="654321"){
mobileText.innerText=newMobile.value;
mobileBox.classList.remove("active");
}
}

function saveEmail(){
if(getOTP(emailBox)=="654321"){
emailText.innerText=newEmail.value;
emailBox.classList.remove("active");
}
}

function savePassword(){
if(getOTP(passBox)=="654321"){
passBox.classList.remove("active");
}
}

function deleteAccount(){
if(confirm("Are you sure?")){
alert("Account deleted (demo)");
}
}

function verifyAndSave(type){
  // type = "name" / "mobile" / "email"

  let newValue = document.getElementById(type+"Input").value;

  // update main text
  document.getElementById(type+"Text").innerText = newValue;

  // show popup
  document.getElementById("successPopup").style.display = "flex";

  // hide otp box
  document.getElementById(type+"OtpBox").style.display = "none";
}

function closePopup(){
  document.getElementById("successPopup").style.display = "none";
}
