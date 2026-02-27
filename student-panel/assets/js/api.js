// student-panel/assets/js/api.js
const BASE_URL = "http://localhost:8087/api"; // backend ka base URL

/** ---------------- Sections ---------------- */
export async function getSections() {
    const res = await fetch(`${BASE_URL}/sections`);
    return res.json();
}

export async function getSectionById(id) {
    const res = await fetch(`${BASE_URL}/sections/${id}`);
    return res.json();
}

export async function createSection(section, centreId) {
    const res = await fetch(`${BASE_URL}/sections/${centreId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section)
    });
    return res.json();
}

export async function updateSection(id, section, centreId) {
    const res = await fetch(`${BASE_URL}/sections/${id}/${centreId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section)
    });
    return res.json();
}

export async function deleteSection(id) {
    const res = await fetch(`${BASE_URL}/sections/${id}`, { method: "DELETE" });
    return res.json();
}

/** ---------------- Admissions ---------------- */
export async function getAdmissions() {
    const res = await fetch(`${BASE_URL}/admissions`);
    return res.json();
}

export async function getAdmissionsByCentre(centreId) {
    const res = await fetch(`${BASE_URL}/admissions/centre/${centreId}`);
    return res.json();
}

export async function addAdmission(admission) {
    const res = await fetch(`${BASE_URL}/admissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admission)
    });
    return res.json();
}

/** ---------------- Centres ---------------- */
export async function getCentres() {
    const res = await fetch(`${BASE_URL}/centres`);
    return res.json();
}

export async function getCentreById(id) {
    const res = await fetch(`${BASE_URL}/centres/${id}`);
    return res.json();
}

export async function createCentre(centre, zoneId) {
    const res = await fetch(`${BASE_URL}/centres/${zoneId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(centre)
    });
    return res.json();
}

export async function updateCentre(id, centre, zoneId) {
    const res = await fetch(`${BASE_URL}/centres/${id}/${zoneId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(centre)
    });
    return res.json();
}

export async function deleteCentre(id) {
    const res = await fetch(`${BASE_URL}/centres/${id}`, { method: "DELETE" });
    return res.json();
}

/** ---------------- Shifts ---------------- */
export async function getShifts() {
    const res = await fetch(`${BASE_URL}/shifts`);
    return res.json();
}

export async function getShiftById(id) {
    const res = await fetch(`${BASE_URL}/shifts/${id}`);
    return res.json();
}

export async function createShift(shift, sectionId) {
    const res = await fetch(`${BASE_URL}/shifts/${sectionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shift)
    });
    return res.json();
}

export async function updateShift(id, shift, sectionId) {
    const res = await fetch(`${BASE_URL}/shifts/${id}/${sectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shift)
    });
    return res.json();
}

export async function deleteShift(id) {
    const res = await fetch(`${BASE_URL}/shifts/${id}`, { method: "DELETE" });
    return res.json();
}

/** ---------------- Zones ---------------- */
export async function getZones() {
    const res = await fetch(`${BASE_URL}/zones`);
    return res.json();
}

export async function getZoneById(id) {
    const res = await fetch(`${BASE_URL}/zones/${id}`);
    return res.json();
}

export async function createZone(zone) {
    const res = await fetch(`${BASE_URL}/zones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zone)
    });
    return res.json();
}

export async function updateZone(id, zone) {
    const res = await fetch(`${BASE_URL}/zones/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zone)
    });
    return res.json();
}

export async function deleteZone(id) {
    const res = await fetch(`${BASE_URL}/zones/${id}`, { method: "DELETE" });
    return res.json();
}