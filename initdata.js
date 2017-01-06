'use strict';

const Mongoose = require('mongoose');

// require local modules
const Logger = require("./logger");

// require data models 
const UserModel = require("./models/user");

// init data models
const Users = Mongoose.model('Users');

// database connection
connect()
  .on('error', Logger.error)
  .on('disconnected', connect)
  .once('open', main);

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return Mongoose.connect('mongodb://localhost/bihudata', options).connection;
}

function main(){
	Logger.info('start');
	new Users({urlToken:'xi4oz3ro'}).save();
	new Users({urlToken:'wangnuonuo'}).save();
	new Users({urlToken:'gejinyuban'}).save();
	new Users({urlToken:'yolfilm'}).save();
	new Users({urlToken:'ChenZhangyu'}).save();
	new Users({urlToken:'shenbin'}).save();
	new Users({urlToken:'cogito'}).save();
	new Users({urlToken:'jilingbhl'}).save();
	new Users({urlToken:'ma-bo-yong'}).save();
	new Users({urlToken:'xubowen'}).save();
	new Users({urlToken:'excited-vczh'}).save();
	Logger.info('done');
}