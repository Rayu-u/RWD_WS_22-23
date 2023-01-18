import { colors, generateStripesElement } from "stripes";

export const generateButtonElement = (color, text) => {
  const buttonElement = document.createElement("div");
  buttonElement.classList("button");
  buttonElement.setAttribute("color", color);
  buttonElement.setAttribute("text", text);

  developButtonElement(buttonElement);
  buttonElement.classList.remove("developed");
  buttonElement.classList.add("generated");

  return buttonElement;
};

const developButtonElement = (buttonElement) => {
  const color = buttonElement.getAttribute("color");
  if (!(color in colors)) {
    console.error(
      `Unknown color attribute value on button element attempted developed, ${color}.`,
      buttonElement
    );
    return;
  }

  const textContainerElement = document.createElement("div");
  textContainerElement.classList.add("button__text-container");

  const textBackgroundElement = document.createElement("div");
  textBackgroundElement.classList.add("button__text-background");
  textContainerElement.appendChild(textBackgroundElement);

  const textLines = buttonElement.getAttribute("text").split(";");
  buttonElement.removeAttribute("text");
  textLines.forEach((textLine) => {
    const textLineElement = document.createElement("span");
    textLineElement.classList.add("button__text-line");
    textLineElement.innerText = textLine;
    textContainerElement.appendChild(textLineElement);
  });

  const backgroundElement = document.createElement("div");
  backgroundElement.classList.add("button__background");

  const stripesElement = generateStripesElement(color);

  buttonElement.appendChild(backgroundElement);
  buttonElement.appendChild(stripesElement);
  buttonElement.appendChild(textContainerElement);
  buttonElement.addEventListener("mouseenter", () => {
    stripesElement.classList.add("half-active");
  });
  buttonElement.addEventListener("mouseleave", () => {
    stripesElement.classList.remove("half-active");
  });

  buttonElement.classList.add("developed");
};

window.addEventListener("load", () => {
  let buttonElementsToDevelop = document.querySelectorAll(
    ".button:not(.developed):not(.generated)"
  );
  buttonElementsToDevelop.forEach((buttonElement) => {
    developButtonElement(buttonElement);
  });
});
