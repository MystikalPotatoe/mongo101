var express = require('express');
var consolidate = require('consolidate');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongourl = process.env.MONGO_URI;

var app = express();

app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended : false}));

MongoClient.connect(mongourl, function(err, db) {

    assert.equal(null, err);
    console.log('Successfully connected to Mongo.');

    app.get('/movies', function(req, res) {

        db.collection('movies').find({}).toArray(function(err, docs) {
            res.render('movies', {'movies' : docs});
        });
    });

    app.post('/newmovie', function(req, res) {
        db.collection('movies').insertOne({}, function() {
            db.collection('movies').find({}).toArray(function(err, docs) {
                res.render('movies', {'movies' : docs});
            });
        });
    });
    
    var server = app.listen(8080, () => {
        var port = server.address().port;
        console.log('Express server listening on %s', port);
    });
});