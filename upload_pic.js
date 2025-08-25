const imageBtn = document.getElementById("addImageBtn");
const videoBtn = document.getElementById("addVideoBtn");
const imageInput = document.getElementById("imageInput");
const videoInput = document.getElementById("videoInput");
const gallery = document.querySelector(".gallery");

// Open file selector when button is clicked
imageBtn.addEventListener("click", () => imageInput.click());
videoBtn.addEventListener("click", () => videoInput.click());

// Handle image upload
imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      gallery.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});

// Handle video upload
videoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const video = document.createElement("video");
      video.src = e.target.result;
      video.controls = true; // Play/Pause controls
      gallery.appendChild(video);
    };
    reader.readAsDataURL(file);
  }
});
