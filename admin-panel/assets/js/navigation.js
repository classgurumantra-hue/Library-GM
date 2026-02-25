function loadPage(pageName) {
    const contentArea = document.getElementById('content-area');
    
    // User Module ke Pages
    if(pageName === 'students') {
        location.reload(); // Default page
    } 
    else if(pageName === 'subadmin') {
        contentArea.innerHTML = `
            <div class="card-pro">
                <h4 class="fw-bold mb-4">Add Subadmin</h4>
                <div class="row g-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Name"></div>
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Mobile"></div>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Email">
                            <button class="btn btn-dark" onclick="sendOTP()">Verify OTP</button>
                        </div>
                        <div id="otpBox" class="otp-dropdown">
                            <p class="small fw-bold">Enter Demo OTP: 1234</p>
                            <div class="d-flex gap-2">
                                <input type="text" id="otpInp" class="form-control w-50">
                                <button class="btn btn-primary" onclick="verifyOTP()">Verify</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <select class="form-select" multiple>
                            <option>Main Centre</option>
                            <option>Library Wing A</option>
                            <option>Course Centre</option>
                        </select>
                    </div>
                    <div class="col-md-6"><input type="password" class="form-control" placeholder="Create Password"></div>
                    <div class="col-md-6"><input type="password" class="form-control" placeholder="Confirm Password"></div>
                    <div class="col-12"><button class="btn btn-primary px-5">Submit</button></div>
                </div>
            </div>
        `;
    }
}

function toggleSidebar() {
    document.body.classList.toggle('toggled');
}