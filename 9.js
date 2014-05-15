var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var async = require('async');
var there = "nodephantom", back = "phantomnode";
var done = false;

function mkfifo(name) { return function(cb) {
    fs.exists(name, function(exists) {
        if (!exists) return exec("mkfifo " + name, function(err) { cb(err); });
        if (exists) fs.unlink(name, function(err) {
            if (err) return cb(err);
            exec("mkfifo " + name, function(err) { cb(err); });
        });
    });
} }

function mkfifos(cb) {
    async.parallel([ mkfifo(there), mkfifo(back) ], cb)
}

var done = false;
function phantomjs() {
    var phantom = spawn("phantomjs", [ "8.js" ]);
    phantom.on('exit', terminate);
}

function terminate() {
    console.log('terminate called')
    done = true;
    if (writer) writer.kill('SIGHUP');
    if (reader) reader.kill('SIGHUP');
}


var writer, writeLines = [];
function writeLine(msg) {
    if (writer) return setTimeout(function() { writeLine(msg) }, 1e3);
    _writeLine(msg);
}

function _writeLine(msg) {
    console.log('writing')
    writer = exec("echo " + msg + " > " + there, function(err) {
        console.log('written')
        writer = null;
    });
}


var reader, readLines = [];
function readLine() {
    if (reader) return setTimeout(function() { readLine() }, 1e3);
    _readLine();
}

function _readLine() {
    console.log('reading')
    reader = exec("tail -n 1 " + back, function(err, data) {
        console.log('read', data);
        reader = null;
    });
}




function run(cmd) { return function(cb) {
    console.log("starting", cmd)
    console.time(cmd)
    exec(cmd, function(err, stdout, stdin) { 
        console.timeEnd(cmd)
        cb(err); });
} }

var writing;
function start_writing() { return function(cb) {
    writing = setInterval(function() {
        console.log('writing')
        if (!done) write("hello from node", function() {})
    }, 1e3);
    cb();
} }

// function write(msg, cb) {
//     if (done) return cb("already closed");
//     run("ls " + there  + " && echo " + JSON.stringify(msg) + " > " + there)(function(err, stdout, stderr) {
//         if (err) console.log('error writing', err);
//         cb();
//     });
// }

function run_and_read(cmd) { return function(cb) {

    var stream = fs.createReadStream(back);    
    stream.on('data', read);
    stream.on('exit', function() {
        console.log('exit called?')
    });
    stream.on('close', function() {
        stream.destroy();
        console.log('closed')
        // cb();
    })
    // stream.read();
    run(cmd)(function(err) {
        clearInterval(writing);
        done = true;
        // console.log(stream)
        // stream.push(''); // .close();
        // stream.destroy();

        console.log('done inside run_and_read')

        cb(err);
        console.log('after cb invoke')
    });
} }

// function read(data) {
//     console.log("node:" + data.toString());
// }

// mkfifos(function(err) {
//     console.log(err)
//     if (err) console.log('mkfifos failed')
// });

phantomjs();


setInterval(function() {
    writeLine("foo");
    readLine();
}, 1e3)


// async.waterfall([

//     // start_writing(),
//     run_and_read("phantomjs 8.js >> " + back),
    
//     // run("sleep 1 && echo \r\n >> " + back),
//     // run("echo \r\n >> " + back),
//     run("cat " + there),
//     run("cat " + back),
//     run("echo \r\n >> " + back),

//     run("rm " + there + " " + back),
// ], function(err) {
//     run("rm " + there)(function() {})
//     run("rm " + back)(function() {})
//     console.log('finsihed?')

    
//     console.log(err);
//     console.log('done?')
// });
