var express = require("express");
var nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
// var port = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port");
});

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("public"));

// app.listen(3000, function() {
// 	console.log("App listening on Port 3000");
// });


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.emailAddress,
        pass: process.env.emailPassword,
    },
});


app.post("/email/send", function(req, res) {
	var email = req.body.email;
	var name = req.body.name;
	var message = req.body.message;

	const mailOptions = {
        from: email,
        replyTo: email,
        to: process.env.emailAddress,
        subject: 'contact message from ' + name + ' on your basic profile',
        html: "From: " + name + "(" + email + ")" + "<br/>" +
        	"Message: " + message
    };

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
        res.redirect("/confirm.html");
    });

	

});
