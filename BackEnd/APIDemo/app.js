var express = require("express");
var app = express();
app.set("view engine", "ejs");
var request = require("request");

app.get("/results", function(req, res){
    var url = "http://omdbapi.com/?s=" + req.query.query + "&apikey=thewdb"
    request(url, function(error, response, body){
        if (!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

app.get("/", function(req, res){
    res.render("search");
});

app.listen(3000, function(){
    console.log("Server initiated...");
});