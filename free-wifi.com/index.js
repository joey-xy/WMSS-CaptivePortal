document.getElementById("visibility").addEventListener("click", showPassword);
document.getElementById("submit-button").addEventListener(
    "click", submitCredentials, {once: true}
);

function showPassword() {
    const visibility = document.getElementById("visibility");
    const passwordInput = document.getElementById("password-field");
    if (visibility.src.includes("visibility-on")) {
        visibility.src = "./gallery/visibility-off.png";
        passwordInput.type = "text";
        console.log("DEBUG: showPassword() -> Show Password");
    } else if (visibility.src.includes("visibility-off")) {
        visibility.src = "./gallery/visibility-on.png";
        passwordInput.type = "password";
        console.log("DEBUG: showPassword() -> Masking Password");
    } else {
        visibility.src = "./gallery/visibility-on.png";
        passwordInput.type = "password";
        console.log("DEBUG: showPassword() -> Unknown Attribute; Resetting View");
    }
}

async function submitCredentials() {
    const usernameValue = document.getElementById("username-field").value;
    const passwordValue = document.getElementById("password-field").value;
    const responseDisplay = document.getElementById("response-message");
    const iconDisplay = document.getElementById("response-icon");
    document.getElementById("password-response-container").style.display = "none";
    
    // User did not enter any password
    if (!passwordValue || !usernameValue) {
        document.getElementById("password-response-container").style.display = "flex";
        responseDisplay.textContent = "Please enter username and password!";
        responseDisplay.style.color = "red";
        
        iconDisplay.src = "./gallery/error.png";
        document.getElementById("submit-button").addEventListener(
            "click", submitCredentials, {once: true}
        );
        console.log("DEBUG: submitCredentials() -> Empty Field. Reattaching Event.");
        return;
    }
    console.log(`DEBUG: submitCredentials() -> User Input = ${usernameValue}:${passwordValue}`);
    // Deliver Password to backend
    const result = await fetch("http://192.168.186.128:5000/submit", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": usernameValue,
            "password": passwordValue
        })
    }).then(
        (response) => (response.json())
    );

    console.log(result["status"]);
}
