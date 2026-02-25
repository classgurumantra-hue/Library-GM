function sendOTP() {
    alert("DEMO OTP sent to your email: 1234");
    document.getElementById('otpBox').style.display = 'block';
}

function verifyOTP() {
    const val = document.getElementById('otpInp').value;
    if(val === "1234") {
        alert("Verified Successfully!");
        document.getElementById('otpBox').style.display = 'none';
    } else {
        alert("Invalid OTP! Use 1234");
    }
}