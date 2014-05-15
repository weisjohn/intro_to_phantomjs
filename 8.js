var stderr = require('system').stderr;
function out(data) { stderr.write(JSON.stringify(data)); }

var page = require('webpage').create();

page.open("http://github.com", function(status) {
    if (status == "success") {
        out({ action: "opened" });
        page.render('github.jpg');
        out({ action: "rendered" });
    }
    phantom.exit();
});
