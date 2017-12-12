var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());

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

app.listen(3000, function () {
    console.log('Listening on port 3000...');
});

module.exports = app;
