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
//add 
.post(UserController.createuser)
router.route("/loadingcart")
.get(UserController.getLoadingCart)
router.route("/login/:token")
// lay data
.get(UserController.confirmEmail)
router.route("/login")
.post((req, res, next)=> {
  passport.authenticate('local', (err, user, info) =>{
    if (err)  return next(err); 
    if (!user) return res.status(400).json(info)
    UserController.login(user,res,next)
  })(req, res, next);
})//UserController.getFromRedis
router.route("/login/forgotpassword")
.post(UserController.forgotPassword)
router.route("/login/forgotpassword/confirm/:token")
.post(UserController.changePassword)
router.route("/refresh")
.post(UserController.refreshToken)
router.route("/revoke")
.post(UserController.revokeRefreshtoken)
router.route("/checktoken")
.post(passport.authenticate("jwt",{session:false}),UserController.checkToken)
router.route("/getdata")
.post(UserController.getFromRedis)
module.exports = router;
