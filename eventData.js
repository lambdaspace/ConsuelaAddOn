function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
};

function setEventData(data) {
  eventData = data;
};

function getEventData() {
  httpGetAsync("https://discourse.techministry.gr/c/5/l/latest.json", setEventData);
};

var eventData;

getEventData();
setInterval(getEventData, 300000);

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name == "eventData") {
    port.postMessage(eventData);
  }
});
