const app = require('./app');
const mongoose = require('mongoose');
const PORT = 3000;
/** Database Connection */
mongoose.connect(
  "mongodb+srv://admin:12345@cluster0.9aczl.mongodb.net/Cache", {
  //useMongoClient: true,
  useNewUrlParser: false,
  useCreateIndex: true
}).then(
  con => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at port:${PORT}`);
    });
  }
).catch((err) => {
  console.log(err);
  console.log("DB connection failed")
});
