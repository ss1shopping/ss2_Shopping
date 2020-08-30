"use strict";

var User = require("../schema/user.schema");

var JWT = require("jsonwebtoken");

var _require = require("../middleware/redis"),
    addRefreshTokenToList = _require.addRefreshTokenToList,
    updateRefreshTokenfromList = _require.updateRefreshTokenfromList,
    removeRefreshTokenfromList = _require.removeRefreshTokenfromList,
    clientredis = _require.clientredis;

var key = require("../config/index");

var _require2 = require("../middleware/mailer"),
    sendConfirmationEmail = _require2.sendConfirmationEmail,
    sendConfirmationEmailToChangepassword = _require2.sendConfirmationEmailToChangepassword;

var verifyToken = require("../middleware/verifyToken");

var config = require("../config/index");

var _require3 = require("../config/index"),
    timeExpRefreshtoken = _require3.timeExpRefreshtoken;

var tokenList = {};

var signToken = function signToken(users, exp) {
  return JWT.sign({
    iss: "xoaycodeeasy",
    sub: users._id,
    iat: new Date().getTime(),
    // current time
    exp: exp //Math.floor(Date.now() / 1000) + (60*60*12) 1h =60*60

  }, key.secretkey, {});
};

var refreshToken = function refreshToken(users, exp) {
  return JWT.sign({
    iss: "refreshToken",
    sub: users._id,
    iat: new Date().getTime(),
    exp: exp // Math.floor(Date.now() / 1000) + (60*60*12)

  }, key.refreshtoken);
};

module.exports = {
  createuser: function createuser(req, res, next) {
    var _req$body, firstname, lastname, password, email, user, newuser, result;

    return regeneratorRuntime.async(function createuser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, password = _req$body.password, email = _req$body.email;

            if (!(!firstname || !lastname || !password || !email)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: "pls enter all field"
            }));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(User.findOne({
              email: email
            }));

          case 6:
            user = _context.sent;

            if (!user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              msg: "Email has already exist"
            }));

          case 9:
            newuser = new User({
              firstname: firstname,
              lastname: lastname,
              password: password,
              email: email
            });
            _context.next = 12;
            return regeneratorRuntime.awrap(newuser.save());

          case 12:
            result = _context.sent;
            _context.next = 15;
            return regeneratorRuntime.awrap(sendConfirmationEmail(result));

          case 15:
            return _context.abrupt("return", res.json({
              user: newuser,
              msg: "please active account in email"
            }));

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              error: _context.t0.message
            });

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 18]]);
  },
  confirmEmail: function confirmEmail(req, res, next) {
    var decode;
    return regeneratorRuntime.async(function confirmEmail$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            decode = JWT.verify(req.params.token, key.secretkey);
            User.findById(decode.sub, function (err, doc) {
              if (err) {
                res.status(400).json({
                  msg: "error pls try again"
                });
              }

              doc.active = true;
              doc.save();
            });
            res.status(200).json({
              msg: "active email successful"
            });

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  login: function login(user, res, next) {
    var expToken, expRefreshToken, token, refreshtoken, JsonUser;
    return regeneratorRuntime.async(function login$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            try {
              expToken = Math.floor(Date.now()) + config.timeExpToken * 1000;
              expRefreshToken = Math.floor(Date.now()) + config.timeExpRefreshtoken * 1000;
              token = signToken(user, expToken);
              refreshtoken = refreshToken(user, expRefreshToken);
              JsonUser = JSON.stringify(user);
              addRefreshTokenToList(refreshtoken, JsonUser, token, config.timeExpRefreshtoken);
              res.status(200).json({
                token: token,
                user: user,
                refreshToken: refreshtoken,
                expToken: config.timeExpToken,
                expRefreshToken: config.timeExpRefreshtoken
              });
            } catch (error) {
              console.log(error);
              res.status(500).json({
                msg: "error"
              });
            } // console.log(tokenList);  
            //    res.status(200).json({token:token,user:req.user,refreshToken:refreshtoken})


          case 1:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  forgotPassword: function forgotPassword(req, res, next) {
    var email, user, tokentoChangePassword;
    return regeneratorRuntime.async(function forgotPassword$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            email = req.body.email;
            _context4.next = 3;
            return regeneratorRuntime.awrap(User.findOne({
              email: email
            }));

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status({
              msg: "email not found"
            }));

          case 6:
            _context4.next = 8;
            return regeneratorRuntime.awrap(sendConfirmationEmailToChangepassword(user));

          case 8:
            tokentoChangePassword = _context4.sent;
            res.status(200).json({
              tokentoChangePassword: tokentoChangePassword
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  changePassword: function changePassword(req, res, next) {
    var _req$body2, password, passwordConfirm, token, decode;

    return regeneratorRuntime.async(function changePassword$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, password = _req$body2.password, passwordConfirm = _req$body2.passwordConfirm;
            token = req.params.token;
            decode = JWT.verify(req.params.token, key.forgottoken);
            console.log(decode);

            if (!(!password || !passwordConfirm)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.json({
              msg: "pls enter all field"
            }));

          case 6:
            if (!(!password === passwordConfirm)) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              msg: "password and password confirm is diffirent"
            }));

          case 8:
            User.findById(decode.sub, function (err, doc) {
              if (err) {
                res.status(400).json({
                  msg: "error pls try again"
                });
              }

              doc.password = password;
              doc.save();
            });
            return _context5.abrupt("return", res.status(200).json({
              msg: "password is change"
            }));

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  refreshToken: function refreshToken(req, res, next) {
    var refreshToken, expToken;
    return regeneratorRuntime.async(function refreshToken$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            refreshToken = req.body.refreshToken;
            expToken = Math.floor(Date.now()) + config.timeExpToken * 1000;

            if (refreshToken) {
              clientredis.exists(refreshToken, function (err, exists) {
                if (exists) {
                  var refreshTokenPayload;
                  JWT.verify(refreshToken, config.refreshtoken, function (err, decoded) {
                    if (err) {
                      console.log("el error es: " + err);
                      return res.status(401).json({
                        "statusCode": 401,
                        "error": "Unauthorized",
                        "msg": err.message
                      });
                    }

                    refreshTokenPayload = decoded;
                  });
                  var payload = {
                    "_id": refreshTokenPayload.sub
                  };
                  var accessToken = signToken(payload, expToken);
                  var response = {
                    "access_token": accessToken,
                    "expires_in": config.timeExpToken
                  };
                  updateRefreshTokenfromList(refreshToken, accessToken);
                  res.status(200).json(response);
                } else {
                  res.status(401).send({
                    "statusCode": 401,
                    "error": "Unauthorized",
                    "message": "The refresh token does not exist"
                  });
                }
              });
            } else {
              res.status(401).send({
                "statusCode": 400,
                "error": "Bad Request",
                "message": "The required parameters were not sent in the request"
              });
            }

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  revokeRefreshtoken: function revokeRefreshtoken(req, res, next) {
    var refreshToken = req.body.refreshToken;

    if (refreshToken) {
      client.exists(postData.refreshToken, function (err, exists) {
        if (exists) {
          console.log('res vale: ' + exists);
          removeRefreshTokenfromList(refreshToken);
          res.sendStatus(204);
        } else {
          console.log('The refresh token does not exist');
          res.status(401).send({
            "statusCode": 401,
            "error": "Unauthorized",
            "message": "The refresh token does not exist"
          });
        }
      });
    } else {
      res.status(401).send({
        "statusCode": 400,
        "error": "Bad Request",
        "message": "The required parameters were not sent in the request"
      });
    }
  },
  checkToken: function checkToken(req, res, next) {
    return regeneratorRuntime.async(function checkToken$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("checkToken xem the nao");
            res.status(200).json({
              mes: "ok"
            });

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  getFromRedis: function getFromRedis(req, res, next) {
    return regeneratorRuntime.async(function getFromRedis$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            clientredis.get(req.body.email, function (err, data) {
              if (err) throw err;

              if (data !== null || undefined) {
                res.status(200).json({
                  refreshToken: data
                });
              } else {
                next();
              }
            });

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    });
  }
};