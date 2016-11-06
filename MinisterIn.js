var isOpen = false;

function checkStatus(text){
  num = parseInt(text);
  if (num > 0) {
    chrome.browserAction.setTitle({title: 'λspace is open'});
    chrome.browserAction.setBadgeText({text: num.toString() });
    chrome.browserAction.setBadgeBackgroundColor({color: '#808080'});
    chrome.browserAction.setIcon({path: {
      48: "icons/o_48x48.png",
      96: "icons/o_96x96.png"
    }});
  }else {
    chrome.browserAction.setTitle({title: 'λspace is closed'});
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setIcon({path: {
      48: "icons/c_48x48.png",
      96: "icons/c_96x96.png"
    }});
  }
}

function httpGetAsync(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

function timer(){
  httpGetAsync("https://www.lambdaspace.gr/hackers.txt", checkStatus);
}

timer();
setInterval(timer, 300000);
