var page = require('webpage').create();
page.open('http://github.com/', function(status) {
    if (status !== "success") {
        console.log("Couldn't open the page.");
        return phantom.exit(1);
    }
    phantom.exit();
});