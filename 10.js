
var stderr = require('system').stderr;
var stdin = require('system').stdin;

function write(obj) {
    stderr.write(JSON.stringify(obj) + "\n");
    if (obj.action !== "ack") read();
}

function read() {
    var data = stdin.readLine();
    try { data.split("\t").forEach(_read) } 
    catch (e) { throw new Error(data); }
}

function _read(data) { return _readLine(JSON.parse(data)); }
function _readLine(obj) {
    // write({ "action": "ack", "obj": obj })
    if (obj.action !== "ack") write({ action: "ack", obj: obj });
    // TODO: invoke routes here
}

setInterval(function() {
    write({ "action" : "heartbeat" });
}, 1e2);

var page = require('webpage').create();
page.open("http://github.com", function(status) {
    if (status == "success") {
        write({ "action": "opened" });
        page.render('github.jpg');
        write({ "action": "rendered" });
    }
    phantom.exit();
});
