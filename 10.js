var stderr = require('system').stderr;
var stdin = require('system').stdin;

function write(obj) {
    stderr.write(JSON.stringify(obj));
    if (obj.action !== "ack") read();
}

function read() {
    var data = stdin.readLine();
    try { _read(JSON.parse(data)); }
    catch (e) { throw new Error(data); }
}

function _read(data) {
    if (Array.isArray(data)) data.forEach(_readLine);
}

function _readLine(obj) {
    if (obj.action !== "ack") write({ action: "ack", obj: obj });
}

setInterval(function() {
    write({ action : "heartbeat" });
}, 1e3);

var page = require('webpage').create();
page.open("http://github.com", function(status) {
    if (status == "success") {
        write({ action: "opened" });
        page.render('github.jpg');
        write({ action: "rendered" });
    }
    phantom.exit();
});
