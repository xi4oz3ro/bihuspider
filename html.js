'use strict';

const fs = require('fs');

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

const PATH = "./htmls/";
const SUBFIX = ".js";
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
	// Answers.find({}).sort({voteup_count:-1}).limit(10).exec(function(err,answers){
	// 	if(err)
	// 		Logger.error(err);
	// 	else{
	// 		Logger.info(answers.length);
	// 		for(var i=0;i<answers.length;i++){
	// 			Logger.info(answers[i].question.title);
	// 			Logger.info(answers[i].voteup_count);
	// 			Logger.info(answers[i].author.name);
	// 		}
	// 	}
	// });

	// region USERS

	// top thankedCount users
	Users.find({}).sort({thankedCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_thanked_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});
	// top followerCount users 
	Users.find({}).sort({followerCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_follower_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top voteupCount users 
	Users.find({}).sort({voteupCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_voteup_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top favoritedCount users 
	Users.find({}).sort({favoritedCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_favorited_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top articlesCount users 
	Users.find({}).sort({articlesCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_articles_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top questionCount users 
	Users.find({}).sort({questionCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_question_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top answerCount users 
	Users.find({}).sort({answerCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_answer_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top markedAnswersCount users 
	Users.find({}).sort({markedAnswersCount:-1}).limit(255).exec(function(err,users){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'users/' + 'top_markedanswers_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(users)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});
	// endregion USERS

	// region ANSWERS

	// top voteup_count answers
	Answers.find({},'-content').sort({voteup_count:-1}).limit(255).exec(function(err,answers){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'answers/' + 'top_voteup_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(answers)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top comment_count answers
	Answers.find({},'-content').sort({comment_count:-1}).limit(255).exec(function(err,answers){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'answers/' + 'top_comment_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(answers)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// endregion ANSWERS

	// top follower_count favlists
	Favlists.find({}).sort({follower_count:-1}).limit(255).exec(function(err,favlists){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'favlists/' + 'top_follower_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(favlists)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top followers zhuanlans
	Zhuanlans.find({}).sort({followers:-1}).limit(255).exec(function(err,zhuanlans){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'zhuanlans/' + 'top_followers_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(zhuanlans)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top voteup_count aticles
	Articles.find({}).sort({voteup_count:-1}).limit(255).exec(function(err,aticles){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'aticles/' + 'top_voteup_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(aticles)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top comment_count aticles
	Articles.find({}).sort({comment_count:-1}).limit(255).exec(function(err,aticles){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'aticles/' + 'top_comment_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(aticles)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top follower_count questions
	Questions.find({}).sort({follower_count:-1}).limit(255).exec(function(err,questions){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'questions/' + 'top_follower_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(questions)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});

	// top answer_count questions
	Questions.find({}).sort({answer_count:-1}).limit(255).exec(function(err,questions){
		if (err)
			Logger.error(err);
		else{
			var file = PATH + 'questions/' + 'top_answer_count' + SUBFIX;
			var data = 'var ____data_='+JSON.stringify(questions)+';';
			fs.writeFile(file,data,'utf-8',function(err){
				if(err){
					Logger.error('write file ['+file+'] error: '+err);
				}
			});
		}
	});
}