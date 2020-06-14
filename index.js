var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");

//SCHEMA SETUP
var campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var campGround = mongoose.model("campGround", campGroundSchema);

campGround.create({
    name: "pup",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Cutest Adorable Puppy"
}, function(error, campGround) {
    if (!error) {
        console.log("Newly Created CampGround ;)");
        console.log(campGround);
    }
});


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.render("landing.ejs");
})

app.get("/campground", function(req, res) {
    campGround.find({}, function(error, allcampGround) {
        if (!error) {
            console.log("GOAL ACHIEVED");
            res.render("index.ejs", { campground: allcampGround });
        };
    });
})

app.post("/campground", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampGround = { name: name, image: image, description: description };
    campGround.create(newCampGround, function(error, newlyCreated) {
        if (!error) {
            console.log("Working Fine Baby ;)");
            res.redirect("/campground");
        }
    })
});

app.get("/campground/new", function(req, res) {
    res.render("new.ejs");
});

app.get("/campground/:id", function(req, res) {
    campGround.findById(req.params.id, function(error, foundcampGround) {
        if (!error) {
            res.render("Show.ejs", { campground: foundcampGround });
        }
    })
});

app.listen(3000, process.env.IP, function() {
    console.log("Server has been started");
});