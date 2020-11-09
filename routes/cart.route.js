var express = require('express');
var router = express.Router();
var multer =require('multer')
const cartController =require("../controller/cart.controller")
const passport =require("passport")
const passportConf =require('../passport');
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/images')
  },
  filename: function(req,file,cb){
    cb(null ,Date.now() + file.originalname) 
  }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' || file.mimetype==="text/plain") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const upload=multer({
  storage:storage,
  limits:{fileSize:1000000},
  fileFilter: fileFilter
})
const fs= require("fs")
/* GET home page. */
router.route('/')
.post(passport.authenticate("jwt"),cartController.addToCart)
router.route("/remove")
.post(passport.authenticate("jwt",{session:false}),cartController.removeToCart)
router.route("/check-out")
.post(passport.authenticate("jwt",{session:false}),cartController.checkout)
module.exports = router;
