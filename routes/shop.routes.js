var express = require('express');
const { body } = require('express-validator');
const shopController = require('../controller/shop.controller');
var router = express.Router();
const passport = require("passport")
const passportConf = require('../passport');
const advancedResults = require('../middleware/advancedResults');
const Shops = require('../schema/shop.schema');
const { authorize } = require('../middleware/auth');
const upload = require('../middleware/multer');

router.post("/create", [
  body("name").notEmpty().isString().withMessage("name must be supple"),
  body("description").optional().isString().withMessage("description must be string"),
],
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER"),
  shopController.create
)

router.put('/update', [
  body("id").isString().withMessage("id must be not empty"),
  body("name").optional().isString().withMessage("name must be supple"),
  body("description").optional().isString().withMessage("description must be string"),
  body("official_shop").optional().isBoolean().withMessage("must be boolean"),
  body("totalInCome").optional().isInt({ min: 0 }).withMessage("totalIncome must be positive number"),
  body("isDisabled").optional().isBoolean().withMessage("disable must be boolean"),
  body("ratingGood").optional().isInt({ min: 0 }).withMessage("rating good must be number"),
  body("ratingBad").optional().isInt({ min: 0 }).withMessage("rating bad must be number"),
  body("ratingStar").optional().isInt({ min: 0 }).withMessage("rating star must be number"),
  body("avatar").optional().isString().withMessage("avatar must be image"),
  body("backroundImage").optional().isString().withMessage("background iamge msut be image"),
],
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER"),
  shopController.update
)
router.get("/get",
  // passport.authenticate("jwt", { session: false }),
  // authorize("CUSTOMER"),
  advancedResults(Shops)
  , shopController.getall
)

router.get("/get-one",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER"),
  shopController.getone
)
router.delete("/delete",
  ///passport.authenticate("jwt", { session: false }), 
  // authorize("USER"),
  shopController.delete)

router.post("/upload-image",
  upload.single("file"),
  shopController.uploadImage
)
module.exports = router