document.addEventListener("DOMContentLoaded", function () {
  const fullscreenToggle = document.getElementById("fullscreenToggle");
  const fullscreenIcon = document.getElementById("fullscreenIcon");
  const storedTheme = localStorage.getItem("data-bs-theme"); // Get the theme from local storage or system preference

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = function (theme) {
    // Apply the theme to the HTML element
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  const setActiveTheme = (theme) => {
    // const themeDropdown = document.querySelector('#themeDropdown');
    const themeIcon = document.querySelector("#themeIcon");
    const activeItem = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const allItems = document.querySelectorAll("[data-bs-theme-value]");

    // Remove active class from all items
    allItems.forEach((item) => item.classList.remove("active"));

    // Add active class to the current item
    if (activeItem) {
      activeItem.classList.add("active");
      // Update the button text to show the currently selected theme
      // themeDropdown.textContent = `${activeItem.textContent}`;
      themeIcon.className = `bi ${activeItem.getAttribute(
        "data-bs-theme-icon"
      )}`;
    }
  };

  // Set the theme on initial page load
  const preferredTheme = getPreferredTheme();
  setTheme(preferredTheme);
  setActiveTheme(preferredTheme);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      // Listen for system theme changes and update if on 'auto'
      if (storedTheme === "auto") {
        setTheme("auto");
      }
    });

  // Handle clicks on theme-switching dropdown items
  document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const theme = toggle.getAttribute("data-bs-theme-value");
      localStorage.setItem("data-bs-theme", theme);
      setTheme(theme);
      setActiveTheme(theme);
    });
  });

  // Sidebar toggle
  const sidebar = document.getElementById("sidebar");
  document.getElementById("sidebarToggle").onclick = () =>
    sidebar.classList.toggle("collapsed");

  // Mobile sidebar toggle
  const sidebarToggleDesktop = document.getElementById("sidebarToggleDesktop");
  sidebarToggleDesktop.onclick = () => sidebar.classList.toggle("show");

  // Fullscreen toggle
  if (fullscreenToggle) {
    fullscreenToggle.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenIcon.className = "bi bi-fullscreen-exit";
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          fullscreenIcon.className = "bi bi-fullscreen";
        }
      }
    });
  }

  // Animate numbers
  const animatedNumbers = document.querySelectorAll(".animated-number");
  animatedNumbers.forEach((numberElement) => {
    const targetNumber = parseInt(numberElement.dataset.animatedNumber);
    const numberLength = targetNumber.toString().length;

    // Calculate duration based on length (e.g., 0.5s per digit)
    const durationCountUp = numberLength * 0.5; // Adjust multiplier as needed
    const durationFadeIn = numberLength * 1;

    // Apply the animation
    numberElement.style.animation = `countUpAnimatedNumber ${durationCountUp}s ease-out forwards`;
    numberElement.style.animation = `fadeInAnimatedNumber ${durationFadeIn}s ease-out forwards`;

    // For the actual counting effect, you'll need a bit more JS
    // This example focuses on the duration and basic animation setup
    animateNumber(numberElement, targetNumber, durationCountUp);
  });
});

function animateNumber(element, target, duration) {
  let start = 0;
  let startTime = null;

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = (currentTime - startTime) / (duration * 1000); // duration in ms

    if (progress < 1) {
      const current = Math.floor(start + (target - start) * progress);
      element.textContent = current;
      requestAnimationFrame(step);
    } else {
      element.textContent = target;
    }
  }
  requestAnimationFrame(step);
}
