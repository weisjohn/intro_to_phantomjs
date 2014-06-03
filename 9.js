var sleepyhollow = require('sleepyhollow-node');
var drjekyll = sleepyhollow('10.js');

drjekyll.emit('render', "http://github.com/");
drjekyll.on('rendered', function() {
    console.log('a page was rendered');
});

drjekyll.emit('end');