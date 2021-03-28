var express = require('express');
var router = express.Router();
const UserController = require("../controller/user.controller")
const passport = require("passport")
const passportConf = require('../passport');
const { body } = require('express-validator');
const { authorize } = require("../middleware/auth");
const advancedResults = require('../middleware/advancedResults');
const Users = require("../schema/user.schema")
/* GET users listing. */
router.post('/create', [
  body('firstname').isString().notEmpty().withMessage('You must supply validate firstName '),
  body('lastname').isString().notEmpty().withMessage('You must supply validate lastName '),
  body("email").notEmpty().isEmail().normalizeEmail().withMessage("you must supply validate email"),
  // body("phoneNumber").isNumeric().optional({ nullable: true }).withMessage("you must supply phone number"),
  // body('gender').isString().optional({ nullable: true }).withMessage("gender must be string"),
  // body("dob").isDate().optional({ nullable: true }).withMessage("dob must be date"),
  body("password").isString({ min: 8 }).notEmpty().withMessage("password msut be greater than 8")
],
  UserController.createuser)

//add 

router.route("/login/:token")
  // lay data
  .get(UserController.confirmEmail)
router.route("/login")
  .post((req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json(info)
      UserController.login(user, res, next)
    })(req, res, next);
  })//UserController.getFromRedis

router.put("/update",
  [
    body('id').notEmpty().withMessage('you must supply id'),
    body('firstName').isString().optional({ nullable: true }).withMessage('You must supply validate firstName '),
    body('lastName').isString().optional({ nullable: true }).withMessage('You must supply validate lastName '),
    body("email").notEmpty().isEmail().normalizeEmail().withMessage("you must supply validate email"),
    body("phoneNumber").isNumeric().optional({ nullable: true }).withMessage("you must supply phone number"),
    body('gender').isString().optional({ nullable: true }).withMessage("gender must be string"),
    body('shopName').isString().optional({ nullable: true }).withMessage("shop name must be supply validate"),
    body("dob").isDate().optional({ nullable: true }).withMessage("dob must be date"),
    body("addresses.phoneNumber").optional().isNumeric().withMessage("phone number must be Number"),
    body('addresses.state').optional().isString().withMessage("state must be string"),
    body("addresses.district").optional().isString().withMessage("must be string"),
    body("addresses.city").optional().isString().withMessage("must be string"),
    body("addresses.address").optional().isString().withMessage("must be string")
  ],
  // passport.authenticate("jwt", { session: false }),
  UserController.updateUser
)

router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), authorize("ADMIN"), UserController.deleteUser)

router.route("/login/forgotpassword")
  .post(UserController.forgotPassword)

router.route("/login/forgotpassword/confirm/:token")
  .post(UserController.changePassword)

router.get("/getall", advancedResults(Users), UserController.getAlluser)
// router.get("/get", advancedResults(Users), UserController.getAlluser)
router.post("/ban", UserController.banUser)
// router.route("/revoke")
//   .post(UserController.revokeRefreshtoken)

router.route("/checktoken")
  .post(passport.authenticate("jwt", { session: false }), UserController.checkToken)
module.exports = router;
