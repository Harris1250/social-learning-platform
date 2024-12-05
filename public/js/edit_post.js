document.addEventListener('DOMContentLoaded', async () => {
    const editPostForm = document.getElementById('editPostForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Extract post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Load existing post details
    async function loadPostDetails() {
        try {
            const response = await fetch(`/api/posts/${postId}`);
            if (response.ok) {
                const post = await response.json();
                document.getElementById('title').value = post.title;
                document.getElementById('content').value = post.content;
            } else {
                errorMessage.textContent = 'Failed to load post details.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching post details:', error);
            errorMessage.textContent = 'An error occurred while loading post details.';
            errorMessage.style.display = 'block';
        }
    }

    // Handle form submission
    editPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
            } else {
                const errorData = await response.json();
                errorMessage.textContent = errorData.message || 'Failed to update post.';
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        } catch (error) {
            console.error('Error updating post:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    });

    // Load post details on page load
    loadPostDetails();
});
