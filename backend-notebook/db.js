
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const mongoURI = "mongodb://127.0.0.1:27017/notebooks"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;