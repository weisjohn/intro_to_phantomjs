var fs = require('fs');
var stdin = fs.open('nodephantom', 'r');

function out(data) { console.log("hello from phantom"); }
var writing = setInterval(function() {
    var line = stdin.readLine();
    console.log("from node", line);
}, 1e3);

setInterval(function() {
    out({ action: "render", value: "message" });
}, 1e3);

setTimeout(function() { 
    clearInterval(writing);
    phantom.exit(0); 
}, 2e3);