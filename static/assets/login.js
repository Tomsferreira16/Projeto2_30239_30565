document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent default form submission

    // Get form data
    const formData = new FormData(event.target);

    // Convert form data to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    // Load users from JSON file (Replace with actual backend code in real application)
    fetch("assets/data.json")
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            // Check if user credentials match any user in the JSON file
            const foundUser = users.find(user => user.email === jsonData.email && user.password === jsonData.password);
            if (foundUser) {
                localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
                window.location.href = "home.html";
            } else {
                displayMessage("Invalid email or password");
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            displayMessage("Error fetching users. Please try again later.");
        });

    // Clear form fields
    event.target.reset();
});

function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML = message;
}