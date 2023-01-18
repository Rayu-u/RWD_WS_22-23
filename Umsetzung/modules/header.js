const linkSpecifications = {
  left: [
    {
      destination: "#",
      text: "Sorten",
    },
    {
      destination: "#",
      text: "Geschichte",
    },
  ],
  right: [
    {
      destination: "#",
      text: "Shop",
    },
  ],
};

const appendLinkElements = (element, linkSpecifications) => {
  linkSpecifications.forEach((linkSpecification) => {
    const linkElement = document.createElement("div");
    linkElement.classList.add("header__link");
    linkElement.innerText = linkSpecification.text;
    element.appendChild(linkElement);
  });
};

export const generateHeaderElement = () => {
  const fullLogoElement = document.createElement("img");
  fullLogoElement.classList.add("header__full-logo");
  fullLogoElement.alt = "";
  fullLogoElement.src = "assets/logos/full.svg";

  const simpleLogoElement = document.createElement("img");
  simpleLogoElement.classList.add("header__simple-logo");
  simpleLogoElement.alt = "";
  simpleLogoElement.src = "assets/logos/simple.svg";

  const logoContainerElement = document.createElement("div");
  logoContainerElement.classList.add("header__logo-container");
  logoContainerElement.appendChild(fullLogoElement);
  logoContainerElement.appendChild(simpleLogoElement);

  const linkSeparatorElement = document.createElement("div");
  linkSeparatorElement.classList.add("header__link-separator");

  const linkRowElement = document.createElement("div");
  linkRowElement.classList.add("header__link-row");
  appendLinkElements(linkRowElement, linkSpecifications.left);
  linkRowElement.appendChild(linkSeparatorElement);
  appendLinkElements(linkRowElement, linkSpecifications.right);

  const contentContainerElement = document.createElement("div");
  contentContainerElement.classList.add("header__content-container");
  contentContainerElement.appendChild(logoContainerElement);
  contentContainerElement.appendChild(linkRowElement);

  const headerElement = document.createElement("div");
  headerElement.classList.add("header");
  headerElement.appendChild(contentContainerElement);

  headerElement.classList.add("generated");
  return headerElement;
};

window.addEventListener("load", () => {
  // Create header elements
  const displacementHeaderElement = generateHeaderElement();
  displacementHeaderElement.classList.add("displacement");
  const visibleHeaderElement = generateHeaderElement();

  document.body.insertBefore(
    displacementHeaderElement,
    document.body.firstChild
  );
  document.body.appendChild(visibleHeaderElement);

  // Attach scroll behavior
  let lastScrollPosition = window.screenY;
  document.addEventListener("scroll", (event) => {
    if (window.scrollY === 0) {
      // Header is at the top of the page and should not be raised.
      visibleHeaderElement.classList.remove("raised");
    } else {
      // Header is not at the top of the page and should be raised.
      visibleHeaderElement.classList.add("raised");
    }

    if (window.scrollY < displacementHeaderElement.offsetHeight) {
      // Displacement header would still be visible if the normal header is hidden.
      visibleHeaderElement.classList.remove("hidden");
    } else if (lastScrollPosition < window.scrollY) {
      // Window was scrolled down.
      visibleHeaderElement.classList.add("hidden");
    } else if (window.scrollY < lastScrollPosition) {
      // Window was scrolled up.
      visibleHeaderElement.classList.remove("hidden");
    }

    lastScrollPosition = window.scrollY;
  });
});
