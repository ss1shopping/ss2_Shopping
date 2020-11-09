

var express = require('express');
const passport =require("passport")
const passportConf =require('../passport');
const totalController = require('../controller/total.controller');
var router = express.Router();

router.route("/getallinfor/day=:day/month=:month/year=:year")
.get(passport.authenticate("jwt",{session:false}),totalController.getAllInformation)
router.route("/getallinfor/kind=:kind")
.get(passport.authenticate("jwt",{session:false}),totalController.getTotal)
module.exports=router;
