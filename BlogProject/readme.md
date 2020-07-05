RESTFUL ROUTES

Name                url                        verb                 Description
=======================================================================================
INDEX               /blogs                      GET             Display all blogs
NEW BLOG            /blogs/new                  GET             Display form to create new blog
CREATE A BLOG       /blogs                      POST            Add a blog to db
SHOW A BLOG         /blog/:id                   GET             Display a blog
EDIT A BLOG         /blogs/:id/edit             GET             Display form to edit the blog
UPDATE A BLOG       /blogs/:id                  PUT             Update the blog with the edit
DELETE A BLOG       /blogs/:id                  DELETE          Remove a blog from a database