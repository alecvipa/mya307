require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;
const tokenFb = process.env.tokenAccesoFB

// Create an instance of the express app.
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Redirect to https://xyncs.com
const targetBaseUrl = 'https://www.mya307.com/inicio';



// Routes
app.get('/', function (req, res) {
    res.redirect(targetBaseUrl);
    // res.render('inicio');

});
app.get('/inicio', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('inicio');

});
app.get('/longstays', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('longstays');

});
app.get('/privacidad', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('privacidad');

});
app.get('/thanku', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('thanku');

});



// Nodemailer route

app.post("/ajax/email", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    var htmlBody = `<h2>Correo de contacto</h2><p>Name: ${request.body.name} </p> <p>Phone: ${request.body.number} </p> <p> e-mail: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Arrive date: ${request.body.arriveDate} </p><p>Departure: ${request.body.departDate} </p> <p>Number of extra people: ${request.body.people} </p>`;
    var secondHtmlBody = `<h2>Here are the details of your booking!</h2><p>Reservation by the name: ${request.body.name} </p> <p>Your phone number: ${request.body.number} </p> <p> Your e-mail: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Desired arrival date: ${request.body.arriveDate} </p><p>Desired Departure date: ${request.body.departDate} </p> <p>People coming with you: ${request.body.people} </p><hr> <h5>Our team will contact you shortly to set the last details of your stay. </h5> <h5>Payment methods:</h5><h5>Debit / credit & bank
    transfer.</h5><h5>We usually ask for a percentage prior your arrival and you can pay the rest of your stay
    upon your arrival.</h5><h5>We accept cash at the front desk or you may pay in the above mentioned payment
    methods.</h5>`
    let customerMail = `${request.body.email}`
    var mail = {
        from: 'Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien ha dejado sus datos en Mya 307!',
        html: htmlBody
    };
    var secondMail = {
        from: 'Team: Xyncs Web Studio',
        to: customerMail,
        subject: '¡Thanks for booking your stay in Mya 307!',
        html: secondHtmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    })
    transporter.sendMail(secondMail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    })

});
app.post("/ajax/emailSecond", function (request, response) {
    console.log(email);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: email,
            pass: superSecretPwd
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    var htmlBody = `<h2>Correo de contacto</h2><p>Name: ${request.body.name} </p> <p>Phone: ${request.body.number} </p> <p> e-mail: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Arrive date: ${request.body.arriveDate} </p><p>Departure: ${request.body.departDate} </p> <p>Number of extra people: ${request.body.people} </p>`;
    var secondHtmlBody = `<h2>Here are the details of your booking!</h2><p>Reservation by the name: ${request.body.name} </p> <p>Your phone number: ${request.body.number} </p> <p> Your e-mail: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Desired arrival date: ${request.body.arriveDate} </p><p>Desired Departure date: ${request.body.departDate} </p> <p>People coming with you: ${request.body.people} </p><hr> <h5>Our team will contact you shortly to set the last details of your stay. </h5> <h5>Payment methods:</h5><h5>Debit / credit & bank
    transfer.</h5><h5>We usually ask for a percentage prior your arrival and you can pay the rest of your stay
    upon your arrival.</h5><h5>We accept cash at the front desk or you may pay in the above mentioned payment
    methods.</h5>`
    let customerMail = `${request.body.email}`
    var mail = {
        from: 'Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien ha dejado sus datos en LONG STAY Mya 307!',
        html: htmlBody
    };
    var secondMail = {
        from: 'Team: Xyncs Web Studio',
        to: customerMail,
        subject: '¡Thanks for booking your long stay in Mya 307!',
        html: secondHtmlBody
    };
    transporter.sendMail(mail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    })
    transporter.sendMail(secondMail, function (err, info) {
        if (err) {
            return console.log(err);
        } else {
            console.log("message sent!");
        };
    })

});


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});