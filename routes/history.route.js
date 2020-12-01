var express = require('express');
var router = express.Router();
const HistoryController=require("../controller/history.controller")
const passport =require("passport")
const passportConf =require('../passport');

router.route("/limit=:limit/page=:page/status=:status")
.get(passport.authenticate("jwt",{session:false}),HistoryController.getAllHistory)
router.route("/user/limit=:limit/page=:page")
.get(passport.authenticate("jwt",{session:false}),HistoryController.getInforHistoryofUser)
router.route("/delete")
.post(passport.authenticate("jwt",{session:false}),HistoryController.deleteOrder)
router.route("/export/:id")
.put(passport.authenticate("jwt",{session:false}),HistoryController.exportOrder)
router.route("/cancelled/:id")
.put(passport.authenticate("jwt",{session:false}),HistoryController.cancelledBilling)
router.route("/finish/:id")
.put(passport.authenticate("jwt",{session:false}),HistoryController.finishBilling)
// router.route("/cancelled/:id")
// .put(passport.authenticate("jwt",{session:false}),HistoryController.cancelBilling)
module.exports=router