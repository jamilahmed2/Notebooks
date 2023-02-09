const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
const dotenv = require('dotenv')

connectToMongo();
const app = express();
dotenv.config();

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

// Available Route
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/',(req,res)=>{
  res.send("Hello! Deployed");
});

app.listen(port, () => {
  console.log(`Notebooks backend listening at ${port}`)
})