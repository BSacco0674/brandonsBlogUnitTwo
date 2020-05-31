const mongoose = require('mongoose');
const db = mongoose.connection;


mongoose.connect('mongodb://localhost/tktks', {
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true
});

db.on('connected', function() {
  console.log(`Mongoose connected to ${db.host}: ${db.port}`)
});