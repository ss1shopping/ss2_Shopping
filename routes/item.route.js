var express = require('express');
var router = express.Router();

const passport = require("passport")
const passportConf = require('../passport');
const multer = require("multer")
const util = require("util");
const path = require("path");
const auth = require("../middleware/verifyToken");
const shoppingController = require('../controller/item.controller');
const upload = require("../middleware/multer");
const { body } = require('express-validator');
const { authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');
const Items = require('../schema/item.schema');

router.post("/create", [
  body('name').notEmpty().isString().withMessage('you must supply validate name'),
  body("priceMin").optional().isInt({ min: 1 }).withMessage("you must supply validate  minPrice "),
  body("priceMax").optional().isInt({ min: 1 }).withMessage("you must supply validate maxPrice"),
  body("discount").optional().isString().withMessage("you must supply validate discount"),
  body("sold").optional().isInt({ min: 0 }).withMessage("number sold have problem"),
  body("category").notEmpty().isArray().withMessage("you must supply category"),
]
  ,
  // passport.authenticate("jwt", { session: false }), authorize("SHOPOWNER"), upload.array("files", 12), 
  shoppingController.addItem)

router.put("/update",
  [

    body("id").notEmpty().isString().withMessage("id must be string "),
    body('name').notEmpty().isString().withMessage('you must supply validate name'),
    body("priceMin").optional().isInt({ min: 1 }).withMessage("you must supply validate  minPrice "),
    body("priceMax").optional().isInt({ min: 1 }).withMessage("you must supply validate maxPrice"),
    body("discount").optional().isString().withMessage("you must supply validate discount"),
    body("sold").optional().isInt({ min: 0 }).withMessage("number sold have problem"),
    body("category").notEmpty().isArray().withMessage("you must supply category"),

  ],
  //passport.authenticate("jwt", { session: false }), authorize("SHOPOWNER"),
  shoppingController.updateItem)
router.route("/get")
  .get(advancedResults(Items), shoppingController.getItems)
router.route("/delete")
  .post(passport.authenticate("jwt", { session: false }), shoppingController.deleteItem)

router.route("/get-one/:id")
  .get(shoppingController.getone)
// router.route("/uploadImage")
//   .post(passport.authenticate("jwt", { session: false }), authorize("SHOPOWNER"), upload.single("file"), shoppingController.uploadImage)
module.exports = router;