// create an object to hold the tab categories
const tabCategories = {};

// add a listener for the browser action button click
chrome.browserAction.onClicked.addListener(function(tab) {
  // get all tabs in the current window
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    // loop through each tab and group them into categories
    tabs.forEach(function(tab) {
      // check if the tab's URL matches a category
      let categoryFound = false;
      for (let category in tabCategories) {
        if (tab.url.includes(category)) {
          // add the tab to the existing category
          tabCategories[category].push(tab);
          categoryFound = true;
          break;
        }
      }
      // if the tab doesn't match any category, create a new category
      if (!categoryFound) {
        const newCategory = getCategory(tab.url);
        tabCategories[newCategory] = [tab];
      }
    });
    // open a new window with the categorized tabs
    const windowOptions = {
      url: "categorizedTabs.html",
      type: "popup",
      width: 800,
      height: 600
    };
    chrome.windows.create(windowOptions, function(window) {
      // send the tab categories to the new window
      chrome.runtime.onConnect.addListener(function(port) {
        if (port.name === "categorizedTabs") {
          port.postMessage(tabCategories);
        }
      });
    });
  });
});

// function to get the category of a URL
function getCategory(url) {
  // define a list of categories and their associated keywords
  const categories = {
    "News": ["bbc", "cnn", "foxnews", "nytimes", "reuters"],
    "Social Media": ["facebook", "instagram", "twitter"],
    "Shopping": ["amazon", "ebay", "etsy"],
    "Entertainment": ["youtube", "netflix", "hulu", "spotify"],
    "Work": ["gmail", "outlook", "slack", "trello"]
  };
  // loop through each category and check if the URL includes any of its keywords
  for (let category in categories) {
    if (categories[category].some(keyword => url.includes(keyword))) {
      return category;
    }
  }
  // if no category is found, return "Other"
  return "Other";
}
