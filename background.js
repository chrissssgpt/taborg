function getTabGroups(callback) {
  chrome.tabs.query({}, (tabs) => {
    const tabGroups = {};
    tabs.forEach((tab) => {
      if (tab.groupId) {
        if (!tabGroups[tab.groupId]) {
          tabGroups[tab.groupId] = {
            id: tab.groupId,
            name: tab.groupTitle,
            tabs: [],
          };
        }
        tabGroups[tab.groupId].tabs.push(tab.id);
      }
    });
    const groups = Object.values(tabGroups);
    callback(groups);
  });
}

function deleteTabGroup(groupId, callback) {
  chrome.tabs.query({ groupId }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.remove(tab.id);
    });
    if (callback) {
      callback();
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'getTabGroups') {
    getTabGroups(sendResponse);
    return true;
  }
  if (message.type === 'deleteTabGroup') {
    deleteTabGroup(message.groupId, sendResponse);
    return true;
  }
});
