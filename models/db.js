/**
 * Created by mandy on 16-3-29.
 */
var config = require('../config');
var mongodb = require('mongodb');
var DBConnection = mongodb.Connection;
var DBServer = mongodb.Server;
module.exports = new mongodb.Db(config.db, new DBServer(config.dbHost, config.dbPort), {safe: true});
