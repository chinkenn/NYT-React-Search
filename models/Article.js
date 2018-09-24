const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nytreact = new Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  url: { type: String, required: true}
});

const Article = mongoose.model("Article", nytreact);

module.exports = Article;
