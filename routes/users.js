var express = require('express');
var router = express.Router();
const UserController=require("../controller/user.controller")
/* GET users listing. */
router.route('/')
.post(UserController.create)

module.exports = router;
