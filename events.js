// Identifies topics about events and creates an object representation
function eventParser(topic) {
  var event = {};
  var tokens = topic.split(' ');
  event.day = tokens[0];
  if (!event.day.match(/^\d\d\/\d\d\/\d\d\d\d+$/)) {
    throw 'Not in expected format';
  }
  var dateTokens = tokens[0].split('/');
  event.date = new Date(dateTokens[2], dateTokens[1] - 1, dateTokens[0], 0, 0);

  if (tokens[1].match(/^\d\d:\d\d+$/)) {
    event.time = tokens[1];
    event.title = topic.substr(17);
  } else {
    event.time = "";
    event.title = topic.substr(11);
  }

  return event;
};


function toDate(dateStr) {
  var parts = dateStr.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Parses the data from discourse and generates tr elements
function parseEvents(data) {
  data.events.forEach(function (event) {
    if (toDate(event.date) >= Date.now()) {
      eventsExist = true;
      var tr = document.createElement("tr");
      tr.className = "clickable";
      tr.setAttribute('url', event.url);
      var td = document.createElement("td")
      td.textContent = event.date;
      tr.appendChild(td);
      td = document.createElement("td")
      td.textContent = event.begin;
      tr.appendChild(td);
      td = document.createElement("td")
      td.textContent = event.title;
      tr.appendChild(td);
      eventsArray.push([event.day, tr]);
    }
  });
};

var eventsExist = false;

// A nx2 array that contains upcoming events in the following form [Date object, tr element]
var eventsArray = [];

var port = chrome.runtime.connect({name: "eventData"});

port.onMessage.addListener(function(eventsJSON) {
  parseEvents(eventsJSON);

  if (eventsExist) {
    // Sort events by date
    eventsArray.sort(function(a, b) {
      return a[0] - b[0];
    });

    // Append the elements to the table
    eventsArray.forEach(function(event) {
      document.getElementById("events").appendChild(event[1]);
    });

    // Make the table's rows (events) clickable
    Array.from(document.getElementsByClassName("clickable")).forEach(function(eventRow) {
      eventRow.onclick = function() {
        window.open(eventRow.getAttribute("url"));
      };
    });
  } else {
    document.getElementById("events").outerHTML = "<p> There are currently no upcoming events <br> Check again later and have a nice day :) </p>";
  }

  document.getElementsByTagName("script")[0].remove();

  //Send the current content of body to the background script
  chrome.runtime.connect({name: "HTMLData"}).postMessage(document.getElementsByTagName("body")[0].innerHTML);

  //Set the popup's HTML document to the dummy one
  chrome.browserAction.setPopup({popup: "eventsDummy.html"});
});
