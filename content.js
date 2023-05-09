chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getTabData") {
    const tabData = {
      url: sender.tab.url,
      title: sender.tab.title
    };
    sendResponse(tabData);
  }
});
