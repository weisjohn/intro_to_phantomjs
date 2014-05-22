
var spawn = require('child_process').spawn;
var phantomjs = spawn('phantomjs', ['10.js']);

phantomjs.stderr.on('data', function(data) {
    data.toString().split('\n').forEach(_read);
});

phantomjs.on('exit', function() { console.log('done'); });

var writeBuffer = [];
function write(obj) { writeBuffer.push(JSON.stringify(obj)); }
function _write() {
    phantomjs.stdin.write(writeBuffer.join("\t") + "\n");
    writeBuffer = [];
}

function _read(data) {
    if (!data) return;
    try { data = JSON.parse(data) } 
    catch (e) { console.log(e); console.log(data); throw new Error(e); }
    read(data);
}
function read(obj) {
    if (obj.action == "ack")
        return console.log("phantom:", obj.obj);
    
    write({ "action": "ack" });
    // TODO: invoke routes here
    console.log("node:", obj);
    _write();
}

setInterval(function() {
    write({ action : "heartbeat" });
}, 1e2);
