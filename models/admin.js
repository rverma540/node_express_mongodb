const mongoose = require("mongoose");
const validator = require("validator");

const userDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already present "],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },

  userid: {
    type: String,
    required: true,
  },
  
});

const Userdetails = new mongoose.model("Userdetails", userDetailSchema);
module.exports = Userdetails;
