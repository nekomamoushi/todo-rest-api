const todos = [];

exports.getTodos = (req, res, next) => {
  res
    .status(200)
    .json({ message: 'Posts fetched successfully!', todos: todos });
};
