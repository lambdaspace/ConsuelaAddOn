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
  fetch('https://www.lambdaspace.gr/hackers.txt')
    .then(response => response.text()) // Get the text of the response
    .then(data => checkStatus(data))
    .catch(e => console.error(e)); // Handle exeptions
}

timer();
setInterval(timer, 300000);
