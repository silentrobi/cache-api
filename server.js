const mongoose = require('mongoose');
const app = require('./app');
const { ENV } = require('./src/configs/config');
const PORT = 3000;
/** Database Connection */
mongoose.connect(
  ENV.DB_URL, {
  useNewUrlParser: false
}).then(
  con => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at port:${PORT}`);
    });
  }
).catch((err) => {
  console.log(err);
  console.log("DB connection failed!")
});
