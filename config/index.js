const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  API_VERSION: '/api/v1',
  MONGODB: {
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
    HOST: process.env.MONGODB_HOST,
    DB_NAME: process.env.MONGODB_DB_NAME,
  },
  PORT: process.env.PORT,
};
