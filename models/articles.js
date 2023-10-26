const mongoose = require('mongoose')
const { Schema } = mongoose;

const articlesSchema = new Schema({
     name: String,
     comment: Array
});

const articles = mongoose.model('articles', articlesSchema);
module.exports = articles;