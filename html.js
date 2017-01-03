'use strict';

const Mongoose = require('mongoose');

// require local modules
const Logger = require("./logger");

// require data models 
const UserModel = require("./models/user");
const AnswerModel = require("./models/answer");
const FavlistsModel = require("./models/favlist");
const ArticleModel = require("./models/article");
const ZhuanlanModel = require("./models/zhuanlan");
const QuestionModel = require("./models/question");

// init data models
const Answers = Mongoose.model('Answers');
const Users = Mongoose.model('Users');
const Favlists = Mongoose.model('Favlists');
const Articles = Mongoose.model('Articles');
const Zhuanlans = Mongoose.model('Zhuanlans');
const Questions = Mongoose.model('Questions');

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
	//top followingCount 
	Answers.find({}).sort({voteup_count:-1}).limit(10).exec(function(err,answers){
		if(err)
			Logger.error(err);
		else{
			Logger.info(answers.length);
			for(var i=0;i<answers.length;i++){
				Logger.info(answers[i].question.title);
				Logger.info(answers[i].voteup_count);
				Logger.info(answers[i].author.name);
			}
		}
	});
}