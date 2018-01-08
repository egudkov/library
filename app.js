var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());

app.post('/getResource', function(req, res) {
    console.log("Your request: " + req.body.toString());
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({name: 'Evgeny', lastname: 'Gudkov'}));
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascripts/main.js', function(req, res) {
    res.sendFile(__dirname + '/public/javascripts/main.js');
});

app.get('/stylesheets/style.css', function(req, res) {
    res.sendFile(__dirname + '/public/stylesheets/style.css');
});

app.get('/blocks/booksRequestForm.html', function(req, res) {
    res.sendFile(__dirname + '/public/blocks/booksRequestForm.html');
});

app.get('/blocks/home.html', function(req, res) {
    res.sendFile(__dirname + '/public/blocks/home.html');
});

app.get('/blocks/news.html', function(req, res) {
    res.sendFile(__dirname + '/public/blocks/news.html');
});

app.get('/blocks/catalog.html', function(req, res) {
    res.sendFile(__dirname + '/public/blocks/catalog.html');
});

app.get('/blocks/contacts.html', function(req, res) {
    res.sendFile(__dirname + '/public/blocks/contacts.html');
});

app.get('/blocks/about.html', function(req, res) {
    res.sendFile(__dirname + '/public/blocks/about.html');
});

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/news', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/catalog', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/contacts', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
    console.log('Listening on port 3000...');
});

module.exports = app;
