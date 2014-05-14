var page = require('webpage').create();
page.viewportSize = page.clipRect = { width: 1024, height: 768 };
page.clipRect.left = page.clipRect.top = 0;
page.open('http://github.com/', function() {
    page.render('github.clip.png');
    phantom.exit();
});