const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const request = require('request');

const PORT = process.env.PORT || 8080;

const app = express();
const router = express.Router();

require("./config/routes")(router);
require("./routes/scrape")(app);

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.get('/', function (req, res) {
    res.render('home');
});

app.use(bodyParser.urlencoded({extended:false}));

app.use(router);


// const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
//connect to database, if there is an error, throw error
mongoose.connect("mongodb://localhost/articleHomework", function(err){
    if(err) throw err;
    console.log("mongoose connection is successful")
})

app.listen(PORT, function(){
    console.log("listening on PORT: " + PORT);
})