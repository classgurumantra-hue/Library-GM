let generatedOTP = "";

function sendOTP(){
  let email = document.getElementById("email").value;
  if(email == ""){
    alert("Enter email first");
    return;
  }

  generatedOTP = Math.floor(1000 + Math.random() * 9000);
  alert("Demo OTP: " + generatedOTP); // real me backend se jayega

  document.getElementById("otpBox").style.display = "block";
}

function verifyOTP(){
  let entered = document.getElementById("otpInput").value;

  if(entered == generatedOTP){
    alert("OTP Verified Successfully ✅");
    document.getElementById("otpBox").style.display = "none";
  }else{
    alert("Invalid OTP ❌");
  }
}
