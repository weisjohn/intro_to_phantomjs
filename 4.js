var page = require('webpage').create();

page.paperSize = {
    format: 'A4',
    orientation: 'portrait',
    border: '1cm'
}

page.open('http://github.com/', function() {
    page.render('github.pdf');
    phantom.exit();
});