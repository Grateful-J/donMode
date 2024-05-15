function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
    document.body.style.backgroundColor = "#111";
  } else {
    document.documentElement.style.filter = "";
    document.body.style.backgroundColor = "#fff";
  }
}

// Event listener for the toggle theme button
document.getElementById("toggleTheme").addEventListener("click", function () {
  toggleTheme();
});
