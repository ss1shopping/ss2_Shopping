var express = require('express');
var router = express.Router();

const passport =require("passport")
const passportConf =require('../passport');
const multer =require("multer")
const util = require("util");
const path = require("path");
const auth =require("../middleware/verifyToken");
const shoppingController = require('../controller/item.controller');
const upload =require("../middleware/multer")
// const upload=require("../middleware/multer")
// const storage=multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,'./public/images')
//   },
//   filename: function(req,file,cb){
//     cb(null ,Date.now() + file.originalname) 
//   }
// })
// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg' || file.mimetype==="text/plain") {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
//  const upload=multer({
//   storage:storage,
//   limits:{fileSize:10000000000},
//   fileFilter: fileFilter
// })

router.route("/")
  .post(passport.authenticate("jwt",{session:false}),upload.array("files",12),shoppingController.addItem)
  .put(passport.authenticate("jwt",{session:false}),shoppingController.updateItem)
router.route("/limit=:limit/page=:page")
  .get(shoppingController.getItem )

// router.route("/update-sold")
//    .post(shoppingController.updateSold)
router.route("/update-view")
.post(shoppingController.updateView)
router.route("/getall/day=:day/month=:month/year=:year")
.get(shoppingController.getAllitem)
router.route("/uploadImage")
.post(passport.authenticate("jwt",{session:false}),upload.single("file"),shoppingController.uploadImage)
module.exports =router;