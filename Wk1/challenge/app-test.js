var express = require('express');
var consolidate = require('consolidate');
var bodyparser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongourl = process.env.MONGO_URI;

var app = express();

app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect(mongourl, function(err, db) {

    assert.equal(null, err);
    console.log('Successfully connected to Mongo.');

});

app.listen(8080, () => {
    console.log('listening on port 8080');
})