var page = require('webpage').create();

page.viewportSize = page.clipRect = { 
    width: 1024, height: 768
};

var name = 'github.explore.';
name += ~~(Math.random() * 1e3) + '.png';

page.open('http://github.com/explore', function() {
    
    // super idomatic
    page.clipRect = page.evaluate(function() {
        var selector = '.featured-grid'
        var elem = document.querySelector(selector);
        return elem.getBoundingClientRect();
    });

    page.render(name);
    phantom.exit();
});