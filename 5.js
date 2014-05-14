var page = require('webpage').create();

function format(num) { return num > 9 ? num : "0" + num; }

var count = 0, duration = 750, frames = 16;
var delay = duration / frames;

function render() {
    if (count >= frames) return phantom.exit();
    page.render('animation' + format(count) + '.png');
    count++;
    setTimeout(render, delay);
}

page.viewportSize = page.clipRect = { width: 124, height: 124 };
page.open('http://i.johnweis.com/_spin.html', render);
