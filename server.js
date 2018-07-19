const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const email = require('emailjs/email');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
let sheets = google.sheets('v4');


app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/valetblu-landing'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist', './valetblu-landing/index.html'))
});


app.post('/sendmail', (req, res) => {
    // var server = email.server.connect({ user: "", password: "", host: "smtp.gmail.com", port: 465, ssl: true });
    // console.log('email server connected');
    // console.log(req.body);
    // // send the message and get a callback with an error or details of the message that was sent

    // let emailTemplate = 
    // `<html>
    //     <head>
    //         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    //         <style>
    //            .words{
    //             font-family: "Helvetica Neue";
    //             font-weight: 300;
    //             font-size: 20px;
    //            }
    //            .logo{
    //             width: 40%;
    //            }
    //         </style>
    //     </head>
    //     <body>
    //         <br>
    //         <br>
    //         <img src='cid:my-image' class='logo'>
    //         <br>
    //         <br>
    //         <p class='words'>
    //         Hi ${req.body.firstName},
    //         <br>
    //         <br>
    //         Thank you for your interest in Valetblū. We are currently reviewing your application and will get back to you shortly.
    //         <br>
    //         <br>
    //         <br>
    //         Sincerely,
    //         <br>
    //         Team @ Valetblū
    //         </p>
    // `


    // server.send({
    //     text: "",
    //     from: "info@valetblu.com",
    //     to: req.body.email,
    //     subject: 'Thank you for your interest!',
    //     attachment:
    //         [
    //             { data: `${emailTemplate}</body></html>`, alternative: true },
    //             { path: "src/assets/img/ValetBlu_Logo_Vertical_Full_Color.png", type: "image/png", headers:{"Content-ID":"<my-image>"} }
    //         ]
    // }, function (err, message) {
    //     if (err)
    //         console.log(err);
    //     else
    //         res.json({ success: true, msg: 'sent' });
    // }
    // );

    // server.send({
    //     text: req.body,
    //     from: "info@valetblu.com",
    //     to: 'ac12491@gmail.com',
    //     subject: 'New Client!'
    // }, function (err, message) {
    //     if (err)
    //         console.log(err);
    //     else
    //         res.json({ success: true, msg: 'sent' });
    // }
    // );

    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const TOKEN_PATH = 'token.json';

      fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content));
      });

    authorize(function(authClient) {
        console.log('inside authorize!!!');
        
        var request = {
          // The ID of the spreadsheet to update.
          spreadsheetId: '1yLSOZ7r6SIrDWZhLkh9ezb-fImlMGtxXfm_4sJLAj_E',  // TODO: Update placeholder value.
      
          // The A1 notation of the values to update.
          range: 'Sheet1',  // TODO: Update placeholder value.
      
          // How the input data should be interpreted.
          valueInputOption: 'dommo',  // TODO: Update placeholder value.
      
          resource: {
            // TODO: Add desired properties to the request body. All existing properties
            // will be replaced.
          },
      
          auth: authClient, 
        };
      
        sheets.spreadsheets.values.update(request, function(err, response) {
          if (err) {
            console.error(err);
            return;
          }
          // TODO: Change code below to process the `response` object:
          console.log(JSON.stringify(response, null, 2));
        });
      });    
       
    //   function authorize(callback) {
    //     // TODO: Change placeholder below to generate authentication credentials. See
    //     // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //     //
    //     // Authorize using one of the following scopes:
    //     //   'https://www.googleapis.com/auth/drive'
    //     //   'https://www.googleapis.com/auth/drive.file'
    //     //   'https://www.googleapis.com/auth/spreadsheets'
    //     const authClient = new google.auth.OAuth2(
    //         "765887862291-mcq585jak50ahi7ve539tm2gs9ps1nu7.apps.googleusercontent.com",
    //         "YQnJYGlBtHdtOlkAfkXlWKE5",
    //         "https://valetblu.com"
    //       )
    //     // var authClient = null;
      
    //     if (authClient == null) {
    //       console.log('authentication failed');
    //       return;
    //     }
    //     callback(authClient); 
    //   }
  
      function authorize(credentials, callback) {
          console.log('credentials ---',credentials);
          console.log('callback ---',callback);
          
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);
      
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getNewToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          callback(oAuth2Client);
        });
      }

      function getNewToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
          });
        });
      }
});

app.listen(8000, () => {
    console.log("Successfully listening on : 8000")
})
