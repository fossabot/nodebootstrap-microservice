/* jshint -W079 */
const Promise = require('bluebird')
    , config = require('config')
    , log = require('metalogger')()
    , representor = require('representor-serializer')
    , _ = require('lodash');    

var actions = {}
    , Users   = require("users/models/users")
    , model   = new Users();

const responseMediaType = 'application/json';

actions.getUsers = function(req, res, next) {

  model.getUsers().then(function(userRows){

    var response = {};
    response.users = {}; // Representor's root object
    response.users.data = userRows;

    // response = representor(response, responseMediaType);
    // Representor seems to have some bugs. Using just stringify until it gets fixed.
    response = JSON.stringify(response);

    res.set('Content-Type', responseMediaType)
       .status(200)
       .send(response);

  }).catch(function(err) {
    next(err);
  });

};

module.exports = actions;