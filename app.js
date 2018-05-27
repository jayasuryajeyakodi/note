var express = require('express'),
    mongoose= require('mongoose'),
    bodyParser = require('body-parser');


var app = express();

app.get("/", function (req, res) {
        res.send("hello d")
})

app.listen("7777", function(err){
    console.log("Starting the server");
    if(err){
        console.log("error starting the server : " + err);
    }
})