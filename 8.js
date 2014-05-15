var fs = require('fs');
var stdin = fs.open('nodephantom', 'r');

function out(data) { console.log("hello from phantom"); }
var closing = false;
var writing = setInterval(function() {
    if (!closing) var line = stdin.readLine();
    console.log("phantom:", line);
}, 1e3);

setInterval(function() {
    out({ action: "render", value: "message" });
}, 1e3);

setTimeout(function() { 
    closing = true;
    clearInterval(writing);
    phantom.exit(0); 
}, 3e3);