//dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
let exphbs = require("express-handlebars");
let bodyParser = require("body-parser");



var PORT = process.env.PORT || 3000;

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

// connect to database
mongoose.Promise = Promise;
var dbConnect = process.env.MONGODB_URI || "mongodb://localhost/nbascrape";
if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect(dbConnect);
}

app.listen(PORT, function(){
    console.log("Listening on PORT " + PORT);
})