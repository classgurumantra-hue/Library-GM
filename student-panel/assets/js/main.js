// ---------- Navigation ----------
function goCentre(zoneId, zoneName){

localStorage.setItem("selectedZoneId", zoneId);
localStorage.setItem("selectedZoneName", zoneName);

window.location.href = "centres.html";

}

function goSection(centreId, centreName){

    localStorage.setItem("selectedCentreName", centreName);
    localStorage.setItem("selectedCentreId", centreId);

    window.location.href = "sections.html";
}

function goShift() {
    window.location.href = "shifts.html";
}

function goSeats(shift) {
    localStorage.setItem("shift", shift);
    window.location.href = "seats.html";
}

function goPayment() {
    window.location.href = "payment.html";
}

// ---------- Toggle Menu ----------
function toggleMenu() {
    document.getElementById("gmNavMenu")?.classList.toggle("show");
}

// ---------- Zone Load ----------
document.addEventListener("DOMContentLoaded", function () {

    const zoneList = document.getElementById("zoneList");
    if (!zoneList) return;

    const role = localStorage.getItem("role");

    // VENDOR FLOW
 if(role === "VENDOR"){

    const vendorId = localStorage.getItem("vendorId");

 fetch("http://localhost:8087/api/auth/user/" + vendorId)
.then(res => res.json())
.then(user => {

    const zoneName = user.zoneName;
    const centreId = user.centreId;
    const centreName = user.centreName;

    zoneList.innerHTML = "";
const col = document.createElement("div");
col.className = "col-md-4 mb-4";

col.innerHTML = `
<div class="card zone-card">

<img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800"
style="height:180px;width:100%;object-fit:cover;border-radius:18px 18px 0 0">

<div class="card-body text-center">

<h5 class="zone-title">${zoneName}</h5>

<p class="zone-desc">
Assigned vendor zone
</p>

<button class="btn btn-primary w-100"
onclick="goCentre('${user.zoneId}','${zoneName}')">
Continue
</button>

</div>

</div>
`;

    zoneList.appendChild(col);

});

}

    // STUDENT FLOW (UNCHANGED)
    else{

        fetch("http://localhost:8087/api/zones")
        .then(res => res.json())
        .then(data => {

            zoneList.innerHTML = "";

            data.forEach(zone => {

                const col = document.createElement("div");
                col.className = "col-md-4 mx-auto mb-4";

                col.innerHTML = `
                <div class="card zone-card shadow-sm border-0 h-100">

                    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800"
                         style="height:180px; width:100%; object-fit:cover; border-radius:18px 18px 0 0">

                    <div class="card-body text-center">

                        <h5 class="zone-title">${zone.zoneName}</h5>

                        <p class="zone-desc">
                            ${zone.description ? zone.description : "Best study zone"}
                        </p>

                       <button class="btn btn-primary zone-continue-btn"
onclick="goCentre(${zone.id},'${zone.zoneName}')">
Continue
</button>

                    </div>
                </div>
                `;

                zoneList.appendChild(col);
            });

        });

    }

});
document.addEventListener("DOMContentLoaded", function () {

    const role = localStorage.getItem("role");

    if (role === "VENDOR") {

        const btn = document.querySelector("#navbarAdmissionBtn");

        if (btn) {

            btn.innerText = "Take Admission";

            // vendor click redirect
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                window.location.href = "vendor-admission.html";
            });

        }

    }

});