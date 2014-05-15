var exec = require('child_process').exec;
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

function write(msg, cb) {
    if (done) return cb("already closed");
    run("ls " + there  + " && echo " + JSON.stringify(msg) + " > " + there)(function(err, stdout, stderr) {
        if (err) console.log('error writing', err);
        cb();
    });
}

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

function read(data) {
    console.log("node:" + data.toString());
}

// mkfifos(function(err) {
//     console.log(err)
//     if (err) console.log('mkfifos failed')
// });



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
