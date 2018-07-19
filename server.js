const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const email = require('emailjs/email');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/valetblu-landing'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist', './valetblu-landing/index.html'))
});

app.post('/sendmail', (req, res) => {
    var server = email.server.connect({ user: "", password: "", host: "smtp.gmail.com", port: 465, ssl: true });
    console.log('email server connected');
    console.log(req.body);
    let emailTemplate =
        `<html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <style>
               .words{
                font-family: "Helvetica Neue";
                font-weight: 300;
                font-size: 20px;
               }
               .logo{
                width: 40%;
               }
            </style>
        </head>
        <body>
            <br>
            <br>
            <img src='cid:my-image' class='logo'>
            <br>
            <br>
            <p class='words'>
            Hi ${req.body.firstName},
            <br>
            <br>
            Thank you for your interest in Valetblū. We are currently reviewing your application and will get back to you shortly.
            <br>
            <br>
            <br>
            Sincerely,
            <br>
            Team @ Valetblū
            </p>
    `


    server.send({
        text: "",
        from: "info@valetblu.com",
        to: req.body.email,
        subject: 'Thank you for your interest!',
        attachment:
            [
                { data: `${emailTemplate}</body></html>`, alternative: true },
                { path: "src/assets/img/ValetBlu_Logo_Vertical_Full_Color.png", type: "image/png", headers: { "Content-ID": "<my-image>" } }
            ]
    }, function (err, message) {
        if (err)
            console.log(err);
        else
            res.json({ success: true, msg: 'sent' });
    });
    server.send({
        text: req.body,
        from: "info@valetblu.com",
        to: 'ac12491@gmail.com',
        subject: 'New Client!'
    }, function (err, message) {
        if (err)
            console.log(err);
        else
            res.json({ success: true, msg: 'sent' });
    }
    );
});

app.listen(8000, () => {
    console.log("Successfully listening on : 8000")
})
