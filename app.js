var express = require('express'),
    mongoose= require('mongoose'),
    bodyParser = require('body-parser');

var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
        res.render("index");
})

app.listen("7777", function(err){
    console.log("Starting the server");
    if(err){
        console.log("error starting the server : " + err);
    }
})