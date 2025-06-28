const thumbnails = document.querySelectorAll(".left img");
const mainFrame = document.querySelector(".frame img");

thumbnails.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    mainFrame.src = img.src;
  });
});
