let wallet = {
  total: 1450,
  earned: 2000,
  spent: 450,
  bonus: 300,
  history: [
    { text:"Referral Bonus", amount:+200 },
    { text:"Seat Booking", amount:-150 },
    { text:"Signup Reward", amount:+300 },
    { text:"Festival Bonus", amount:+100 },
    { text:"Discount Used", amount:-200 }
  ]
};

function animateValue(id, start, end, speed=30){
  let current = start;
  let obj = document.getElementById(id);
  let interval = setInterval(()=>{
    current += Math.ceil((end-start)/20);
    if(current >= end){
      current = end;
      clearInterval(interval);
    }
    obj.innerText = current;
  }, speed);
}

animateValue("mainCoins",0,wallet.total);
animateValue("earned",0,wallet.earned);
animateValue("spent",0,wallet.spent);
animateValue("bonus",0,wallet.bonus);

let box = document.getElementById("coinActivity");
wallet.history.forEach(item=>{
  let div = document.createElement("div");
  div.className="activity-row";
  div.innerHTML=`
    <span>${item.text}</span>
    <span class="${item.amount>0?'plus':'minus'}">
      ${item.amount>0?'+':''}${item.amount}
    </span>
  `;
  box.appendChild(div);
});
