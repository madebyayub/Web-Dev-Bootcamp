var express = require("express"),
    router = express.Router({mergeParams: true}),
    Camp = require("../models/campgrounds"),
    Comment = require("../models/comments"),
    middleWare = require("../middleware");

router.get("/new", middleWare.isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if (err){
            console.log(err);
        }else{
            res.render("comments/new", {camp: camp});
        }
    })
});
router.post("/", middleWare.isLoggedIn, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if (err){
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/campgrounds/" + camp.id);
                }
            });
        }
    });
});

router.get("/:comID/edit", middleWare.checkCommentOwnership, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if (err){
            console.log(err);
        }else{
            Comment.findById(req.params.comID, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    res.render("comments/edit", {camp: camp, comment: comment});
                }
            });
        }
    });
});

router.put("/:comID", middleWare.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comID, req.body.comment, function(err, foundCom){
        if (err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comID", middleWare.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comID, function(err, comment){
        if (err){
            res.redirect("back")
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;