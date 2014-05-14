var page = require('webpage').create();

page.open('http://github.com/explore', function() {

    page.clipRect = page.evaluate(function() {
        // runs in the "browser"
        var elem = document.querySelector('.featured-grid');
        return elem.getBoundingClientRect();
    });

    page.render('github.explore.' + Math.random() + ".png");
    phantom.exit();
});