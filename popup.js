document.addEventListener("DOMContentLoaded", function(event) {
  chrome.tabs.query({}, function(tabs) {
    var tabList = document.getElementById('tab-list');
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      var li = document.createElement('li');
      li.textContent = tab.title;
      li.setAttribute('title', tab.url);
      li.addEventListener('click', function() {
        chrome.tabs.update(tab.id, { active: true });
        window.close();
      });
      tabList.appendChild(li);
    }
  });
});
