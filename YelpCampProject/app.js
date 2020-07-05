var express = require("express"),
    app = express(),
    bp = require("body-parser"),
    mongoose = require('mongoose'),
    Camp = require("./models/campgrounds"),
    Comment = require("./models/comments"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    ppLocalStrat = require("passport-local-mongoose"),
    User = require("./models/user"),
    methodoverride = require("method-override"),
    flash = require("connect-flash");

var commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/auth"),
    campRoutes = require("./routes/camp");

mongoose.connect("mongodb://localhost/YelpCampData", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(methodoverride("_method"));
app.use(bp.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.set("view engine", "ejs");

// Passport configuration
app.use(require("express-session")({
    secret: "Bang bang, its over",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
});

// seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

app.use("/campgrounds", campRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);

app.listen(3000, function(){
    console.log("YelpCamp server initiated...")
});