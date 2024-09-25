const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  firstname: { type: String, required: [true, "firstname is necessary"] },
  lastname: { type: String, required: [true, "lastname is necessary"] },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (e) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
      },
      message: "please enter a valid email",
    },
    required: [true, 'email required']
  },
  password: {
    type:String,
    required: [true, "password is necessary"],
    minlength: [6, "password must be at least 6 characters long"],
  },
  role: String,
  active: Boolean,
  createdat: Date,
  updatedat: Date,
});
module.exports = mongoose.model("users", schema);
