var express = require("express");
var nodemailer = require("nodemailer");
var path = require("path");
var app = express();


app.use(express.static("public"));

app.listen(3000, function() {
	console.log("App listening on Port 3000");
});


const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'windracer14@gmail.com',
        pass: '',
    },
});


app.post("/email/send", function(req, res) {
	var email = req.body.email;
	var name = req.body.name;
	var message = req.body.message;

	const mailOptions = {
        from: email,
        to: 'windracer14@gmail.com',
        subject: 'pooh bear',
        html: message,
    };

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    }).then(function() {
    	res.redirect("/index.html");
    });

	

});
