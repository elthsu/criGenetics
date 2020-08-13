// *************** Load Mongoose Models ***************
require('./models/Tracker');

// *************** PACKAGES ***************
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clickRoutes = require('./routes/clickRoutes')

// *************** Variable declarations ***************

// Starting Express
const app = express();


// ******************************

// Express settings
app.use(bodyParser.json());
app.use(clickRoutes);

// Connection to MONGO - settings
const mongoUri = 'mongodb+srv://admin:criGenetics@cluster0.vmxiy.mongodb.net/criClicks?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Connection to MONGO - success
mongoose.connection.on("connected", ()=>{
  console.log("Connected to Mongo")
});

// Connection to MONGO - error
mongoose.connection.on("error", ()=>{
  console.error("Error connecting to Mongo", err)
});

// Routes
app.get('/',  (req, res) => {
  res.send(`Hello World`);
});

// Connection to SERVER

app.listen(3001, ()=>{
  console.log("listening to port 3001")
})