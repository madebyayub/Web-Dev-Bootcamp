var Camp = require("../models/campgrounds"),
    Comment = require("../models/comments");

var middleWare = {};

middleWare.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.")
    res.redirect("/login");
};
middleWare.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comID, function(err, comment){
            if (err){
                res.redirect("back");
            }else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have authority to do that.")
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("/login");
    }
};
middleWare.checkCampOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, camp){
            if (err){
                res.redirect("back");
            }else{
                if(camp.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have authority to do that.")
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that")
        res.redirect("/login");
    }
};
module.exports = middleWare;