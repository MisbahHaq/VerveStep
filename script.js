const leftPanel = document.getElementById("left-panel");

const imagePaths = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
  "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"
];

const imagesPerRow = 4; // Adjust based on your design
let imageCount = 1;

for (let i = 0; i < imagePaths.length; i += imagesPerRow) {
  const grid = document.createElement("div");
  grid.classList.add("grid");

  const row = document.createElement("div");
  row.classList.add("row1");

  const currentImages = imagePaths.slice(i, i + imagesPerRow);
  currentImages.forEach((img) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("image-wrapper");

    const number = document.createElement("span");
    number.classList.add("img-number");
    number.textContent = imageCount;

    const image = document.createElement("img");
    image.src = `./Images/${img}`;
    image.alt = `Photo ${imageCount}`;

    image.addEventListener("mouseenter", () => {
      document.querySelector(".frame img").src = image.src;
    });

    wrapper.appendChild(number);
    wrapper.appendChild(image);
    row.appendChild(wrapper);

    imageCount++;
  });

  grid.appendChild(row);
  leftPanel.appendChild(grid);
}
