const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

db.on("connected", function () {
  console.log(`Mongoose connected to ${db.host}: ${db.port}`);
});
