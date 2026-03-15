async function showOTP(id) {
  const email = document.querySelector("input[type='email']").value;

  if (!email) {
    alert("Please enter email first");
    return;
  }

  try {
    const res = await fetch("http://localhost:8087/api/otp/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    });

    const data = await res.text();

    alert(data);

    document.getElementById(id).style.display = "block";

  } catch (err) {
    alert("OTP send failed");
  }
}

async function vOTP(bId, iId) {

  const email = document.querySelector("input[type='email']").value;
  const otp = document.getElementById(iId).value;

  if (!otp) {
    alert("Enter OTP");
    return;
  }

  try {

    const res = await fetch(
      "http://localhost:8087/api/otp/verify?otp=" + otp,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      }
    );

    const data = await res.text();

    alert(data);

    if (data.includes("success")) {
      document.getElementById(bId).style.display = "none";
    }

  } catch (err) {
    alert("OTP verification failed");
  }
}