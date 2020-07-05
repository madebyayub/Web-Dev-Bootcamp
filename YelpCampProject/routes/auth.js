var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register");
});
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully created account and logged in.")
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", isLoggedInDenyLogin, function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: "Successfully logged in."
}));
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out.")
    res.redirect("back");
});

function isLoggedInDenyLogin(req, res, next){
    if(!(req.isAuthenticated())){
        return next();
    }
    res.redirect("/campgrounds");
}

module.exports = router;