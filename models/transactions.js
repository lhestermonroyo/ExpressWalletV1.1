let mongoose = require("mongoose");

let transSchema = mongoose.Schema({
  transaction_type: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  recepient: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  wallet_balance: {
    type: String,
    required: true
  }
});

let transactions = (module.exports = mongoose.model(
  "transactions",
  transSchema
));
