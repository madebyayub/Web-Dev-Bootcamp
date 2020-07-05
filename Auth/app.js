var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bp = require("body-parser"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    ppLocalStrat = require("passport-local-mongoose"),
    User = require("./models/user");


mongoose.connect("mongodb://localhost/AuthDemo", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(require("express-session")({
    secret: "test test",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ROUTES

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// AUTH ROUTES

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){

});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("Server initiated..")
});