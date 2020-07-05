// <----------------- Configuration -----------------------> // 
var express = require("express"),
    app = express(),
    bp = require("body-parser"),
    mongoose = require("mongoose");
    methodoverride = require("method-override");
mongoose.connect("mongodb://localhost/BlogDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
app.use(bp.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodoverride("_method"));

// SCHEMA SETUP
var blogSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: 'http://cloudrangers.com/blog/wp-content/uploads/2017/08/blog_default.png'},
    date: {type: Date, default: Date.now},
    content: String
});
var Blog = mongoose.model("Blog", blogSchema);

// <----------------- Routes -----------------------> // 

app.get("/", function(req, res){
    res.redirect("/blogs");
});

// INDEX - /blogs
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});

app.post("/blogs", function(req, res){
    if (req.body.blog.image == "")
        req.body.blog.image = undefined;
    Blog.create(req.body.blog, function(err, newBlog){
        if (err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});

// /blogs/new
app.get("/blogs/new", function(req, res){
    res.render("new");
});


// SHOW A BLOG - /blogs/:id
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log(err);
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

app.put("/blogs/:id", function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, foundBlog){
        if (err){
            console.log(err);
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndDelete(req.params.id, function(err, deleted){
        if (err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});

// /blogs/:id/edit
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log(err);
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

// <----------------- Listen Call -----------------------> // 
app.listen(3000, function(){
    console.log("Blog server initiated...")
});