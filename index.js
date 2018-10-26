import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';

import allRoutes from './server/routes/';
const app = express();
const port = 3000;

app
  .use(express.static(path.join('public')))
  .use(cookieParser("secret"))
  .use(session({ cookie: { maxAge: 60000 } }))
  .use(flash())
  .use((req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next();
})
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }));

app
  .set("views", path.join(__dirname, "server/views"))
  .set("view engine", "pug");

allRoutes(app);
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Listening to port: ${port}`);
});
