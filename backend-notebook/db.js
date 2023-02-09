const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()
mongoose.set('strictQuery', true);


const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URL, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;