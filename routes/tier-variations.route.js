var express = require('express');
var router = express.Router();
var multer = require('multer')
const Tier_variationsController = require("../controller/tier-variations.controller")
const passport = require("passport")
const passportConf = require('../passport');
const upload = require("../middleware/multer");
const { body } = require("express-validator");
const { authorize } = require('../middleware/auth');

/* GET home page. */
router.post('/add',
  [

    body("itemId").notEmpty().isString().withMessage("Id Product not empty"),
    body("id").notEmpty().isString().withMessage("Id tier not empty"),
    body("tier_variations.option").optional().isString().withMessage("must be string"),
    body("tier_varations.image").optional().isString().withMessage("must be string"),
    body("tier_variations.name").optional().isString().withMessage("must be string"),
  ],
  passport.authenticate("jwt", { session: false }), authorize("SHOPOWNER"),
  Tier_variationsController.add)

router.put("/update", [
  body("_id").notEmpty().isString().withMessage("Id tier not empty"),
  body("option").optional().isArray().withMessage("must be string"),
  body("image").optional().isArray().withMessage("must be string"),
  body("name").optional().isString().withMessage("must be string"),
],
  passport.authenticate("jwt", { session: false }), authorize("SHOPOWNER"),
  Tier_variationsController.update)

router.post("/upload/image",
  // passport.authenticate("jwt", { session: false }), authorize("SHOPOWNER"),
  upload.single("file"),
  Tier_variationsController.uploadImage)



module.exports = router;
