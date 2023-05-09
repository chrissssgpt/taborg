function categorizeTabs() {
    chrome.windows.getAll({ populate: true }, function (windows) {
      let categories = {};
      windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
          if (tab.url.startsWith("http")) {
            let category = getCategory(tab.url);
            if (!(category in categories)) {
              categories[category] = [];
            }
            categories[category].push(tab);
          }
        });
      });
      displayCategories(categories);
    });
  }
  
  function getCategory(url) {
    let category = "Other";
    let patterns = [
      { name: "Google", pattern: "google.com" },
      { name: "Social Media", pattern: "facebook.com|twitter.com|instagram.com" },
      { name: "News", pattern: "cnn.com|nytimes.com|foxnews.com" },
      { name: "Shopping", pattern: "amazon.com|ebay.com|walmart.com" },
    ];
    patterns.forEach(function (p) {
      if (url.match(p.pattern)) {
        category = p.name;
      }
    });
    return category;
  }
  
  function displayCategories(categories) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentTab = tabs[0];
      let popup = window.open("", "popup", "width=800,height=600");
      let list = document.createElement('ul');
      for (let category in categories) {
        let listItem = document.createElement('li');
        let categoryTitle = document.createElement('h2');
        let categoryContent = document.createElement('ul');
        categoryTitle.innerText = category;
        categories[category].forEach(function (tab) {
          let tabLink = document.createElement('a');
          let tabTitle = document.createElement('span');
          let tabUrl = document.createElement('span');
          let tabListItem = document.createElement('li');
          tabLink.href = tab.url;
          tabLink.target = '_blank';
          tabTitle.innerText = tab.title;
          tabUrl.innerText = tab.url;
          tabLink.appendChild(tabTitle);
          tabLink.appendChild(tabUrl);
          tabListItem.appendChild(tabLink);
          categoryContent.appendChild(tabListItem);
        });
        listItem.appendChild(categoryTitle);
        listItem.appendChild(categoryContent);
        list.appendChild(listItem);
      }
      popup.document.body.appendChild(list);
      chrome.tabs.update(currentTab.id, { active: true });
    });
  }
  
  chrome.browserAction.onClicked.addListener(categorizeTabs);
  
  