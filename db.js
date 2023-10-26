const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://2020bcs036:Krishna%40108@mernblog.awzckad.mongodb.net/"

connectTOMongo= ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully");
    });
}

module.exports = connectTOMongo;