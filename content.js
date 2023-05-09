// listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // check if the message is to highlight tabs
    if (request.action === "highlightTabs") {
      const category = request.category;
      // loop through all tabs in the current window and highlight the ones in the category
      chrome.tabs.query({currentWindow: true}, function(tabs) {
        tabs.forEach(function(tab) {
          if (tab.url.includes(category)) {
            chrome.tabs.highlight({tabs: tab.index}, function() {
              // send a response to confirm that the tabs were highlighted
              sendResponse({result: "success"});
            });
          }
        });
      });
      // indicate that we will respond asynchronously
      return true;
    }
  });
  