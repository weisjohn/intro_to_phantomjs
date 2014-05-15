var exec = require('child_process').exec;
var fs = require('fs');
var async = require('async');
var there = "nodephantom", back = "phantomnode";
var done = false;

function run(cmd) { return function(cb) {
    // console.log('running ', cmd)
    exec(cmd, function(err, stdout, stdin) { cb(err); });
} }


function run_and_read(cmd) { return function(cb) {
    async.parallel([ function(cb) {
        async.until(function() { return done; }, function(cb) {
            var timeout = false;
            if (!done) fs.readFile(back, function(err, data) {
                console.log("read", err, data.toString())
                read(data);
                if (!timeout) cb();
            });
            setTimeout(function() { timeout = true; cb(); }, 1e3);
        }, cb);
    }, function(cb) {
        run(cmd)(function(err) {
            console.log('done running phantom!!!!!')
            done = true;
            cb(err);
        });
    }], function() {
        console.log('parallel is done')
        cb();
    });
} }

function write(msg, cb) {
    if (done) return cb("already closed");
    run("echo " + JSON.stringify(msg) + " >> " + there)(function(err, stdout, stderr) {
        if (err) console.log('error writing', err);
        cb();
    });
}

function read(data) {
    console.log(data);
}

var writing = setInterval(function() {
    if (!done) write("hello from node", function() {})
}, 1e3);


async.waterfall([
    run("mkfifo " + there + " && mkfifo " + back),
    run_and_read("phantomjs 8.js >> " + back),
    run("echo \\r\\n >> " + back),
    run("rm " + there + " " + back)
], function(err) {
    console.log('rm worked?')
    clearInterval(writing);
    // console.log(process.reallyExit)
    return process.exit(err ? 1 : 0);
});
