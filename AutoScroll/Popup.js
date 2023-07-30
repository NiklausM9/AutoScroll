document.addEventListener('DOMContentLoaded', function () {
  var stopButton = document.getElementById('stopButton');
  var upButton = document.getElementById('upButton');
  var downButton = document.getElementById('downButton');
  var tabId;

  stopButton.addEventListener('click', function () {
    chrome.tabs.sendMessage(tabId, { action: 'stopScrolling' });
  });

  upButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      tabId = tabs[0].id;
      chrome.tabs.executeScript(tabId, { file: 'up.js' });
    });
    attachEventListeners(); // Reattach event listeners
  });

  downButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      tabId = tabs[0].id;
      chrome.tabs.executeScript(tabId, { file: 'down.js' });
    });
    attachEventListeners(); // Reattach event listeners
  });

  function attachEventListeners() {
    stopButton.addEventListener('click', function () {
      chrome.tabs.sendMessage(tabId, { action: 'stopScrolling' });
    });

    upButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tabId = tabs[0].id;
        chrome.tabs.executeScript(tabId, { file: 'up.js' });
      });
    });

    downButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tabId = tabs[0].id;
        chrome.tabs.executeScript(tabId, { file: 'down.js' });
      });
    });
  }
});
