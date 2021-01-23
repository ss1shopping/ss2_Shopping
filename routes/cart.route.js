var express = require('express');
var router = express.Router();
var multer = require('multer')
const cartController = require("../controller/cart.controller")
const passport = require("passport")
const passportConf = require('../passport');
const { body } = require("express-validator")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: fileFilter
})
const fs = require("fs")
/* GET home page. */
router.post('/add', [
  body('productId').notEmpty().isString().withMessage('you must supply productId'),
  body('number').notEmpty().isInt({ min: 1 }).withMessage('You must supply quantity positive ')
],
  cartController.addToCart)


router.put("/cart/remove/:carts"
  , passport.authenticate("jwt", { session: false }), cartController.removeToCart)


router.delete("/cart/empty-cart",
  cartController.emptyCart
)

router.put("/update", [
  body('id').notEmpty().isString().withMessage('you must supply id'),
  body('number').notEmpty().isInt({ min: 0 }).withMessage('You must supply number positive '),
],
  cartController.updateCart
)

router.get("/get",
  cartController.getCart)
module.exports = router;
