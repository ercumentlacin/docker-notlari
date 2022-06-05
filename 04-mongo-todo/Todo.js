const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Please add some text'],
      minlength: 1,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model('Todo', todoSchema);

module.exports = { Todo };
