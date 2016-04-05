lambda-screenshot
-----------------

A simple working example of an AWS Lambda screenshotting service using Node and PhantomJS. Owes a debt to [lambda-node-phantom](https://github.com/TylerPachal/lambda-node-phantom) by Tyler Pachal.

Running locally
===============

You can run this locally using [https://www.npmjs.com/package/lambda-local](lambda-local).

```
npm install -g lambda-local
```

You'll also have to export your AWS credentials if you want to save to S3:

```
export AWS_ACCESS_KEY_ID=whatever
export AWS_SECRET_ACCESS_KEY=whatever
```

And you'll want to manually set the phantom binary in `index.js` to the OSX version if you're using OSX (sorry):

```
var PHANTOM_BINARY = 'phantomjs_osx';
```

Finally, once all that is done:

```
lambda-local -l index.js -h handler -e ./local-input.json -t 30
```

Running on AWS Lambda
=====================

Few things:

1. Upload the attached lambda_package.zip to a new Lambda function.

2. Set the function's role to lambda_s3_exec_role so it can interface with S3.

3. Choose the "CloudWatch Events - Schedule" event source if you want to run it on something resembling a cron.

If you update the code, be sure to package the following files are included in the archive: `index.js`, `phantom-script.js`, `phantomjs_linux-x86_64`. And be sure the `PHANTOM_BINARY` variable is set to `phantomjs_linux-x86_64`.

Questions?
==========

Contact Chase: chase.davis@gmail.com