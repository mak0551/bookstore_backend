const user = require("../models/usermodel");

const create = (data) => {
  return user.create(data);
};
const getuserbyemail = (email) => {
  return user.findOne({ email: email });
};
module.exports = { create, getuserbyemail };
