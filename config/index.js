const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  API_VERSION: '/api/v1',
  MONGODB_HOST: process.env.MONGODB_HOST,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  PORT: process.env.PORT,
};
