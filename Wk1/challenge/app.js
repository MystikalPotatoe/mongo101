var express = require('express');
var consolidate = require('consolidate');
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

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
});
