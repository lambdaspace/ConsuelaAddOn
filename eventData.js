function httpGetAsync(theUrl, callback) {
  fetch(theUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      callback(response);
    });
};

//Updates the eventData variable and resets the popup's html document
function setEventData(data) {
  if (eventData != data) {
    eventData = data;
    chrome.browserAction.setPopup({popup: "events.html"});
  }
};

function getEventData() {
  httpGetAsync("https://api.lambdaspace.gr/api/v2.0/events", setEventData);
};

//Stores the latest JSON response from discourse
var eventData;

//Stores content of the latest generated HTML body
var HTMLbodyData;

getEventData();
setInterval(getEventData, 300000);

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name == "HTMLData") {
    port.onMessage.addListener(function(msg) {
      if (msg == "get") {
        port.postMessage(HTMLbodyData);
      } else {
        HTMLbodyData = msg;
      }
    });
  } else if (port.name == "eventData") {
    port.postMessage(eventData);
  }
});
