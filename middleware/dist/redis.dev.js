"use strict";

var redis = require("redis");

var portRedis = process.env.portRedis || 6379;
var clientredis = redis.createClient(portRedis);

function addRefreshTokenToList(refreshToken, user, accessToken, exp) {
  clientredis.HMSET(refreshToken, {
    "user": user,
    "accessToken": accessToken
  });
  clientredis.expire(refreshToken, exp);
}

function updateRefreshTokenfromList(refreshToken, accessToken) {
  clientredis.hset(refreshToken, "accessToken", accessToken, redis.print);
}

function removeRefreshTokenfromList(refreshToken) {
  clientredis.del(refreshToken, redis.print);
}

function addItemtolist(item, id, exp) {
  clientredis.HMSET(id, {
    "item": item
  });
}

function updateItemtoList(item, id, exp) {
  clientredis.hset(id, "item", item, redis.print);
}

function removeItemtoList(id) {
  clientredis.del(id, redis.print);
}

module.exports = {
  addRefreshTokenToList: addRefreshTokenToList,
  updateRefreshTokenfromList: updateRefreshTokenfromList,
  removeRefreshTokenfromList: removeRefreshTokenfromList,
  addItemtolist: addItemtolist,
  updateItemtoList: updateItemtoList,
  removeItemtoList: removeItemtoList,
  clientredis: clientredis
};