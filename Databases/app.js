var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Demo", {useNewUrlParser: true, useUnifiedTopology: true,});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    attitude: String
});
var Cat = mongoose.model("Cat", catSchema);

// adding new cat to the DB

// METHOD 1
/*
var niko = new Cat({
    name: "Mister Norris",
    age: 5,
    attitude: "loner"
});
niko.save(function(err, cat){
    if (err){
        console.log("ERROR ERROR FATAL")
    }else{
        console.log("Mr Norris was saved");
    }
});*/

// METHOD 2
/*
Cat.create({
    name: "Snow White",
    age: 10,
    attitude: "lovable"
}, function(err, cat){
    if (err){
        console.log("ERROR ERROR");
    }else{  
        console.log("Snow White was saved");

    }
});*/

// Retrieve a searched cat from DB

Cat.find({name: "Niko"}, function(err, cats){
    if (err){
        console.log("ERROR ERROR FATAL");
    }else{
        console.log(cats);
    }
});

// Delete cats from DB

Cat.remove({name: "Snow White"}, function(err, cats){
    if (err){
        console.log("Error");
    }else{
        console.log("Removed Snow White")
    }
});
Cat.find({}, function(err, cats){
    console.log(cats)
});