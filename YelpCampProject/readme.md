RESTFUL ROUTES

Name                url                        verb                 Description
=======================================================================================
INDEX               /campgrounds                        GET             Display all camprgounds
NEW CAMP            /campgrounds/new                    GET             Display form to create
CREATE A CAMP       /campgrounds                        POST            Add a campground to db
SHOW A CAMP         /campgrounds/:id                    GET             Display a campground
NEW COMMENT         /campgrounds/:id/comments/new       GET             Display form for a new comment
CREATE A COMMENT    /campgrounds/:id/comments           POST            Add a comment to a db