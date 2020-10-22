var express = require('express');
var router = express.Router();

const passport =require("passport")
const passportConf =require('../passport');
const multer =require("multer")
const auth =require("../middleware/verifyToken");
const shoppingController = require('../controller/item.controller');

// const upload=require("../middleware/multer")
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
  limits:{fileSize:10000000000},
  fileFilter: fileFilter
})

router.route("/")
  .post(shoppingController.addItem)
  .put(shoppingController.updateItem)
router.route("/limit=:limit/page=:page")
  .get(shoppingController.getItem )

// router.route("/update-sold")
//    .post(shoppingController.updateSold)
router.route("/update-view")
.post(shoppingController.updateView)
router.route("/getall/day=:day/month=:month/year=:year")
.get(shoppingController.getAllitem)

module.exports =router;