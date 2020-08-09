const express = require('express');
const router = express.Router();
const puppeterr=require("puppeteer");
const Crawler =require("../controller/crawler.controller")
router.route("/getdata")
.get(Crawler.getDataFromRedis,Crawler.getdata)

module.exports=router;