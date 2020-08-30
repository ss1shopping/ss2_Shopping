"use strict";

var Items = require("../schema/shoppingItem.schema");

var User = require("../schema//user.schema");

var itemImage = require("../schema/itemImage.schema");

var Shopping = require("../schema/shoppingItem.schema");

var _require = require("../middleware/redis"),
    addItemtolist = _require.addItemtolist,
    updateItemtoList = _require.updateItemtoList,
    removeItemtoList = _require.removeItemtoList,
    clientredis = _require.clientredis;

var JWT = require("jsonwebtoken");

var config = require("../config/index");

module.exports = {
  getItem: function getItem(req, res, next) {
    var page, limit, order, sortBy, startIndex, endIndex, results;
    return regeneratorRuntime.async(function getItem$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = parseInt(req.query.page);
            limit = parseInt(req.query.limit);
            order = req.body.order ? req.body.order : "desc";
            sortBy = req.body.sortBy ? req.body.sortBy : "_id";
            startIndex = (page - 1) * limit;
            endIndex = page * limit; // const token=req.headers.authorization.split(" ")[1]
            // const decode=JWT.verify(token,config.secretkey)
            //    const exists=await clientredis.exists(res.users.sub)
            //         if(exists){
            //             clientredis.get(res.users.sub,function(err,data){
            //                 if(err){
            //                     res.status(400).json({msg:err})
            //                 }
            //                 if (data !== null || undefined) {
            //                  res.status(200).json({
            //                      "item":data
            //             })
            //               } 
            //             })
            //         }
            //    let results={}
            //    if(endIndex< Items.countDocuments().exec()){
            //        results.next={
            //            page:page+1,
            //            limit:limit
            //        } 
            //    }
            //    if(startIndex>0){
            //        results.previous={
            //           page:page-1,
            //           limit:limit
            //       } 
            //    }

            _context.next = 8;
            return regeneratorRuntime.awrap(Items.find({
              userid: req.users.sub
            }).sort([[sortBy, order]]) // .populate({path:"image"})
            .limit(limit) // loading 3 trang xong call redis
            .skip(startIndex).exec());

          case 8:
            results = _context.sent;
            // results.img=await itemImage.find({shoppingid:results._id})
            console.log(results);
            res.status(200).json(results);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  addItem: function addItem(req, res, next) {
    var _req$body, description, price, city, quantity, image, user, newItem, result;

    return regeneratorRuntime.async(function addItem$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, description = _req$body.description, price = _req$body.price, city = _req$body.city, quantity = _req$body.quantity, image = _req$body.image;
            console.log(req.users);
            _context2.next = 4;
            return regeneratorRuntime.awrap(User.findById(req.users.sub));

          case 4:
            user = _context2.sent;

            if (!user) {
              res.status(400).json({
                msg: "user not found"
              });
            }

            newItem = new Items({
              description: description,
              price: price,
              city: city,
              quantity: quantity,
              userid: req.users.sub,
              image: image
            });
            _context2.next = 9;
            return regeneratorRuntime.awrap(newItem.save());

          case 9:
            result = _context2.sent;
            res.status(200).json(newItem);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  updateItem: function updateItem(req, res, next) {
    var _req$body2, iditem, userid, item, itemsupdate;

    return regeneratorRuntime.async(function updateItem$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, iditem = _req$body2.iditem, userid = _req$body2.userid;
            _context3.next = 3;
            return regeneratorRuntime.awrap(Items.findOne({
              userid: userid
            }));

          case 3:
            item = _context3.sent;

            if (item) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.json({
              msg: "user not match with any items"
            }));

          case 6:
            _context3.next = 8;
            return regeneratorRuntime.awrap(Items.findByIdAndUpdate(iditem, req.body, {
              "new": true,
              runValidators: true
            }));

          case 8:
            itemsupdate = _context3.sent;
            res.json({
              itemsupdate: itemsupdate
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  deleteItem: function deleteItem(req, res, next) {
    var items;
    return regeneratorRuntime.async(function deleteItem$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(Items.findById(req.body.iditem));

          case 3:
            items = _context4.sent.populate("itemImage");

            if (items) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.json({
              msg: "item not found"
            }));

          case 6:
            if (!(items.userid.toString() == req.body.user.userid.toString())) {
              _context4.next = 9;
              break;
            }

            _context4.next = 9;
            return regeneratorRuntime.awrap(items.remove());

          case 9:
            res.json({
              msg: "remove successful"
            });
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(400).json({
              msg: "not found"
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 12]]);
  },
  uploadImage: function uploadImage(req, res, next) {
    var path, image, newImage, result, itemsupdate;
    return regeneratorRuntime.async(function uploadImage$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            path = req.file.path;
            console.log(path);
            _context5.prev = 2;

            if (path) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              msg: "image null"
            }));

          case 5:
            image = {
              "path": path
            };
            newImage = new itemImage({
              img: path,
              shoppingid: req.body.shoppingid
            });
            _context5.next = 9;
            return regeneratorRuntime.awrap(newImage.save());

          case 9:
            result = _context5.sent;
            _context5.next = 12;
            return regeneratorRuntime.awrap(Items.findByIdAndUpdate(req.body.shoppingid, {
              $push: {
                image: result._id
              }
            }, {
              "new": true,
              runValidators: true,
              useFindAndModify: false
            }));

          case 12:
            itemsupdate = _context5.sent;
            console.log(itemsupdate);

            if (itemsupdate) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("return", res.json({
              msg: "item not found"
            }));

          case 16:
            res.json(result);
            _context5.next = 23;
            break;

          case 19:
            _context5.prev = 19;
            _context5.t0 = _context5["catch"](2);
            console.log(_context5.t0);
            res.status(400).json({
              msg: "no found"
            });

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[2, 19]]);
  },
  deleteImage: function deleteImage(req, res, next) {
    var id, Image;
    return regeneratorRuntime.async(function deleteImage$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.body.id;

            if (id) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.json({
              msg: "pls choice image to delete"
            }));

          case 3:
            _context6.next = 5;
            return regeneratorRuntime.awrap(itemImage.findById(id));

          case 5:
            Image = _context6.sent;

            if (!Image) {
              res.json({
                smg: "image not found"
              });
            }

            _context6.next = 9;
            return regeneratorRuntime.awrap(Image.remove());

          case 9:
            res.json({
              msg: "succesfully"
            });

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    });
  }
};