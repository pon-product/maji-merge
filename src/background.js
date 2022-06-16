chrome.tabs.onUpdated.addListener(function (_, info, tab) {
  const regex = new RegExp('https://github.com/.+/.+/pull/.+');

  if (
    info.status === 'complete' &&
    regex.test(tab.url)
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      files: ['./src/content.js'],
    });
  }
});