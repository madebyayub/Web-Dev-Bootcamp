var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/love/:thing", function(req, res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Ayub"},
        {title: "Post 2", author: "Areej"},
        {title: "Post 3", author: "Anfaal"},
        {title: "Post 4", author: "Anfaal"}
    ];
    res.render("posts.ejs", {posts: posts});
});
app.listen(3000, function(){
    console.log("Server initiated...");
});