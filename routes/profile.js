document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

    if (!logoutButton) {
        console.error('Logout button not found!');
        return;
    }

    logoutButton.addEventListener('click', async () => {
        console.log('Logout button clicked');
        try {
            const response = await fetch('/api/logout', { method: 'POST' });
            
            if (response.ok) {
                console.log('Logout successful, redirecting to login.html');
                window.location.href = '/login.html';
            } else {
                const errorData = await response.json();
                console.error('Logout failed:', errorData.message);
                alert('Failed to log out. Please try again.');
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
