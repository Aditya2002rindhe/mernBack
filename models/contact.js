const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
  username:String,
  text: String
});

const contactInfo = mongoose.model('coninfo', blogSchema);
module.exports = contactInfo;