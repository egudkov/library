var express = require('express');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var app = express();
var latestQuestionId = 37;

/* Not working

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        to: 'gudkoveyu@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());

app.get('/subscribe', function(req, res) {
    console.log("subscribed");
});

app.post('/sendForm', function(req, res) {
    console.log("Your request: " + req.body.toString());
    res.setHeader('Content-Type', 'application/json');
    var date = new Date;
    res.send({
        id: ++latestQuestionId,
        date: date.toUTCString()
    });
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
