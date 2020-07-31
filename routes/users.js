var express = require('express');
var router = express.Router();
const UserController=require("../controller/user.controller")
const passport =require("passport")
const passportConf =require('../passport');
const { default: userController } = require('../controller/user.controller');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
/* GET users listing. */
router.route('/')
.post(UserController.createuser)
router.route("/login")
.post(passport.authenticate('local',{session:false}),UserController.getFromRedis,UserController.login)
router.route("/refresh")
.post(UserController.refreshToken)
router.route("/checktoken")
.post(passport.authenticate("jwt",{session:false}),UserController.checkToken)
router.route("/getdata")
.post(UserController.getFromRedis)
module.exports = router;
