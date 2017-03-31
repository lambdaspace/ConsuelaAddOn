var port = chrome.runtime.connect({name: "HTMLData"});

port.onMessage.addListener(function(msg) {
  // Restore previous HTML body
  document.getElementsByTagName("body")[0].innerHTML = msg;

  // Make the table's rows (events) clickable
  Array.from(document.getElementsByClassName("clickable")).forEach(function(eventRow) {
    eventRow.onclick = function() {
      window.open(eventRow.getAttribute("url"));
    };
  });
});

port.postMessage("get");
