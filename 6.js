var exec = require('child_process').exec;

exec('phantomjs 3.js', function(err, stdout, stderr) {
    if (err) console.log(err);
});