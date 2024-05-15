// background.js

// Function to toggle the theme
function toggleTheme() {
  chrome.storage.local.get(["theme"], function (result) {
    let theme = result.theme === "dark" ? "light" : "dark";
    chrome.storage.local.set({ theme: theme }, function () {
      console.log("Theme set to " + theme);
    });
  });
}

// Listen for tab updates to apply the theme
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active && isValidUrl(tab.url)) {
    chrome.storage.local.get(["theme"], function (result) {
      let theme = result.theme || "light";
      if (tabId) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            func: applyTheme,
            args: [theme],
          },
          (results) => {
            if (chrome.runtime.lastError) {
              console.error("Script injection failed: " + chrome.runtime.lastError.message);
            } else {
              console.log("Script injected successfully:", results);
            }
          }
        );
      } else {
        console.error("Invalid tabId:", tabId);
      }
    });
  }
});

// Function to apply the theme
function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
    document.body.style.backgroundColor = "#111";
  } else {
    document.documentElement.style.filter = "";
    document.body.style.backgroundColor = "#fff";
  }
}

// Function to check if the URL is valid for script injection
function isValidUrl(url) {
  return url && !url.startsWith("chrome://") && !url.startsWith("https://chrome.google.com");
}

// Toggle theme on page load
chrome.runtime.onInstalled.addListener(toggleTheme);
chrome.runtime.onStartup.addListener(toggleTheme);
