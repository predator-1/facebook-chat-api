"use strict";

var utils = require("../utils");
var log = require("npmlog");

module.exports = function(defaultFuncs, api, ctx) {
  return function deleteFromFriends(id, callback) {
    defaultFuncs
      .post(
        "https://www.facebook.com/ajax/profile/removefriendconfirm.php",
        ctx.jar,
        { uid:id }
      )
      .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
      .then(function(resData) {
        if (!resData) {
          throw { error: "deleteFromFriends returned empty object." };
        }
        if (resData.error) {
          throw resData;
        }
        if(callback){
          callback(null, true);
        }
      })
      .catch(function(err) {
        log.error("deleteFromFriends", err);
        return callback(err);
      });
  };
};
