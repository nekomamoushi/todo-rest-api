const mongoose = require('mongoose');
const { MONGODB } = require('./index');

const connectDatabase = () => {
  const MONGODB_URI = `mongodb+srv://${MONGODB.HOST}:${MONGODB.PASSWORD}@cluster0.vxrfi.azure.mongodb.net/todos?retryWrites=true&w=majority`;

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDatabase;
