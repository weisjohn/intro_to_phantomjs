var spawn = require('child_process').spawn;
var phantomjs = spawn('phantomjs', ['10.js']);

phantomjs.stderr.on('data', function(data) {
    data = data.toString();
    try { read(JSON.parse(data)); } 
    catch (e) { throw new Error(data); }
});

phantomjs.on('exit', function() { console.log('done'); });

var writeBuffer = [];
function write(obj) { 
    writeBuffer.push(JSON.stringify(obj)); 
}

function _write() {
    phantomjs.stdin.write(JSON.stringify(writeBuffer) + "\n");
    writeBuffer = [];
}

function read(obj) {
    if (obj.action == "ack") 
        return console.log("phantom:", JSON.parse(obj.obj));
    
    write({ action: "ack" });
    console.log("node:", obj);
    _write();
}