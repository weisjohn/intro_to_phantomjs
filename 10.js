

var fs = require('fs');



var stdin = fs.open('nodephantom', 'r');
var stdout = fs.open('phantomnode', 'w');

function out(data) { stdout.writeLine("hello from phantom\n"); }
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
}, 2e3);


// setTimeout(function() { phantom.exit(0); }, 1e3);