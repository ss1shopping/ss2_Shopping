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
router.route("/export/:id")
  .put(passport.authenticate("jwt", { session: false }), orderController.exportOrder)
router.route("/cancelled/:id")
  .put(passport.authenticate("jwt", { session: false }), orderController.cancelledBilling)
router.route("/finish/:id")
  .put(passport.authenticate("jwt", { session: false }), orderController.finishBilling)
router.post("/checkout", [
  body("totalCost").isInt({ min: 1 }).notEmpty().withMessage("total cost not empty and > 1"),
  body("phone").isNumeric().notEmpty().withMessage("phone not empty"),
  body("address").isString().notEmpty().withMessage("address not empty"),
],
  passport.authenticate("jwt", { session: false }), authorize("USER"),
  orderController.checkout
)
// router.route("/cancelled/:id")
// .put(passport.authenticate("jwt",{session:false}),HistoryController.cancelBilling)
module.exports = router