const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const indexRouter = require("./server/routes/indexRoute");
const signupRouter = require("./server/routes/signupRoute");
const homeRoute = require("./server/routes/homeRoute");
const fundtransferRoute = require("./server/routes/fundtransferRoute");
const checkbalanceRoute = require("./server/routes/checkbalanceRoute");
const depositRoute = require("./server/routes/depositRoute");
const withdrawRoute = require("./server/routes/withdrawRoute");
const billspaymentRoute = require("./server/routes/billspaymentRoute");
const transactionhistoryRoute = require("./server/routes/transactionhistoryRoute");
const app = express();
const port = 3000;

mongoose.connect(
  "mongodb://localhost/expresswallet",
  { useNewUrlParser: true }
);
let db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", err => {
  console.log(err);
});

app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "server/views"));
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/home", homeRoute);
app.use("/fundtransfer", fundtransferRoute);
app.use("/checkbalance", checkbalanceRoute);
app.use("/deposit", depositRoute);
app.use("/withdraw", withdrawRoute);
app.use("/billspayment", billspaymentRoute);
app.use("/transactionhistory", transactionhistoryRoute);

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening to port: ${port}`);
});
