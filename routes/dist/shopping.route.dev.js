"use strict";

var express = require('express');

var router = express.Router();

var ShoppingController = require("../controller/shopping.controller");

var passport = require("passport");

var passportConf = require('../passport');

var multer = require("multer");

var auth = require("../middleware/verifyToken"); // const upload=require("../middleware/multer")


var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './public/images');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000000
  },
  fileFilter: fileFilter
});
router.route("/").post(passport.authenticate("jwt", {
  session: false
}), auth, ShoppingController.addItem).get(passport.authenticate("jwt", {
  session: false
}), auth, ShoppingController.getItem).put(passport.authenticate("jwt", {
  session: false
}), ShoppingController.updateItem)["delete"](passport.authenticate("jwt", {
  session: false
}), ShoppingController.deleteItem);
router.route("/upload").post(upload.single("file"), ShoppingController.uploadImage)["delete"](ShoppingController.deleteImage);
module.exports = router;