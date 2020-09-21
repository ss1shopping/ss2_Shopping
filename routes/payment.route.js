var express = require('express');
var router = express.Router();
const paymentController=require("../controller/payment.controller")

router.route("/")
.post(paymentController.checkout)
module.exports=router