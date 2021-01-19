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

router.post("/create", [
  body('name').notEmpty().isString().withMessage('you must supply validate name'),
  body("priceMin").optional().isInt({ min: 1 }).withMessage("you must supply validate  minPrice "),
  body("priceMax").optional().isInt({ min: 1 }).withMessage("you must supply validate maxPrice"),
  body("discount").optional().isString().withMessage("you must supply validate discount"),
  body("sold").optional().isInt({ min: 0 }).withMessage("number sold have problem"),
  body("category").notEmpty().isArray().withMessage("you must supply category"),
  body("tier_variations").optional(),
  body("tier_variations.option").optional().isArray().withMessage("must be array"),
  body("tier_varations.image").optional().isArray().withMessage("must be array"),
  body("tier_variations.name").optional().isString().withMessage("must be string")
]
  , passport.authenticate("jwt", { session: false }), upload.array("files", 12), shoppingController.addItem)

router.put("/update",
  [

    body("id").notEmpty().isString().withMessage("id must be string "),
    body('name').notEmpty().isString().withMessage('you must supply validate name'),
    body("priceMin").optional().isInt({ min: 1 }).withMessage("you must supply validate  minPrice "),
    body("priceMax").optional().isInt({ min: 1 }).withMessage("you must supply validate maxPrice"),
    body("discount").optional().isString().withMessage("you must supply validate discount"),
    body("sold").optional().isInt({ min: 0 }).withMessage("number sold have problem"),
    body("category").notEmpty().isArray().withMessage("you must supply category"),
    body("tier_variations.option").optional().isArray().withMessage("must be array"),
    body("tier_varations.image").optional().isArray().withMessage("must be array"),
    body("tier_variations.name").optional().isString().withMessage("must be string")
  ],
  passport.authenticate("jwt", { session: false }), shoppingController.updateItem)
router.route("/")
  .get(shoppingController.getItem)
router.route("/delete")
  .post(passport.authenticate("jwt", { session: false }), shoppingController.deleteItem)

router.route("/getall")
  .get(shoppingController.getAllitem)
router.route("/uploadImage")
  .post(passport.authenticate("jwt", { session: false }), upload.single("file"), shoppingController.uploadImage)
module.exports = router;