var express = require('express'),
    mongoose= require('mongoose'),
    bodyParser = require('body-parser'),
    Note = require('./Models/Note'),
    methodOverride = require('method-override');

var app = express();

app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://jayasurya.documents.azure.com:10255/blog?ssl=true",{
    auth:{
        user:"jayasurya",
        password:"AQ9JHPwV8Hp6UJanhsX3rTns8J6J7DVPIBO31nopSb6W42VhO8JHBLlWYnG5kXU00dEb6COXkBLSjMzYYucy1g=="
    }
}, function(err, db){
    if(err){
        console.log("cannot connect to mongo db"+err)
    }
});

app.get("/", function (req, res) {
        Note.find({}, function(err, data){
            if(err){
                console.log("error fetching data :" + err);
            }else if(data != null && data != undefined){
                res.render("index", {Notes: data});
            }
        })
        
});

app.get("/note/new", function(req, res){
    res.render("NewNote");
})

app.post("/note", function(req, res){
    var note = req.body.Note;
    Note.create(note);
    res.redirect("/");
})

app.get("/note/:id", function(req, res){
    Note.findById(req.params.id, function(err, data){
        if(err){
            console.log("Error fetching the doc" + err);
        }
        else if(!(data == null || data == undefined)){
            res.render("ShowSelectedNote", {Note: data});
        }
    })
})

app.put("/note/:id", function(req, res){
    console.log(req.body.Note);
    Note.findByIdAndUpdate(req.params.id, req.body.Note, function(err, data){
        if(err){
            console.log("error updating the Note:"+err);
        }
        res.redirect("/");
    })
})

app.delete("/note/:id", function(req, res){
    Note.findByIdAndRemove(req.params.id, function(err, data){
        if(err){
            console.log("error deleting" + err);
        }
        res.redirect("/");
    })
})

function SeedDb(){
    var data = {};
    data.Title = "Sample Title";
    data.Content = "Sample content";

    return data;
}

app.listen("7777", function(err){
    console.log("Starting the server");
    if(err){
        console.log("error starting the server : " + err);
    }
})