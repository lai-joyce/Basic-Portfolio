var express = require("express");
var nodemailer = require("nodemailer");
var path = require("path");
var app = express();


app.use(express.static("public"));

app.listen(3000, function() {
	console.log("App listening on Port 3000");
});

