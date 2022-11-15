require('dotenv').config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const email = process.env.email;
const superSecretPwd = process.env.superSecretPwd;
const tokenFb = process.env.tokenAccesoFB
const stripeLiveKey = process.env.secretKeyStripe
const stripe = require('stripe')(stripeLiveKey);

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
app.get('/gracias', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('gracias');

});
app.get('/home', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('home');

});
app.get('/privacy', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('privacy');

});
app.get('/estancias', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('estancias');

});
app.get('/fechas', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('fechas');

});
app.get('/dates', function (req, res) {
    // res.redirect(targetBaseUrl);
    res.render('dates');

});

//STRIPE
app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1M4Bu4GyOvmlXVnJagoeqCWe',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${"https://www.mya307.com"}/fechas`,
        cancel_url: `${"https://www.mya307.com"}/inicio`,
    });

    res.redirect(303, session.url);
});
app.post('/create-checkout-session-en', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1M4SeyGyOvmlXVnJEuhHU1TX',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${"https://www.mya307.com"}/dates`,
        cancel_url: `${"https://www.mya307.com"}/home`,
    });

    res.redirect(303, session.url);
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
app.post("/ajax/email/es", function (request, response) {
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
    var secondHtmlBody = `<h2>¡Los detalles de tu reserva!</h2><p>A nombre de: ${request.body.name} </p> <p>Teléfono: ${request.body.number} </p> <p> Tu correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Día de llegada: ${request.body.arriveDate} </p><p>Día de salida: ${request.body.departDate} </p> <p>Personas que vienen contigo: ${request.body.people} </p><hr> <h5>Nuestro equipo se pondrá en contacto contigo en breve. Ajustaremos los últimos detalles de tu estancia.</h5> <h5>Métodos de pago:</h5><h5>Débito / crédito & transferencia bancaria.</h5><h5>Usualmente pedimos un porcentaje de la reserva antes de tu llegada y puedes pagar el resto de tu estancia cuando llegues.</h5><h5>Aceptamos efectivo en el mostrador o puedes pagar en los métodos de pago mencionados antes.</h5>`
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
        subject: '¡Gracias por tu reserva en Mya 307!',
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
app.post("/ajax/emailSecond/es", function (request, response) {
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
    var secondHtmlBody = `<h2>¡Los detalles de tu reserva!</h2><p>A nombre de: ${request.body.name} </p> <p>Teléfono: ${request.body.number} </p> <p> Tu correo electrónico: <a href='mailto: ${request.body.email}'>${request.body.email}</a></p><p>Día de llegada: ${request.body.arriveDate} </p><p>Día de salida: ${request.body.departDate} </p> <p>Personas que vienen contigo: ${request.body.people} </p><hr> <h5>Nuestro equipo se pondrá en contacto contigo en breve. Ajustaremos los últimos detalles de tu estancia.</h5> <h5>Métodos de pago:</h5><h5>Débito / crédito & transferencia bancaria.</h5><h5>Usualmente pedimos un porcentaje de la reserva antes de tu llegada y puedes pagar el resto de tu estancia cuando llegues.</h5><h5>Aceptamos efectivo en el mostrador o puedes pagar en los métodos de pago mencionados antes.</h5>`
    let customerMail = `${request.body.email}`
    var mail = {
        from: 'Team: Xyncs Web Studio',
        to: 'hebrit_626@hotmail.com',
        subject: '¡Alguien ha dejado sus datos en Estancia Larga Mya 307!',
        html: htmlBody
    };
    var secondMail = {
        from: 'Team: Xyncs Web Studio',
        to: customerMail,
        subject: '¡Gracias por tu reserva de estancia larga en Mya 307!',
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