const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    done: {
      type: Boolean,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('todo', todoSchema);
