var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();
var latestQuestionId = 37;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());


app.post('/sendForm', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var date = new Date;
    res.send({
        id: ++latestQuestionId,
        date: date.toUTCString()
    });
});


app.post('/subscribe', function(req, res) {
    var toEmail = req.body.emailAddress;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'gudkoveyu@gmail.com',
            pass: 'secret'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: '"Fred Foo" <gudkoveyu@gmail.com>',
        to: toEmail,
        subject: 'Hello',
        text: 'Hello world'
    };

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     }
    //     console.log(info);
    // });

    res.send({});
});


app.get('/javascripts/main.js', function(req, res) {
    res.sendFile(__dirname + '/public/javascripts/main.js');
});


var cssFiles = ['main.css', 'preloader.css', 'modal.css'];

cssFiles.forEach(function (cssFile) {
    app.get('/stylesheets/' + cssFile, function(req, res) {
        res.sendFile(__dirname + '/public/stylesheets/' + cssFile);
    });
});


var navPages = [
    {url: '/', fname: 'home.html'},
    {url: '/home', fname: 'home.html'},
    {url: '/news', fname: 'news.html'},
    {url: '/catalog', fname: 'catalog.html'},
    {url: '/contacts', fname: 'contacts.html'},
    {url: '/requestForm', fname: 'requestForm.html'}
];

navPages.forEach(function(page) {
    app.get(page.url, function(req, res) {
        var isAjaxRequest = req.xhr;
        if (isAjaxRequest) {
            res.sendFile(__dirname + '/public/blocks/' + page.fname);
        } else {
            res.sendFile(__dirname + '/public/index.html');
        }
    });
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
