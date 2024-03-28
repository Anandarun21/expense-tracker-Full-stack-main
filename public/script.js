document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var formData = new FormData();
    formData.append("name", document.getElementById("name").value.trim());
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("password", document.getElementById("password").value.trim());

    // Make a POST request to the backend server
    fetch("/signup", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Handle successful response from the server
        if (data.success) {
            // User signed up successfully
            document.getElementById("message").innerText = "Signup successful!";
            document.getElementById("message").className = "success";
        } else {
            // User already exists
            document.getElementById("message").innerText = "User already exists";
            document.getElementById("message").className = "error";
        }
    })
    .catch(error => {
        // Handle errors
        console.error("There was a problem with the signup request:", error);
        alert("Signup failed. Please try again later.");
    });
});
