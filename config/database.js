const mongoose = require('mongoose');
const { MONGODB } = require('./index');

const connectDatabase = () => {
  const MONGODB_URI = `mongodb+srv://${MONGODB.USER}:${MONGODB.PASSWORD}@${MONGODB.HOST}/${MONGODB.DB_NAME}?retryWrites=true&w=majority`;

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDatabase;
