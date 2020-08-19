const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  API_VERSION: '/api/v1',
  MONGODB: {
    HOST: process.env.MONGODB_HOST,
    PASSWORD: process.env.MONGODB_PASSWORD,
  },
  PORT: process.env.PORT,
};
