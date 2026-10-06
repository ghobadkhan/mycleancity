const themeMenu = document.querySelector("#theme-menu");
const themeOptions = [...themeMenu.querySelectorAll("[data-theme-option]")];
const savedPreferenceKey = "my-clean-city-theme";
const splash = document.querySelector("#campaign-splash");
const splashOptOut = document.querySelector("#splash-optout");
const splashSeenKey = "my-clean-city-splash-dismissed";
const splashSlides = [...document.querySelectorAll(".splash-slide")];
const splashHeadline = document.querySelector("#splash-title");
const splashNowLine = document.querySelector(".splash-now-line");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let preference = "system";
let activeSlide = 0;
let slideTimer;
let headlineTimer;

try {
  const savedPreference = localStorage.getItem(savedPreferenceKey);
  if (["system", "light", "dark"].includes(savedPreference)) {
    preference = savedPreference;
  }
} catch {
  // Keep the system preference when browser storage is unavailable.
}

function applyPreference(value) {
  if (value === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = value;
  }
  themeMenu.dataset.current = value;
  themeOptions.forEach((option) => {
    option.setAttribute("aria-pressed", String(option.dataset.themeOption === value));
  });
}

applyPreference(preference);

const typedText = splashNowLine.textContent;
splashNowLine.replaceChildren();
[...typedText].forEach((character, index) => {
  const characterElement = document.createElement("span");
  characterElement.className = "splash-now-character";
  characterElement.textContent = character === " " ? "\u00a0" : character;
  characterElement.style.transitionDelay = prefersReducedMotion ? "0ms" : `${index * 480}ms`;
  splashNowLine.append(characterElement);
});

themeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    preference = option.dataset.themeOption;
    applyPreference(preference);
    try {
      localStorage.setItem(savedPreferenceKey, preference);
    } catch {
      // The selected theme still applies for this page view.
    }
  });
});

const navLinks = [...document.querySelectorAll("nav a")];
const navSections = navLinks.map((link) => document.querySelector(link.getAttribute("href")));

function updateActiveNav() {
  const line = window.innerHeight * 0.35;
  let current = 0;
  navSections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= line) current = index;
  });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = navSections.length - 1;
  }
  navLinks.forEach((link, index) => {
    link.classList.toggle("is-active", index === current);
    if (index === current) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
  const nav = navLinks[0].parentElement;
  if (nav.scrollWidth > nav.clientWidth) {
    const link = navLinks[current];
    nav.scrollLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
  }
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);
updateActiveNav();

try {
  if (localStorage.getItem(splashSeenKey) !== "true") {
    splash.showModal();
  }
} catch {
  splash.showModal();
}

if (splash.open) {
  if (prefersReducedMotion) {
    splashHeadline.classList.add("is-transformed");
  } else {
    headlineTimer = window.setTimeout(() => {
      splashHeadline.classList.add("is-transformed");
    }, 2000);
  }
}

function showNextSlide() {
  splashSlides[activeSlide].classList.remove("is-active");
  splashSlides[activeSlide].setAttribute("aria-hidden", "true");
  activeSlide = (activeSlide + 1) % splashSlides.length;
  splashSlides[activeSlide].classList.add("is-active");
  splashSlides[activeSlide].removeAttribute("aria-hidden");
}

if (splash.open && !prefersReducedMotion) {
  slideTimer = window.setInterval(showNextSlide, 3000);
}

document.querySelector(".splash-close").addEventListener("click", () => splash.close());

splash.addEventListener("close", () => {
  window.clearTimeout(headlineTimer);
  window.clearInterval(slideTimer);
  if (!splashOptOut.checked) return;
  try {
    localStorage.setItem(splashSeenKey, "true");
  } catch {
    // The splash can still be dismissed for this page view.
  }
});