/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'stopScrolling') {
    chrome.tabs.executeScript({ code: 'clearInterval(scrollInterval);' });
  }
});
*/

// background.js

let scrollInterval;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'stopScrolling') {
    clearInterval(scrollInterval);
  }
});
