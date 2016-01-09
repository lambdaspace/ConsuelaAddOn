var self = require('sdk/self');
var buttons = require('sdk/ui/button/action');
var panels = require('sdk/panel');

var panel = panels.Panel({
  contentURL: self.data.url('panel.html')
});

var button = buttons.ActionButton({
  id: "consuela-button",
  label: "TechMinistry status",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  panel.show({
    position: button,
    width: 450
  });
}
