const acceptedClasses = new Set([
  "floating-text__black",
  "floating-text__black-outline",
  "floating-text__colored",
  "floating-text__colored-outline",
  "floating-text__strong",
  "floating-text__strong-outline",
  "floating-text__white",
  "floating-text__white-outline",
]);

const developFloatingTextElement = (floatingTextElement) => {
  // Move accepted children into copy element.
  // Count the number of words.
  let wordNumber = 0;
  const copyElement = document.createElement("div");
  copyElement.classList.add("floating-text__copy");

  Array.from(floatingTextElement.children).forEach((child) => {
    floatingTextElement.removeChild(child);

    for (const htmlClass of child.classList) {
      if (acceptedClasses.has(htmlClass)) {
        copyElement.appendChild(child);
        wordNumber += child.innerText.split(" ").length;
        break;
      }
    }
  });

  const secondsPerWord = Number(
    floatingTextElement.getAttribute("seconds-per-word")
  );
  copyElement.style.animationDuration = `${wordNumber * secondsPerWord}s`;
  floatingTextElement.appendChild(copyElement);

  developCopyElement(copyElement);

  const sizeElement = document.createElement("div");
  sizeElement.classList.add("floating-text__size");
  floatingTextElement.appendChild(sizeElement);

  const ensureEnoughCopies = () => {
    let copyCount = floatingTextElement.querySelectorAll(
      ":scope > .floating-text__copy"
    ).length;

    const neededCopyCount =
      Math.ceil(floatingTextElement.offsetWidth / copyElement.offsetWidth) + 1;
    while (copyCount < neededCopyCount) {
      floatingTextElement.appendChild(copyElement.cloneNode(true));
      copyCount++;
    }

    copyElement.style.marginLeft = `-${
      (100 * copyElement.offsetWidth) / floatingTextElement.offsetWidth
    }%`;
  };

  ensureEnoughCopies();
  window.addEventListener("resize", ensureEnoughCopies);

  floatingTextElement.classList.add("developed");
};

const developCopyElement = (copyElement) => {
  // Find and add shadow to strong styled text.
  Array.from(
    copyElement.querySelectorAll(
      ":scope > .floating-text__strong, :scope > .floating-text__strong-outline"
    )
  ).forEach((strongChild) => {
    const shadowElement = document.createElement("div");
    shadowElement.classList.add("floating-text__strong-shadow");
    shadowElement.innerHTML = strongChild.innerHTML;

    const shadowRepositionElement = document.createElement("div");
    shadowRepositionElement.classList.add(
      "floating-text__strong-shadow-reposition"
    );
    shadowRepositionElement.appendChild(shadowElement);

    copyElement.insertBefore(shadowRepositionElement, strongChild);
  });

  // Ensure non breaking space after each text section.
  Array.from(copyElement.children).forEach((child) => {
    if (child.innerHTML.length === 0) {
      return;
    }

    if (child.innerHTML.at(-1) === "\xA0") {
      return;
    }

    child.innerHTML += "\xA0";
  });
};

window.addEventListener("load", () => {
  const floatingTextElementsToDevelop = document.querySelectorAll(
    ".floating-text:not(.developed)"
  );
  floatingTextElementsToDevelop.forEach((floatingTextElement) => {
    developFloatingTextElement(floatingTextElement);
  });
});
