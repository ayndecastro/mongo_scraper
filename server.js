//dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
let exphbs = require("express-handlebars");
let bodyParser = require("body-parser");



var PORT = 3000;

// Initialize Express
var app = express();
let router = express.Router();

// Configure middleware
require("./routes/routes")(app);
require("./config/viewRoutes")(router);

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(__dirname + "/public"));

//connect handlebars to express app
app.engine("handlebars", exphbs({
    defaultLayout : "main"
}));
app.set("view engine", "handlebars");

//body parser
app.use(bodyParser.urlencoded({extended:false}))

// have every request go through router middleware
app.use(router);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/hwork", { useNewUrlParser: true });



app.listen(PORT, function(){
    console.log("Listening on PORT " + PORT);
})