const BACKEND_URL = "http://localhost:8087";

let currentEmail = "";

/*
==============================
 SEND OTP
==============================
*/
async function sendOTP(){

    let email = document.getElementById("email").value;

    if(email === ""){
        alert("Enter email first");
        return;
    }

    currentEmail = email;

    try{

        let response = await fetch(BACKEND_URL + "/api/otp/send",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({ email })
        });

        let text = await response.text();

        alert(text);

        document.getElementById("otpBox").style.display = "block";

    }catch(err){
        alert("OTP send failed");
    }
}

/*
==============================
 VERIFY OTP
==============================
*/
async function verifyOTP(){

    let otp = document.getElementById("otpInput").value;

    if(otp === ""){
        alert("Enter OTP");
        return;
    }

    try{

        let response = await fetch(
            BACKEND_URL + "/api/otp/verify?otp="+otp,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({ email: currentEmail })
            }
        );

        let text = await response.text();

        if(text.toLowerCase().includes("success")){
            alert("OTP verified successfully ✅");
            document.getElementById("otpBox").style.display="none";
        }
        else{
            alert("OTP verification failed ❌");
        }

    }catch(err){
        alert("OTP verification failed");
    }
}

/*
==============================
 SIGNUP ⭐⭐⭐
==============================
*/
async function signup(){

    let fullname = document.getElementById("fullname").value;
    let mobile = document.getElementById("mobile").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let gender = document.getElementById("gender").value;
    let referral = document.getElementById("referral").value;

    if(password !== confirmPassword){
        alert("Password mismatch");
        return;
    }

    try{

        let response = await fetch(BACKEND_URL+"/api/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fullname,
                mobile,
                username: email,
                email,
                password,
                gender,
                referralCode: referral,
                role:"ADMIN"
            })
        });

        let text = await response.text();

        if(response.ok){
            alert("Signup Success 🎉");
            window.location.href="login.html";
        }
        else{
            alert(text);
        }

    }catch(err){
        alert("Signup failed");
    }
}