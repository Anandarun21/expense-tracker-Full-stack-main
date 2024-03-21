document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var formData = new FormData();
    formData.append("name", document.getElementById("name").value.trim());
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("password", document.getElementById("password").value.trim());

    // Make a POST request to the backend server
    fetch("https://your-backend-server-url/signup", {
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
        alert("Signup successful!");
        console.log(data); // Log the response from the server (if needed)
    })
    .catch(error => {
        // Handle errors
        console.error("There was a problem with the signup request:", error);
        alert("Signup failed. Please try again later.");
    });
});
