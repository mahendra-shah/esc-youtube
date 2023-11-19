const videoUrlInput = document.getElementById('video-url');
const numWindowsInput = document.getElementById('num-windows');
const durationSecRadio = document.getElementById('duration-sec');
const durationMinRadio = document.getElementById('duration-min');
const videoDurationInput = document.getElementById('video-duration');
const addVideoBtn = document.getElementById('add-video-btn');
const videoGrid = document.querySelector('.video-grid');

addVideoBtn.addEventListener('click', () => {
    const videoUrl = videoUrlInput.value.trim();
    const numWindows = parseInt(numWindowsInput.value) || 1;
    const selectedRadio = durationSecRadio.checked ? durationSecRadio : durationMinRadio;
    const unit = selectedRadio.value;

    let videoDuration = parseInt(videoDurationInput.value) || 300; // Default to 300 seconds if not provided

    if (unit === 'min') {
        videoDuration *= 60; // Convert minutes to seconds
    }

    if (!videoUrl || isNaN(numWindows) || numWindows < 1) {
        return;
    }

    for (let i = 0; i < numWindows; i++) {
        // Extract video ID from URL
        const videoId = getVideoIdFromUrl(videoUrl);

        // Create and append video container to the grid
        createVideoContainer(videoId, videoDuration);
    }

    // Don't reset input fields
});

function createVideoContainer(videoId, videoDuration) {
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1`;
    iframe.allow = 'autoplay; encrypted-media';
    iframe.setAttribute('allowfullscreen', '');

    videoContainer.appendChild(iframe);

    // Add hover effect
    videoContainer.addEventListener('mouseenter', () => {
        videoContainer.style.transform = 'scale(1.05)';
    });

    videoContainer.addEventListener('mouseleave', () => {
        videoContainer.style.transform = 'scale(1)';
    });

    videoGrid.appendChild(videoContainer);

    // Schedule the video loop
    setInterval(() => {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1`;
    }, videoDuration * 1000);
}

function getVideoIdFromUrl(url) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);

    if (match) {
        return match[1];
    }

    return null;
}
