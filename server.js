var express = require('express'),
    bodyParser = require('body-parser'),
    aws = require('aws-sdk');

/**var bucketName = 'uploadtestbuckettoday';
AWS.config.update({
    accessKeyId: '',
    secretAccessKey: 'IVk,
    region: 'us-west-2'
}); */
var bucketName = 'uploadtestbuckettoday';
aws.config.update({
    // accessKeyId: 'AAAAAAAAAAA',
    // secretAccessKey: 'AAAAAAAAAAAAAAA',
    region: 'us-west-2'
});

var s3 = new aws.S3();

var app = express(),
    port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/api/uploadImage', function(req, res) {
    console.log(req.body.fileName);
    var buf = new Buffer(req.body.fileBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    
    var params = {
        Bucket: bucketName,
        Key: req.body.fileName,
        Body: buf,
        ContentType: 'image/' + req.body.fileName.substring(req.body.fileName.lastIndexOf('.')),
        ACL: 'public-read'
    };
    
    s3.upload(params, function(err, data) {
        if(err) {
            console.error(err);
            return res.json(err);
        } else {
            console.log('upload successful');
            return res.json(data);
        }
    });
});

app.listen(port, function() {
    console.log('listening on port: ', port);
});