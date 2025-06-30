const leftPanel = document.getElementById("left-panel");

const imagePaths = [
  "1.jpg",
  "2.webp",
  "3.png",
  "4.webp",
  "5.jpg",
  "6.webp",
  "7.jpg",
  "8.jpg",
  "9.webp",
  "10.jpg",
  "11.webp",
  "12.jpg",
  "13.jpg",
  "14.webp",
  "15.webp",
  "16.jpg"
];

const imagesPerRow = 4;
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

    // Smart preview on hover
    image.addEventListener("mouseenter", () => {
      const frameImg = document.querySelector(".frame img");

      const tempImg = new Image();
      tempImg.src = image.src;
      tempImg.onload = () => {
        frameImg.src = image.src;

        if (tempImg.height > tempImg.width) {
          frameImg.style.objectFit = "contain";
          frameImg.style.width = "580px";
          frameImg.style.height = "700px";
        } else {
          frameImg.style.objectFit = "cover";
          frameImg.style.width = "580px";
          frameImg.style.height = "320px";
        }
      };
    });

    wrapper.appendChild(number);
    wrapper.appendChild(image);
    row.appendChild(wrapper);

    imageCount++;
  });

  grid.appendChild(row);
  leftPanel.appendChild(grid);
}
