//here we handle all database related queries
const book = require("../models/bookmodel"); // requiring schema model
function count(search) {
  const filter= getfilter(search)
  return book.countDocuments(filter);
}
function getfilter(search) {
  return {
    $or: [
      { title: { $regex: search, $options: "i" } }, // Case-insensitive and partial match for title
      { author: { $regex: search, $options: "i" } }, // Case-insensitive and partial match for author
    ],
  };
}
function getAll(parameters) {
const {recordstoskip, pagesize, search, sort, order} = parameters;
  const filter=getfilter(search);
  return book.find(filter, { _v: 0 }).sort({[sort]:order.toLowerCase()}).skip(recordstoskip).limit(pagesize);
}
function getById(id) {
  return book.findById(id);
}
function create(newBook) {
  return book.create(newBook);
}
function put(id, body) {
  return book.findByIdAndUpdate(id, body);
}
function remove(id) {
  return book.findByIdAndDelete(id);
}
module.exports = { getAll, getById, create, put, remove, count };
