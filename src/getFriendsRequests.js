"use strict";

var cheerio = require("cheerio");
var utils = require("../utils");
var log = require("npmlog");

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function formatData(obj) {
  if(obj.length > 0){
    if(obj[0].length > 0){
      let htmlObj = obj[0][obj[0].length-1];
      if(htmlObj.__html){
        let matches = htmlObj.__html.match(/[0-9]+_1_req/ig);
        if(matches && matches.length && matches.length > 0){
          let uniques = matches.filter( onlyUnique );
          return uniques.map(function(key) {
            return key.replace('_1_req', '');
          });
        }
      }
    }
    return null;
  }
}

module.exports = function(defaultFuncs, api, ctx) {
  return function getFriendsRequests(callback) {
    if (!callback) {
      throw { error: "getFriendsRequests: need callback" };
    }

    defaultFuncs
      .post(
        "https://www.facebook.com/ajax/requests/loader/",
        ctx.jar,
        null
      )
      .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
      .then(function(resData) {
        if (!resData) {
          throw { error: "getFriendsRequests returned empty object." };
        }
        if (resData.error) {
          throw resData;
        }
        callback(null, formatData(resData.domops));
      })
      .catch(function(err) {
        log.error("getFriendsRequests", err);
        return callback(err);
      });
  };
};