var system = require('system');

var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

// Passed in from parent process
var url = system.args[1];

page.open(url, function start(status) {

  // Set the background to white, just in case
  page.evaluate(function() {
    document.body.style.background = 'white';
  }); 

  // Wait an extra second for things to load
  window.setTimeout(function() { 

    // Return image of the page as base64-encoded string
    var base64 = page.renderBase64('JPEG');
    system.stdout.write(base64);
    phantom.exit();

  }, 1000);
});