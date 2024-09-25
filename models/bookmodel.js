const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is mandatory'],
      minlength: [3, 'title should be atleast 3 character'],
      maxlength: [20, 'title cannot be more than 20 character']
    },
    author: {
      type: String,
      required: [true, 'author is mandatory'],
      minlength: [3, 'author should be atleast 3 character'],
      maxlength: [20, 'author cannot be more than 20 character']
    },
    publishYear: {
      type: Number,
      min: [1000, 'Publish year should be a valid year'],
      max: [new Date().getFullYear(), 'Publish year cannot be in the future'],
    },
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model("Cat", bookSchema);

module.exports = book;