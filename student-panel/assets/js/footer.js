// footer loader
fetch("components/footer.html")
.then(res => res.text())
.then(data => {
    const footerDiv = document.createElement("div");
    footerDiv.innerHTML = data;
    document.body.appendChild(footerDiv);
});