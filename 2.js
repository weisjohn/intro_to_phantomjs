var page = require('webpage').create();

page.viewportSize = page.clipRect = { 
    width: 1024, height: 768
};

page.open('http://github.com/', function() {
    page.render('github.clip.png');
    phantom.exit();
});