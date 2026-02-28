// ---------- Navigation ----------
function goCentre(zoneId) {
    localStorage.setItem("zoneId", zoneId);
    window.location.href = "centres.html";
}

function goSection(centre) {
    localStorage.setItem("centre", centre);
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

    fetch("http://localhost:8087/api/zones")
        .then(res => res.json())
        .then(data => {

            zoneList.innerHTML = "";

            data.forEach(zone => {

                const col = document.createElement("div");
                col.className = "col-md-6 col-lg-4 mb-4";

                col.innerHTML = `
                <div class="card zone-card shadow-sm border-0 h-100">

                    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800"
                         style="height:180px; width:100%; object-fit:cover; border-radius:18px 18px 0 0">

                    <div class="card-body text-center">

                        <h5 class="zone-title">${zone.zoneName}</h5>

                        <p class="zone-desc">
                            ${zone.description ? zone.description : "Best study zone"}
                        </p>

                        <button class="btn btn-primary btn-sm"
                                onclick="goCentre('${zone.id}')">
                            Continue
                        </button>

                    </div>
                </div>
                `;

                zoneList.appendChild(col);
            });

        });

});