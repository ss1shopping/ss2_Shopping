const User = require("../schema/user.schema")
const JWT = require("jsonwebtoken");
const {addRefreshTokenToList,updateRefreshTokenfromList, removeRefreshTokenfromList,clientredis}=require( "../middleware/redis")
const key = require("../config/index")
const {
  sendConfirmationEmail,
  sendConfirmationEmailToChangepassword
} = require("../middleware/mailer");
const verifyToken = require("../middleware/verifyToken");
const config = require("../config/index");
const {
  timeExpRefreshtoken
} = require("../config/index");
const tokenList = {};

const signToken = (users, exp) => {
  return JWT.sign({
      iss: "xoaycodeeasy",
      sub: users._id,
      iat: new Date().getTime(), // current time
      exp: exp, //Math.floor(Date.now() / 1000) + (60*60*12) 1h =60*60
    },
    key.secretkey, {

    }
  );
};
const refreshToken = (users, exp) => {
  return JWT.sign({
      iss: "refreshToken",
      sub: users._id,
      iat: new Date().getTime(),
      exp: exp // Math.floor(Date.now() / 1000) + (60*60*12)
    },
    key.refreshtoken
  )
}







module.exports = {
  createuser: async (req, res, next) => {
    try {
      const {
        firstname,
        lastname,
        password,
        email
      } = req.body;
      if (!firstname || !lastname || !password || !email) {
        return res.status(400).json({
          msg: "pls enter all field"
        })
      }
      const user = await User.findOne({
        email: email
      })
      if (user) {
        return res.status(400).json({
          msg: "Email has already exist"
        })
      }
      var newuser = new User({
        firstname,
        lastname,
        password,
        email
      })
      const result = await newuser.save();
      await sendConfirmationEmail(result)
      return res.json({
        user: newuser,
        msg: "please active account in email"
      })
    } catch (error) {
      res.status(500).json({
        error: error.message
      })
    }

  },
  confirmEmail: async (req, res, next) => {
    const decode = JWT.verify(req.params.token, key.secretkey);
    User.findById(decode.sub, (err, doc) => {
      if (err) {
        res.status(400).json({
          msg: "error pls try again"
        })
      }
      doc.active = true;
      doc.save()
    });
    res.status(200).json({
      msg: "active email successful"
    })
  },
  login: async (user, res, next) => {
    try {
      const expToken = Math.floor(Date.now()) + (config.timeExpToken * 1000)
      const expRefreshToken = Math.floor(Date.now()) + (config.timeExpRefreshtoken * 1000)
      const token = signToken(user, expToken)
      const refreshtoken = refreshToken(user, expRefreshToken)
      const JsonUser = JSON.stringify(user)
      addRefreshTokenToList(refreshtoken, JsonUser, token, config.timeExpRefreshtoken)

      res.status(200).json({
        token: token,
        user: user,
        refreshToken: refreshtoken,
        expToken:config.timeExpToken,
        expRefreshToken:config.timeExpRefreshtoken
      })

    } catch (error) {

      console.log(error);
      res.status(500).json({
        msg: "error"
      })
    }


    // console.log(tokenList);  
    //    res.status(200).json({token:token,user:req.user,refreshToken:refreshtoken})

  },
  forgotPassword: async (req, res, next) => {
    const {
      email
    } = req.body
    const user = await User.findOne({
      email
    })
    if (!user) {
      return res.status({
        msg: "email not found"
      })
    }
    const tokentoChangePassword = await sendConfirmationEmailToChangepassword(user)
    res.status(200).json({
      tokentoChangePassword
    })
  },
  changePassword: async (req, res, next) => {
    const {
      password,
      passwordConfirm
    } = req.body
    const {
      token
    } = req.params
    const decode = JWT.verify(req.params.token, key.forgottoken);
    console.log(decode);
    if (!password || !passwordConfirm) {
      return res.json({
        msg: "pls enter all field"
      })
    }
    if (!password === passwordConfirm) {
      return res.status(400).json({
        msg: "password and password confirm is diffirent"
      })
    }
    User.findById(decode.sub, (err, doc) => {
      if (err) {
        res.status(400).json({
          msg: "error pls try again"
        })
      }
      doc.password = password;
      doc.save()
    })
    return res.status(200).json({
      msg: "password is change"
    })
  },
  refreshToken: async (req, res, next) => {
    const {
      refreshToken
    } = req.body;
    const expToken = Math.floor(Date.now()) + (config.timeExpToken*1000)


    if (refreshToken) {
      clientredis.exists(refreshToken, function (err, exists) {
        if (exists) {
          let refreshTokenPayload;

          JWT.verify(refreshToken, config.refreshtoken, function (err, decoded) {
            if (err) {
              console.log("el error es: " + err);
              return res.status(401).json({
                "statusCode": 401,
                "error": "Unauthorized",
                "msg": err.message,
              });
            }
            refreshTokenPayload = decoded;
          });
          const payload = {
            "_id": refreshTokenPayload.sub
          };
          const accessToken = signToken(payload, expToken);
          const response = {
            "access_token": accessToken,
            "expires_in": config.timeExpToken
           
          };
          updateRefreshTokenfromList(refreshToken, accessToken);
          res.status(200).json(response);
        } else {
          res.status(401).send({
            "statusCode": 401,
            "error": "Unauthorized",
            "message": "The refresh token does not exist",
          });
        }
      });
    } else {
      res.status(401).send({
        "statusCode": 400,
        "error": "Bad Request",
        "message": "The required parameters were not sent in the request",
      });
    }
  },
  revokeRefreshtoken: (req, res, next) => {
    const {
      refreshToken
    } = req.body;
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
            "message": "The refresh token does not exist",
          });
        }
      });
    } else {
      res.status(401).send({
        "statusCode": 400,
        "error": "Bad Request",
        "message": "The required parameters were not sent in the request",
      });
    }
  },
  checkToken: async (req, res, next) => {
    console.log("checkToken xem the nao");
    res.status(200).json({
      mes: "ok"
    })

  },
  getFromRedis: async (req, res, next) => {
    clientredis.get(req.body.email, (err, data) => {
      if (err) throw err;
      if (data !== null || undefined) {
        res.status(200).json({
          refreshToken: data
        })
      } else {
        next()
      }
    })



  }
}