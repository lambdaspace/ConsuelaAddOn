var isOpen = false;

function checkStatus(text) {
  let num = parseInt(text, 10);
  if (num > 0) {
    chrome.browserAction.setTitle({ title: 'λspace is open' });
    chrome.browserAction.setBadgeText({ text: num.toString() });
    chrome.browserAction.setBadgeBackgroundColor({ color: '#808080' });
    chrome.browserAction.setIcon({
      path: {
        48: 'icons/o_48x48.png',
        96: 'icons/o_96x96.png'
      }
    });
  } else {
    chrome.browserAction.setTitle({ title: 'λspace is closed' });
    chrome.browserAction.setBadgeText({ text: '' });
    chrome.browserAction.setIcon({
      path: {
        48: 'icons/c_48x48.png',
        96: 'icons/c_96x96.png'
      }
    });
  }
}

function timer() {
  fetch('https://api.lambdaspace.gr/api/v2.0/status')
    .then(response => response.json())
    .then(data => checkStatus(data.people_now_present))
    .catch(e => console.error(e));
}

timer();
setInterval(timer, 300000);
