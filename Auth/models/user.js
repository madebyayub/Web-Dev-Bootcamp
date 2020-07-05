var mongoose = require("mongoose");
var ppLocalStrat = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
UserSchema.plugin(ppLocalStrat)

module.exports = mongoose.model("User", UserSchema);