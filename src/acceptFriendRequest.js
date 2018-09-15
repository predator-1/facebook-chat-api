"use strict";

var utils = require("../utils");
var log = require("npmlog");

function formatData(obj) {
  if(obj && obj.success){
    return true;
  }
  return false;
}

module.exports = function(defaultFuncs, api, ctx) {
  return function acceptFriendRequest(id, callback) {
    defaultFuncs
      .post(
        "https://www.facebook.com/requests/friends/ajax/",
        ctx.jar,
        { viewer: ctx.userID, action:'confirm', id }
      )
      .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
      .then(function(resData) {
        if (!resData) {
          throw { error: "acceptFriendRequest returned empty object." };
        }
        if (resData.error) {
          throw resData;
        }
        if(callback){
          callback(null, formatData(resData.payload));
        }
      })
      .catch(function(err) {
        log.error("acceptFriendRequest", err);
        return callback(err);
      });
  };
};
