// Function to fetch Minecraft player head
async function fetchMinecraftHead(username) {
    console.log(`Fetching Minecraft head for: ${username}`);
    try {
        // Use Minotar API which is more reliable
        const headUrl = `https://minotar.net/avatar/${username}/100`;
        console.log(`Generated head URL: ${headUrl}`);
        return headUrl;
    } catch (error) {
        console.error(`Error fetching Minecraft head for ${username}:`, error);
        return 'https://minotar.net/avatar/steve/100'; // Fallback to Steve head
    }
}

// Function to update all staff avatars
async function updateStaffAvatars() {
    console.log('Starting to update staff avatars...');
    const staffCards = document.querySelectorAll('.staff-card');
    console.log(`Found ${staffCards.length} staff cards`);
    
    for (const card of staffCards) {
        const username = card.getAttribute('data-minecraft-username');
        if (username) {
            console.log(`Processing staff card for: ${username}`);
            const avatarImg = card.querySelector('.staff-avatar img');
            if (avatarImg) {
                try {
                    const headUrl = await fetchMinecraftHead(username);
                    console.log(`Setting image source for ${username}: ${headUrl}`);
                    
                    // Create a new image to test loading
                    const testImage = new Image();
                    testImage.onload = function() {
                        console.log(`Image loaded successfully for ${username}`);
                        avatarImg.src = headUrl;
                        avatarImg.style.opacity = '1';
                    };
                    testImage.onerror = function() {
                        console.error(`Image failed to load for ${username}`);
                        avatarImg.src = 'https://minotar.net/avatar/steve/100';
                        avatarImg.style.opacity = '1';
                    };
                    testImage.src = headUrl;
                    
                } catch (error) {
                    console.error(`Error updating avatar for ${username}:`, error);
                    avatarImg.src = 'https://minotar.net/avatar/steve/100';
                    avatarImg.style.opacity = '1';
                }
            } else {
                console.error(`No image element found for ${username}`);
            }
        } else {
            console.error('No username found for staff card');
        }
    }
    console.log('Finished updating staff avatars');
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded, preparing to update avatars...');
    // Small delay to ensure all elements are properly loaded
    setTimeout(updateStaffAvatars, 100);
}); 