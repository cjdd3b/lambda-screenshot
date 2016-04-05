var childProcess = require('child_process');
var path = require('path');
var AWS = require('aws-sdk');

/********** CONFIGS **********/

var BUCKET_NAME = '';
var FILENAME_BASE = 'nyt';
var WEBPAGE = 'http://www.nytimes.com/';
var PHANTOM_BINARY = 'phantomjs_osx';

/********** HELPERS **********/

var filepath = function(base) {
  var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  var today = new Date();
  var path = today.getFullYear() + "/"
	         + months[today.getMonth()] + "/"
	         + ("0" + today.getDate()).slice(-2) + "/";
  var filename = base
	             + ("0" + today.getHours()).slice(-2)
	             + ("0" + today.getMinutes()).slice(-2)
	             + ".jpeg";
  return path + filename;
}

var save_to_s3 = function(payload, path, context) {
  var s3 = new AWS.S3();
  var param = {
    Bucket: BUCKET_NAME,
    Key: path,
    ContentType: 'image/jpeg',
    Body: payload};
  s3.upload(param, function(err, data) {
    if (err) {
      context.fail(err);
    } else {
      context.succeed('Done!');
    }
  });
};

/********** MAIN **********/

exports.handler = function(event, context) {
	// Set the path as described here: https://aws.amazon.com/blogs/compute/running-executables-in-aws-lambda/
	process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
	
	// Set the path to the phantomjs binary
	var phantomPath = path.join(__dirname, PHANTOM_BINARY);

	// Arguments for the phantom script
	var processArgs = [
		path.join(__dirname, 'phantom-script.js'),
		WEBPAGE
	];
	
	// Launch the child process
	childProcess.execFile(phantomPath, processArgs, {maxBuffer: 1024 * 5000}, function(error, stdout, stderr) {
		if (error) {
			context.fail(error);
			return;
		}
		if (stderr) {
			context.fail(error);
			return;
		}
	
        // Decode base64 string that comes back from the child process
		var buffer = new Buffer(stdout, 'base64')
		save_to_s3(buffer, filepath(FILENAME_BASE), context);
	});
}