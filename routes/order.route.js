var express = require('express');
var router = express.Router();
const orderController = require("../controller/order.controller")
const passport = require("passport")
const passportConf = require('../passport');
const advancedResults = require('../middleware/advancedResults');
const Orders = require('../schema/order.schema');
const { authorize } = require('../middleware/auth');
const { body } = require('express-validator');

router.get("/getall",
  // passport.authenticate("jwt", { session: false }), authorize("ADMIN"),
  advancedResults(Orders),
  orderController.getAllOrders)
router.get("/getall/user/order",
  // passport.authenticate("jwt", { session: false }), 
  // authorize("USER"),
  advancedResults(Orders),
  orderController.getInforOrdersOfUser)
router.route("/delete")
  .post(passport.authenticate("jwt", { session: false }), orderController.deleteOrder)
router.put("/change-status",
  [
    body("id").isString().notEmpty().withMessage("must be string"),
    body("status").isString().notEmpty().withMessage("status must be string")
  ],
  passport.authenticate("jwt", { session: false }), orderController.ChangeStatusOrder)

router.put("/canceled-order", [
  body("id").isString().notEmpty().withMessage("must be string"),

],
  passport.authenticate("jwt", { session: false }), orderController.cannceledOrder)

router.post("/checkout", [
  body("carts").isArray().notEmpty().withMessage("cart not empty"),
  body("phone").isNumeric().notEmpty().withMessage("phone not empty"),
  body("address").isString().notEmpty().withMessage("address not empty"),
],
  passport.authenticate("jwt", { session: false }), authorize("CUSTOMER"),
  orderController.checkout
)
// router.route("/cancelled/:id")
// .put(passport.authenticate("jwt",{session:false}),HistoryController.cancelBilling)
module.exports = router