var page = require('webpage').create();
page.open('http://github.com/', function(status) {
    if (status == "success") return phantom.exit();
    console.log("Couldn't open the page.");
    phantom.exit(1);
});