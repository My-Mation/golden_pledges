const addImageBtn = document.getElementById('addImageBtn');
const imageInput = document.getElementById('imageInput');
const gallery = document.querySelector('.gallery');

// Load stored images on page load
window.addEventListener('DOMContentLoaded', () => {
    const storedImages = JSON.parse(localStorage.getItem('userImages') || '[]');
    storedImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "User Uploaded Image";
        gallery.appendChild(img);
    });
});

// When button is clicked, open file chooser
addImageBtn.addEventListener('click', () => {
    imageInput.click();
});

// When a file is selected
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const src = e.target.result;

            // Append image to gallery
            const img = document.createElement('img');
            img.src = src;
            img.alt = "User Uploaded Image";
            gallery.appendChild(img);

            // Store in localStorage
            const storedImages = JSON.parse(localStorage.getItem('userImages') || '[]');
            storedImages.push(src);
            localStorage.setItem('userImages', JSON.stringify(storedImages));
        }
        reader.readAsDataURL(file); // Convert image to Base64
    }
});
