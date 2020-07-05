var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    if (req.params.animal == "pig"){
        res.send("The pig says 'Oink'");
    }else if (req.params.animal == "cow"){
        res.send("The cow says 'Moo'");
    }else if (req.params.animal == "dog"){
        res.send("The dog says 'Woof Woof!'");
    }else{
        res.redirect("/error")
    }
});

app.get("/repeat/:phrase/:num", function(req, res){
    var response = ""
    for (var i = 0; i < req.params.num; i++){
        if (i == 0)
            response += req.params.phrase;
        if (i > 0)
            response += (" " + req.params.phrase);
    }
    res.send(response);
});

app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, function(){
    console.log("Server initiated...");
});