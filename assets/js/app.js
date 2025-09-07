document.addEventListener("DOMContentLoaded", function () {
  const fullscreenToggle = document.getElementById('fullscreenToggle');
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  const storedTheme = localStorage.getItem("data-bs-theme");
  const storedIconClass =
    localStorage.getItem("data-theme-icon") || "bi-circle-half";
  const themeIcon = document.getElementById("themeIcon");

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = function (theme) {
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

  setTheme(getPreferredTheme());
  themeIcon.className = `bi ${storedIconClass}`;

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (storedTheme === "auto") {
        setTheme("auto");
      }
    });

  // Set theme class and icon on menu click
  document.querySelectorAll("[data-theme-value]").forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-theme-value");
      localStorage.setItem("data-bs-theme", theme);
      setTheme(theme);

      const iconClass = button.getAttribute("data-theme-icon");
      localStorage.setItem("data-theme-icon", iconClass);
      themeIcon.className = `bi ${iconClass}`;
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
});
