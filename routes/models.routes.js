var express = require('express');
var router = express.Router();
var multer = require('multer')
const ModelsController = require("../controller/models.controller")
const passport = require("passport")
const passportConf = require('../passport');
const upload = require("../middleware/multer");
const { body } = require("express-validator");
const { authorize } = require('../middleware/auth');

/* GET home page. */
router.post('/add',
  [
    body("id").isString().optional().withMessage("id must be string"),
    body("itemId").isString().optional().withMessage("itemId must be String"),
    body('name').isString().optional().withMessage("name must be be not empty"),
    body("promotions_id").optional().isInt().withMessage("you must supply validate promotion stock"),
    body("normal_stock").optional().isInt().withMessage("you must supply normal_stock"),
    body("status").optional().isInt().withMessage("you must supply validate status"),
    body("price_before_discount").optional().isInt({ min: 0 }).withMessage("you must supply validate price befor discount"),
    body("sold").optional().isInt().withMessage("number sold have problem"),
    body('price').isInt({ min: 1 }).optional().withMessage("price must be validate"),
    body("price_stocks.price").isInt({ min: 1 }).optional().withMessage("must be number"),
    body("price_stocks.stockout_time").optional().isDate().withMessage("must be date"),
    body("price_stocks.purchase_limit").isInt({ min: 0 }).optional().withMessage("purchase limit must be number and greater than 0"),
    body("price_stocks.shopId").optional().isString().withMessage("you must supply validate shop"),
    body("price_stocks.promotion_id").optional().isString().withMessage("you must supply validate promotion"),
    body("price_stocks.promotion_type").optional().isString().withMessage("you must supply validate promotion type"),
    body("price_stocks.start_time").optional().isDate().withMessage("you must supply start time"),
    body("price_stocks.end_time").optional().isDate().withMessage("you must supply validate end time"),
  ],
  // passport.authenticate("jwt", { session: false }), authorize("SHOPOWNER"), upload.array("files", 12),
  ModelsController.add)

router.put("/update", [
  body("id").isString().optional().withMessage("id must be string"),
  body("itemId").isString().optional().withMessage("itemId must be String"),
  body('name').isString().optional().withMessage("name must be be not empty"),
  body("promotions_id").optional().isInt().withMessage("you must supply validate promotion stock"),
  body("normal_stock").optional().isInt().withMessage("you must supply normal_stock"),
  body("status").optional().isInt().withMessage("you must supply validate status"),
  body("price_before_discount").optional().isInt({ min: 0 }).withMessage("you must supply validate price befor discount"),
  body("sold").optional().isInt().withMessage("number sold have problem"),
  body('price').isInt({ min: 1 }).optional().withMessage("price must be validate"),
  body('price_stocks').isArray().optional().withMessage("model price stock must be array"),
  body("price_stocks.*.price").isInt({ min: 1 }).optional().withMessage("must be number"),
  body("price_stocks.*.stockout_time").optional().isDate().withMessage("must be date"),
  body("price_stocks.*.purchase_limit").isInt({ min: 0 }).optional().withMessage("purchase limit must be number and greater than 0"),
  body("price_stocks.*.shopId").optional().isString().withMessage("you must supply validate shop"),
  body("price_stocks.*.promotion_id").optional().isString().withMessage("you must supply validate promotion"),
  body("price_stocks.*.promotion_type").optional().isString().withMessage("you must supply validate promotion type"),
  body("price_stocks.*.start_time").optional().isDate().withMessage("you must supply start time"),
  body("price_stocks.*.end_time").optional().isDate().withMessage("you must supply validate end time"),
],
  ModelsController.update
)

router.delete("/delete/:id",
  ModelsController.delete
)
module.exports = router;
