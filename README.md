lambda-screenshot
=================

A simple working example of an AWS Lambda screenshotting service using Node and PhantomJS. Owes a debt to [lambda-node-phantom](https://github.com/TylerPachal/lambda-node-phantom) by Tyler Pachal.

Running locally
---------------

You can run this locally using [lambda-local](https://www.npmjs.com/package/lambda-local).

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
---------------------

Few things:

1. Zip up `index.js`, `phantom-script.js` and `phantomjs_linux-x86_64` and upload them as a zipfile to Lambda. Be sure the `PHANTOM_BINARY` variable in `index.js` is set to `phantomjs_linux-x86_64`.

2. Set the function's role to lambda_s3_exec_role so it can interface with S3.

3. Choose the "CloudWatch Events - Schedule" event source if you want to run it on something resembling a cron.

Questions?
----------

Contact Chase: chase.davis@gmail.com