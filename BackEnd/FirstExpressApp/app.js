var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there!");
});
app.get("/niko", function(req, res){
    res.send("Meow! Meow!");
});

// Route Parameters
app.get("/r/:subName", function(req, res){
    var subreddit = req.params.subName;
    res.send("Welcome to the " + subreddit + " subreddit");
});

app.get("/r/:subName/comments/:id/:title", function(req,res){
    res.send("This is a random comment");
});



// Catch all route
app.get("*", function(req,res){
    res.send("Not found");
});
app.listen(3000, function(){
    console.log("Server on...")
});