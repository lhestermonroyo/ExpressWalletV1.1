let mongoose = require("mongoose");

let accountsSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  balance: {
    type: Number,
    default: 0
  },
  transaction: {
    type: Array,
    default: []
  }
});

let accounts = (module.exports = mongoose.model("accounts", accountsSchema));
