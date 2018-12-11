const mongoose = require("mongoose");

let Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    Article: {
        type: String,
        require: true,
        unique: true
    },
    summary: {
        type: String,
        require: true
    },
    URL: {
        type: String,
        unique: true
    },
    image: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    }
});
let Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;