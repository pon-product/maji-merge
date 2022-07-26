const observedTabIdList = {};

chrome.tabs.onUpdated.addListener(function (_, info, tab) {
  const regex = new RegExp('^https://github.com/.+/.+/pull/([0-9]+(#.+)?)$');
  if (info.status) {
    if (regex.test(tab.url)) {
      if (info.status === 'complete' && !isObserved(tab.id)) {
        observedTabIdList[tab.id] = observe(tab.id);
      }
    } else {
      clearObserved(tab.id);
    }
  }
});

chrome.tabs.onRemoved.addListener(function (tabId, _) {
  clearObserved(tabId);
  console.log(observedTabIdList);
});

function isObserved(tabId) {
  return observedTabIdList[tabId] != null;
}

function clearObserved(tabId) {
  if (isObserved(tabId)) {
    clearInterval(observedTabIdList[tabId]);
    delete observedTabIdList[tabId];
  }
}

function observe(tabId) {
  return setInterval(() => {
    chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: false },
      files: ['./src/content.js'],
    });
  }, 1000);
}