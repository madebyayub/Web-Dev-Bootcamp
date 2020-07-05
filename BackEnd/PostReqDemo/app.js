var express = require("express");
var bodyParser = require("body-parser");
// INIT
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin"];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    friends.push(req.body.name);
    res.redirect("/friends");

});

app.listen(3000, function(){
    console.log("Server initiated...");
});