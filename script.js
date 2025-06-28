const thumbnails = document.querySelectorAll(".left img");
const mainFrame = document.querySelector(".frame img");

thumbnails.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    mainFrame.src = img.src;
  });
});


const leftPanel = document.getElementById("left-panel");

// Array of image filenames
const imagePaths = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
const totalGrids = 4;
let imageCount = 1; // Global image number

for (let i = 0; i < totalGrids; i++) {
  const grid = document.createElement("div");
  grid.classList.add("grid");

  const row = document.createElement("div");
  row.classList.add("row1");

  imagePaths.forEach((img) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("image-wrapper");

    const number = document.createElement("span");
    number.classList.add("img-number");
    number.textContent = imageCount++;

    const image = document.createElement("img");
    image.src = `./Images/${img}`;
    image.alt = `Photo ${imageCount}`;

    // Add hover effect to update the right-side image
    image.addEventListener("mouseenter", () => {
      document.querySelector(".frame img").src = image.src;
    });

    wrapper.appendChild(number);
    wrapper.appendChild(image);
    row.appendChild(wrapper);
  });

  grid.appendChild(row);
  leftPanel.appendChild(grid);
}
