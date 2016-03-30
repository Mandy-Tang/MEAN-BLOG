/**
 * Created by mandy on 16-3-29.
 */
var mongodb = require('./db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
};

/*
 * save user to db
 */
User.prototype.save = function(callback) {
  // use data that will be saved
  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };
  // open db
  mongodb.open(function (err, db) {
    // error handle
    if (err) {
      return callback(err);
    }
    // read users collection
    db.collection('users', function (err, collection) {
      // error handle
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // insert user to users collection
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        mongodb.close();
        // error handle
        if (err) {
          return callback(err);
        }
        // success handle: set the error null and return the user
        callback(null, user[0]);
      });
    });
  });
};

/*
 * get user data
 */
User.get = function(name, callback) {
  // open db
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    // read users collection
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, user);
      });
    });
  });
};

module.exports = User;
