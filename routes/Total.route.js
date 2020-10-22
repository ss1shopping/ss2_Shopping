

var express = require('express');
const totalController = require('../controller/total.controller');
var router = express.Router();

router.route("/getallinfor/day=:day/month=:month/year=:year")
.get(totalController.getAllInformation)
router.route("/getallinfor/kind=:kind")
.get(totalController.getTotal)
module.exports=router;
