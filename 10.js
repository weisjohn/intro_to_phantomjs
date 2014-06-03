var sleepyhollow = require('./node_modules/sleepyhollow-phantom/index.js');
var mrhyde = sleepyhollow();

mrhyde.on('render', function(url) {
    var page = require('webpage').create();
    page.open(url, function(status) {
        page.render(url + ".png");
        mrhyde.emit("rendered");
        page.close();
    });
});

mrhyde.on('end', function() {
    phantom.exit();
});