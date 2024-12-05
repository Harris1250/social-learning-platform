// auth.js
async function checkAuthentication() {
    try {
        const response = await fetch('/api/profile');
        if (response.status === 401) {
            window.location.href = '/login.html'; // Redirect if unauthorized
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
        window.location.href = '/login.html';
    }
}

// Run the check when the script loads
checkAuthentication();
