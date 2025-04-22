const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to download image: ${url}`));
    img.src = url;
  });
}

// Function to download all images
function downloadImages() {
  // Clear previous results
  output.innerHTML = "";
  errorDiv.textContent = "";
  loadingDiv.style.display = "block";

  const downloadPromises = images.map(image => downloadImage(image.url));

  Promise.all(downloadPromises)
    .then(downloadedImages => {
      downloadedImages.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      errorDiv.textContent = err.message;
    })
    .finally(() => {
      loadingDiv.style.display = "none";
    });
}

// Attach the function to the button click
btn.addEventListener("click", downloadImages);
