var port = chrome.runtime.connect({name: "HTMLData"});

port.onMessage.addListener(function(msg) {
  document.getElementsByTagName("body")[0].innerHTML = msg;
});

port.postMessage("get");
