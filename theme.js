const themeSelect = document.querySelector("#theme-preference");
const savedPreferenceKey = "my-clean-city-theme";
let preference = "system";

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

themeSelect.addEventListener("change", () => {
  preference = themeSelect.value;
  applyPreference(preference);
  try {
    localStorage.setItem(savedPreferenceKey, preference);
  } catch {
    // The selected theme still applies for this page view.
  }
});