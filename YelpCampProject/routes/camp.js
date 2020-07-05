var express = require("express"),
    router = express.Router(),
    Camp = require("../models/campgrounds"),
    middleWare = require("../middleware");

router.get("/", function(req, res){
    Camp.find({}, function(err, camps){
        if (err){
            console.log(err);
        }else{
            res.render("camps/index", {camps:camps, currentUser: req.user});
        }
    });
});

router.post("/", middleWare.isLoggedIn, function(req, res){
    Camp.create({
        name: req.body.camp.name,
        image: req.body.camp.image,
        description: req.body.camp.description
    }, function(err, campground){
        if (err){
            console.log(err);
        }else{
            campground.author.id = req.user.id;
            campground.author.username = req.user.username;
            campground.save();
        }
    });
    req.flash("success", "Added new campground.")
    res.redirect("/campgrounds");
});

router.get("/new", middleWare.isLoggedIn, function(req, res){
    res.render("camps/new");
});

router.put("/:id", middleWare.checkCampOwnership, function(req,res){
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, foundCamp){
        if (err){
            console.log(err);
        }else{
            req.flash("success", "Edited campground.")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.get("/:id", function(req, res){
    Camp.findById(req.params.id).populate("comments").exec(function(err, camp){
        if (err){
            console.log(err);
        }else{
            res.render("camps/show", {camp: camp});
        }
    });
});

router.get("/:id/edit", middleWare.checkCampOwnership, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if (err){
            res.redirect("back");
        }else{
            res.render("camps/edit", {campground: camp});
        }
    });
});

router.delete("/:id", middleWare.checkCampOwnership, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if (err){
            res.redirect("back");
        }else{
            Camp.findByIdAndRemove(req.params.id, function(err, camp){
                req.flash("success", "Removed campground.")
                res.redirect("/campgrounds");
            });
        }
    });
});

module.exports = router;