// Handle logout button functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    console.log("Logout button clicked. Sending logout request...");

    fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
    })
        .then(response => {
            if (response.ok) {
                console.log("Logout successful. Redirecting to login page...");
                window.location.href = '/login.html';
            } else {
                console.error("Logout failed. Server response:", response);
                alert('An error occurred. Please try again.');
            }
        })
        .catch(error => {
            console.error("Error during logout request:", error);
            alert('An error occurred. Please try again.');
        });
});
