var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
// var session=require("express-session")
// var connectRedis=require('connect-redis')
// var Redis=require("ioredis")
var cors = require('cors')
var cartRouter = require('./routes/cart.route');
var usersRouter = require('./routes/users');
var itemRouter = require("./routes/item.route")
var reviewRouter = require("./routes/review.route")
var orderRouter = require("./routes/order.route")
var testRouter = require("./routes/test.route")
var tierRouter = require("./routes/tier-variations.route")
var modelsRouter = require("./routes/models.routes")
var categoryRouter = require("./routes/category.routes")
var shopRouter = require("./routes/shop.routes")
const passport = require("passport");
const flash = require('connect-flash');
const compression = require("compression")
var CDN = require('express-simple-cdn');
var CDN = "https://assets.preisheld.ch";
var importdata = require("./seed")
// const uri =require('./config.json');
// const uri="mongodb+srv://manhtien465:tien1234@cluster0-vaatg.mongodb.net/test?retryWrites=true&w=majority"
// const Session_Option=require("./config/session")
// const Redis_option =require("./config/cache")
const MONGO_Options = require("./config/db")

const connect = mongoose.connect(MONGO_Options.MONGO_URI || "mongodb://localhost/shopping", MONGO_Options.MONGO_Option)
  .then(() => {
    //importdata()
    console.log("connect MongoDb")
  })
  .catch(err => console.log(err)
  )
// const RedisStore = connectRedis(session)
//   const client = new Redis(Redis_option.Redis_Option)
//   const store = new RedisStore({ client })
var app = express();
app.locals.CDN = function (path, type, classes, alt) {
  if (type == 'js') {
    return "<script src='" + CDN + path + "' type='text/javascript'></script>";
  } else if (type == 'css') {
    return "<link rel='stylesheet' type='text/css' href='" + CDN + path + "'/>";
  } else if (type == 'img') {
    return "<img class='" + classes + "' src='" + CDN + path + "' alt='" + alt + "' />";
  } else {
    return "";
  }
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression({
  level: 6,
  threshold: 10 * 1000,
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false
    }
    return compression.filter(req, res)
  }
}))
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use("/review", reviewRouter)
app.use("/item", itemRouter)
app.use("/order", orderRouter)
app.use("/test", testRouter)
app.use("/tier-variation", tierRouter)
app.use("/model", modelsRouter)
app.use("/category", categoryRouter)
app.use('/shop', shopRouter)
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(
//   session({ ...Session_Option,
//     store:new RedisStore({client})
//   })
// )

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
