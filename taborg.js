let categorizeBtn = document.getElementById("categorizeBtn");
let resetBtn = document.getElementById("resetBtn");

// send message to background.js to categorize tabs
categorizeBtn.addEventListener("click", function() {
  chrome.runtime.sendMessage({action: "categorizeTabs"}, function(response) {
    console.log(response.message);
  });
});

// send message to background.js to reset tab categories
resetBtn.addEventListener("click", function() {
  chrome.runtime.sendMessage({action: "resetTabs"}, function(response) {
    console.log(response.message);
  });
});
