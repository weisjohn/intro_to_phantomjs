var spawn = require('child_process').spawn;
var phantomjs = spawn('phantomjs', ['8.js']);

phantomjs.stderr.on('data', function(data) {
    data = data.toString();
    try { console.log(JSON.parse(data)); } 
    catch (e) { throw new Error(data); }
});

phantomjs.on('exit', function() { console.log('done'); });
