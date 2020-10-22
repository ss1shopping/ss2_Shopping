var express = require('express');
const historyController = require('../controller/history.controller');
var router = express.Router();
const HistoryController=require("../controller/history.controller")

router.route("/limit=:limit/page=:page")
.get(HistoryController.getAllHistory)
module.exports=router