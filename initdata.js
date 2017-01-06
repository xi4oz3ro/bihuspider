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
	new Users({id:'f5f5f1108e224941ed031f90d0682b7e',urlToken:'xi4oz3ro'}).save();
	new Users({id:'491b1dc31ed6c376323c2fe5f643f650',urlToken:'wangnuonuo'}).save();
	new Users({id:'2d6717f820b2fc9e6450b0a3ff7542eb',urlToken:'gejinyuban'}).save();
	new Users({id:'28bb2b6ff09a5072198351434ab2efff',urlToken:'yolfilm'}).save();
	new Users({id:'b53bbee118a6db4d51c98060abd833cd',urlToken:'ChenZhangyu'}).save();
	new Users({id:'493bf746f5d3c535bcd93a37dc642194',urlToken:'shenbin'}).save();
	new Users({id:'bbc67edfb68954f7390370d4f895a32a',urlToken:'cogito'}).save();
	new Users({id:'7806a9a8bcca9208159b585fe678e3bf',urlToken:'jilingbhl'}).save();
	new Users({id:'f35fcb19ea50373fc10f2219f4a12754',urlToken:'ma-bo-yong'}).save();
	new Users({id:'a6facc27bb5aa01e9ad9cc3aa6b897dc',urlToken:'xubowen'}).save();
	new Users({id:'0970f947b898ecc0ec035f9126dd4e08',urlToken:'excited-vczh'}).save();
	Logger.info('done');
}