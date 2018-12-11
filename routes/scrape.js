const axios = require("axios");
const cheerio = require("cheerio");
let db = require("../models/index");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("http://www.espn.com/nba/").then(function (response) {
            let $ = cheerio.load(response.data);

            $("article .behavior-loaded").each(function () {
                //save an empty result object
                let result = {};

                result.Article = $(this).children("h1 .contentItem__title contentItem__title--video").text();
                result.summary = $(this).children("p .contentItem__subhead contentItem__subhead--video").text();
                result.image = $(this).children("picture source").attr("srcset");
                result.URL = $(this).children("div .contentItem__header__link").attr("href");

                // Create a new Article using the `result` object built from scraping
                db.Article.create(result)
                .then(function(dbArticle) {
                  // View the added result in the console
                  console.log(dbArticle);
                })
                .catch(function(err) {
                  // If an error occurred, send it to the client
                  return res.json(err);
                });
            });
            // If we were able to successfully scrape and save an Article, send a message to the client
            res.send("scrape complete!")
        })
    })
}