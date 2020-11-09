var express = require('express');
var router = express.Router();
const HistoryController=require("../controller/history.controller")
const passport =require("passport")
const passportConf =require('../passport');

router.route("/limit=:limit/page=:page")
.get(passport.authenticate("jwt",{session:false}),HistoryController.getAllHistory)
router.route("/")
.get(passport.authenticate("jwt",{session:false}),HistoryController.getInforHistoryofUser)
module.exports=router