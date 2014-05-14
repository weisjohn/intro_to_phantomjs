var page = require('webpage').create();

page.open('http://github.com/explore', function() {
    
    // super idomatic
    page.clipRect = page.evaluate(function() {
        var selector = '.featured-grid'
        var elem = document.querySelector(selector);
        return elem.getBoundingClientRect();
    });

    page.render('github.explore.' + Math.random() + ".png");
    phantom.exit();
});