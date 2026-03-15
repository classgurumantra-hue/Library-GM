function loadPage(pageName) {

    const contentArea = document.getElementById("mainContent");

    if (!contentArea) return;

    if (pageName === "students") {

        render("students");

    }

    else if (pageName === "subadmin") {

        render("subadmin");

    }

    else if (pageName === "coadmin") {

        render("coadmin");

    }

    else if (pageName === "vendor") {

        render("vendor");

    }

    else if (pageName === "canteen-man") {

        render("canteen-man");

    }

    else if (pageName === "create-zone") {

        render("create-zone");

    }

    else if (pageName === "create-centre") {

        render("create-centre");

    }

    else if (pageName === "create-section") {

        render("create-section");

    }

    else if (pageName === "create-shift") {

        render("create-shift");

    }

    else if (pageName === "create-coupon") {

        render("create-coupon");

    }

    else if (pageName === "booking-history") {

        render("booking-history");

    }

}


function toggleSidebar() {

    document.getElementById("appBody").classList.toggle("toggled");

}


function toggleDrop(id) {

    const el = document.getElementById(id);

    el.style.display = el.style.display === "none" ? "block" : "none";

}