const dotenv = require("dotenv");
dotenv.config();

const ENV = {
    DB_URL: process.env.db_url,
};


module.exports = { ENV };

