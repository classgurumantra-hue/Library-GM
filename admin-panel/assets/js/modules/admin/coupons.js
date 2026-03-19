
async function loadCentresForCoupon() {
  try {
    const res = await fetch("http://localhost:8087/api/centres");
    const centres = await res.json();

    const container = document.getElementById("centreList");

    if (!container) return;

    container.innerHTML = "";

    centres.forEach((c) => {
      const div = document.createElement("div");

      div.className = "form-check";

      div.innerHTML = `
        <input class="form-check-input centre-checkbox"
        type="checkbox"
        value="${c.id}">

        <label class="form-check-label">
        ${c.centreName}
        </label>
      `;

      container.appendChild(div);
    });
    const allBox = document.getElementById("allCentres");

    if (allBox) {
      allBox.addEventListener("change", function () {
        const centreBoxes = document.querySelectorAll(".centre-checkbox");

        centreBoxes.forEach((cb) => {
          cb.checked = this.checked;
        });
      });
    }
  } catch (err) {
    console.error("Centre load error", err);
  }
}

async function submitCoupon() {
  const name = document.getElementById("couponName").value;
  const code = document.getElementById("couponCode").value;
  const minPrice = document.getElementById("minPrice").value;
  const startDate = document.getElementById("startDate").value;
  const expiryDate = document.getElementById("expiryDate").value;

  const centres = [];
  document.querySelectorAll(".centre-checkbox:checked").forEach((c) => {
    centres.push(c.value);
  });

  const genders = [];
  document
    .querySelectorAll(
      "input[type='checkbox'][value='MALE']:checked, input[value='FEMALE']:checked, input[value='OTHER']:checked",
    )
    .forEach((g) => {
      genders.push(g.value);
    });

  console.log({
    name,
    code,
    minPrice,
    startDate,
    expiryDate,
    centres,
    genders,
  });

  alert("Coupon data captured ✔ check console");
}

async function createCoupon() {
  const name = document.getElementById("couponName").value;
  const code = document.getElementById("couponCode").value;
  const minPrice = document.getElementById("minPrice").value;
  const startDate = document.getElementById("startDate").value;
  const expiryDate = document.getElementById("expiryDate").value;
  

const centres = [];
document.querySelectorAll(".centre-checkbox:checked").forEach(c => {
  centres.push(Number(c.value));
});

const genders = [];
document.querySelectorAll(
  "input[value='MALE']:checked, input[value='FEMALE']:checked, input[value='OTHER']:checked"
).forEach(g => {
  genders.push(g.value);
});

let applicableFor = "ALL";

if (document.getElementById("studentCheck").checked) {
  applicableFor = "STUDENT";
}
if (document.getElementById("vendorCheck").checked) {
  applicableFor = "VENDOR";
}
if (document.getElementById("allUserCheck").checked) {
  applicableFor = "ALL";
}
const discountType = document.getElementById("discountType").value;
const discountValue = document.getElementById("discountValue").value;

const data = {
  name: name,
  code: code,
  minPrice: minPrice,
  startDate: startDate,
  expiryDate: expiryDate,
  centres: centres,
  genders: genders,
  applicableFor: applicableFor,
  discountType: discountType,
discountValue: discountValue
};

console.log("FINAL DATA:", data);

  try {
    const res = await fetch("http://localhost:8087/api/coupons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
  const error = await res.text();
  alert("❌ " + error);
  return;
}
    const result = await res.json();

    alert("Coupon Created Successfully");

    console.log(result);

    document.getElementById("couponName").value = "";
    document.getElementById("couponCode").value = "";
    document.getElementById("minPrice").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("expiryDate").value = "";

    document.querySelectorAll(".centre-checkbox").forEach((c) => {
      c.checked = false;
    });

    document
      .querySelectorAll(
        "input[type='checkbox'][value='MALE'], input[value='FEMALE'], input[value='OTHER']",
      )
      .forEach((g) => {
        g.checked = false;
      });

    document.getElementById("allCentres").checked = false;
  } catch (e) {
    console.error(e);
    alert("Error creating coupon");
  }
}