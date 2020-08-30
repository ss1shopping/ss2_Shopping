"use strict";

var key = require("../config/index");

var jwt = require("jsonwebtoken");

auth = function auth(req, res, next) {
  var token = req.headers.authorization.split(" ")[1];

  try {
    // const token =req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, key.secretkey);
    req.users = decoded;
    next();
  } catch (e) {
    res.status(400).json({
      mes: "not token"
    });
  } //verify token

};

module.exports = auth;