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

app.get('/javascripts/main.js', function(req, res) {
    res.sendFile(__dirname + '/public/javascripts/main.js');
});

app.get('/stylesheets/style.css', function(req, res) {
    res.sendFile(__dirname + '/public/stylesheets/style.css');
});

app.get('/stylesheets/preloader.css', function(req, res) {
    res.sendFile(__dirname + '/public/stylesheets/preloader.css');
});

app.get('/stylesheets/modal.css', function(req, res) {
    res.sendFile(__dirname + '/public/stylesheets/modal.css');
});

app.get('/', function(req, res) {
    var isAjaxRequest = req.xhr;
    if (isAjaxRequest) {
        res.sendFile(__dirname + '/public/blocks/home.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.get('/home', function(req, res) {
    var isAjaxRequest = req.xhr;
    if (isAjaxRequest) {
        res.sendFile(__dirname + '/public/blocks/home.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.get('/news', function(req, res) {
    var isAjaxRequest = req.xhr;
    if (isAjaxRequest) {
        res.sendFile(__dirname + '/public/blocks/news.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.get('/catalog', function(req, res) {
    var isAjaxRequest = req.xhr;
    if (isAjaxRequest) {
        res.sendFile(__dirname + '/public/blocks/catalog.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.get('/contacts', function(req, res) {
    var isAjaxRequest = req.xhr;
    if (isAjaxRequest) {
        res.sendFile(__dirname + '/public/blocks/contacts.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.get('/requestForm', function(req, res) {
    var isAjaxRequest = req.xhr;
    if (isAjaxRequest) {
        res.sendFile(__dirname + '/public/blocks/requestForm.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
