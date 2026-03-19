document.addEventListener("DOMContentLoaded", function(){

  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = student?.id;

  if(!studentId) return;

  fetch(`http://localhost:8087/api/coins/${studentId}`)
  .then(res => res.json())
  .then(data => {

    console.log("REAL COIN HISTORY:", data);

    allHistory = data.map(item => ({
      text: item.description || item.type,
      amount: item.coins,
      type: item.type.toLowerCase().includes("debit") ? "debit" : "credit",
      date: new Date(item.createdAt).toLocaleDateString()
    }));

    let total = 0;

data.forEach(item => {
  total += item.coins;
});

document.getElementById("mainCoins").innerText = total;

    renderHistory("credit");

  })
  .catch(err => {
    console.error("History fetch error:", err);
  });

});

// ===============================
// COIN HISTORY + TOGGLE
// ===============================

let allHistory = [];

function renderHistory(type){

  const container = document.getElementById("historyContainer");
  if(!container) return;

  container.innerHTML = "";

  let filtered = allHistory.filter(item => item.type === type);

  if(filtered.length === 0){
    container.innerHTML = "<p style='text-align:center'>No data</p>";
    return;
  }

  filtered.forEach(item => {

    let div = document.createElement("div");
    div.className = "history-item";

    div.innerHTML = `
      <div class="history-left-row">
        <div class="icon-circle">${item.type === "credit" ? "+" : "-"}</div>
        <div class="history-left">
          <span class="history-title">${item.text}</span>
          <span class="history-date">${item.date}</span>
        </div>
      </div>
      <span class="history-amount ${item.type === "credit" ? "plus" : "minus"}">
        ${item.type === "credit" ? "+" : "-"}${item.amount}
      </span>
    `;

    container.appendChild(div);
  });
}

function showTab(type){

  document.querySelectorAll(".tab-btn").forEach(btn=>{
    btn.classList.remove("active");
  });

  document.querySelectorAll(".tab-btn").forEach(btn=>{
    if(btn.innerText.toLowerCase() === type){
      btn.classList.add("active");
    }
  });

  renderHistory(type);
}


// ===============================
// FETCH REAL HISTORY (TEMP DEMO)
// ===============================

document.addEventListener("DOMContentLoaded", function(){

  const studentId = localStorage.getItem("studentId");
  if(!studentId) return;

  // 🔥 TEMP DATA (backend ready hone tak)
  fetch(`http://localhost:8087/api/coins/${studentId}`)
  .then(res => res.json())
  .then(data => {

    console.log("REAL COIN HISTORY:", data);

    allHistory = data.map(item => ({
      text: item.description || "Transaction",
      amount: item.coins,
      type: item.type.toLowerCase().includes("credit") ? "credit" : "debit",
      date: new Date(item.createdAt).toLocaleDateString()
    }));

    renderHistory("credit");

  })
  .catch(err => {
    console.error("History fetch error:", err);
  });

  

});