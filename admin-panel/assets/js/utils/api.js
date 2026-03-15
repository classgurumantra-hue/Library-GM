const API_BASE = "http://localhost:8087";

async function apiGet(url){

const res = await fetch(API_BASE + url);

if(!res.ok){
throw new Error("API Error");
}

return res.json();

}


async function apiPost(url,data){

const res = await fetch(API_BASE + url,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

if(!res.ok){
throw new Error("API Error");
}

return res.json();

}


async function apiPut(url,data){

const res = await fetch(API_BASE + url,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

if(!res.ok){
throw new Error("API Error");
}

return res.json();

}