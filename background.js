console = chrome.extension.getBackgroundPage().console;

//set initial value, without this code no workie 
chrome.storage.sync.set({ 'dark': false }, function () {
});


//add or remove css based on if dark is true or false everytime the browser is refreshed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    chrome.storage.sync.get(['dark'], function (result) {
      if (result.dark === true) {
        chrome.tabs.insertCSS(null, { runAt: "document_start", file: "dark_mode.css" });
        chrome.storage.sync.set({ 'dark': true }, function () {
          // Notify that we saved.
          console.log('Dark enabled ' + result.dark);
        });
      }

      else if (result.dark === false) {
        chrome.tabs.removeCSS(null, { file: "dark_mode.css" });
        chrome.storage.sync.set({ 'dark': false }, function () {
          // Notify that we saved.
          console.log('Dark enabled ' + result.dark);
        });
      }
    })
  }
}
)



//toggle dark mode once we click on the extension
chrome.browserAction.onClicked.addListener(function (tab) {

  chrome.storage.sync.get(['dark'], function (result) {
    if (result.dark === false) {
      chrome.tabs.insertCSS(null, { file: "dark_mode.css" });
      chrome.storage.sync.set({ 'dark': true }, function () {
        console.log('Dark enabled ' + result.dark);
      });
    }

    else if (result.dark === true) {
      chrome.tabs.removeCSS(null, { file: "dark_mode.css" });
      chrome.storage.sync.set({ 'dark': false }, function () {
        console.log('Dark enabled ' + result.dark);
        chrome.tabs.reload()
      });
    }
  })
})

