export const colors = {
  gray: "assets/stripes/colored--gray.png",
  mint: "assets/stripes/colored--light-mint.png",
  red: "assets/stripes/colored--light-red.png",
};
const whiteAsset = "assets/stripes/white.png";

export const generateStripesElement = (color) => {
  const stripesElement = document.createElement("div");
  stripesElement.classList.add("stripes");
  stripesElement.setAttribute("color", color);

  developStripesElement(stripesElement);
  stripesElement.classList.remove("developed");
  stripesElement.classList.add("generated");

  return stripesElement;
};

const developStripesElement = (stripesElement) => {
  const color = stripesElement.getAttribute("color");
  if (!(color in colors)) {
    console.error(
      `Unknown color attribute value on stripes element attempted developed, ${color}.`,
      stripesElement
    );
    return;
  }

  const rotatedContainerElement = document.createElement("div");
  rotatedContainerElement.classList.add("stripes__rotated-container");
  [colors[color], whiteAsset].forEach((imageSource) => {
    const stripesImageElement = document.createElement("img");
    stripesImageElement.classList.add("stripes__image");
    stripesImageElement.alt = "";
    stripesImageElement.src = imageSource;
    rotatedContainerElement.appendChild(stripesImageElement);
  });

  const squareElement = document.createElement("div");
  squareElement.classList.add("stripes__square");
  const squareSize = Math.max(
    stripesElement.offsetHeight,
    stripesElement.offsetWidth
  );
  squareElement.style.height = `${squareSize}px`;
  squareElement.style.width = `${squareSize}px`;
  squareElement.appendChild(rotatedContainerElement);

  stripesElement.appendChild(squareElement);

  stripesElement.classList.add("developed");
};

window.addEventListener("load", () => {
  let stripesElementsToDevelop = document.querySelectorAll(
    ".stripes:not(.developed):not(.generated)"
  );
  stripesElementsToDevelop.forEach((stripesElement) => {
    developStripesElement(stripesElement);
  });
});
