const themeSelect = document.querySelector("#theme-preference");
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
  themeSelect.value = value;
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

themeSelect.addEventListener("change", () => {
  preference = themeSelect.value;
  applyPreference(preference);
  try {
    localStorage.setItem(savedPreferenceKey, preference);
  } catch {
    // The selected theme still applies for this page view.
  }
});

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