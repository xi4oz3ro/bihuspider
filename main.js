'use strict';


// require modules
const Crawler = require('crawler');
const Url = require('url');
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

// spider URLs
const APIURL = 'https://www.zhihu.com/api/v4/members/';
const PageURL = 'https://www.zhihu.com/people/';

const PageNode = {
	'following' : '/following'
};
const ApiNode = {
	'followees' : '/followees?include=data%5B*%5D.answer_count%2Carticles_count%2Cfollower_count%2Cis_followed%2Cis_following%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&limit=10&offset=',
	'answers' : '/answers?include=data%5B*%5D.is_normal%2Csuggest_edit%2Ccomment_count%2Ccollapsed_counts%2Creviewing_comments_count%2Ccan_comment%2Ccontent%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Cmark_infos%2Ccreated_time%2Cupdated_time%2Crelationship.voting%2Cis_author%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&limit=10&sort_by=voteups&offset=',
	'favlists' : '/favlists?include=data%5B*%5D.updated_time%2Cfollower_count%2Canswer_count%2Cis_public&limit=10&offset=',
	'articles' : '/articles?include=data%5B*%5D.comment_count%2Ccollapsed_counts%2Creviewing_comments_count%2Ccan_comment%2Ccomment_permission%2Ccontent%2Cvoteup_count%2Ccreated%2Cupdated%2Cupvoted_followees%2Cvoting%3Bdata%5B*%5D.author.badge%5B%3F(type%3Dbest_answerer)%5D.topics&limit=10&sort_by=voteups&offset=',
	'columns' : '/following-columns?include=data%5B*%5D.intro%2Cfollowers%2Carticles_count%2Cimage_url%2Cis_following%2Clast_article.created&limit=10&offset=',
	'questions' : '/following-questions?include=data%5B*%5D.created%2Canswer_count%2Cfollower_count%2Cis_anonymous&limit=10&offset='
};


// config parameters
const PageHeaders = {
	'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'Accept-Encoding':'gzip, deflate, sdch, br',
	'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
	'Cache-Control':'max-age=0',
	'Connection':'keep-alive',
	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.11 Safari/537.36',
	'Cookie': 'z_c0="Mi4wQUFEQVZ2RXBBQUFBZ0lKTXpzcjRDaGNBQUFCaEFsVk52d3VMV0FDNVoxMHRWWmplblVCZUpUU291ckl4bUlLUHFB|1482915525|9bf3b2897c04f684c3e085e22027a08bcde4caa3";login="Njk3ZGZhMTQ1OGIwNDg2NTk2MWQ1YWZlMzViYmE0ZTY=|1480911237|e831934328421f27e666c4da360548324ff4c181";'
}; 
const APIHeaders = {
	'Accept':'*/*',
	'Accept-Encoding':'gzip, deflate, sdch, br',
	'Accept-Language':'en-US,en;q=0.8',
	'Connection':'keep-alive',
	'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36',
	'authorization': 'Bearer Mi4wQUFEQVZ2RXBBQUFBZ0lKTXpzcjRDaGNBQUFCaEFsVk52d3VMV0FDNVoxMHRWWmplblVCZUpUU291ckl4bUlLUHFB|1482915525|9bf3b2897c04f684c3e085e22027a08bcde4caa3'
};

// user detail crawler
const PageCrawler = new Crawler({
    maxConnections : 1,
	rateLimit:5000,
    callback : function (error, res, done) {
    	var url = res.options.uri;
        var target = url.split('/')[4];
        if(error){
            Logger.error('Get User Detail [ '+ target +' ] ERROR: '+err);
            return ;
        }
    	try{
    		Logger.info('Get User Detail : '+ target);
    		var $ = res.$;
			var str = $('#data').attr('data-state').replace('&quot;','"');
			var data = JSON.parse(str);
			for (var u in data.entities.users){
				if(u==target){
					var userdetail = data.entities.users[u];
					userdetail.uid = u;
					Logger.info('Get User DATA : '+ target);
					saveUserDetail(userdetail);
					// get user following users
					getFollowees(target,userdetail.followingCount);
					// get user answers 
					getAnswers(target,userdetail.answerCount);
					// get user favlists
					getFavlists(target,userdetail.favoriteCount);

					getArticles(target,userdetail.articlesCount);

					getZhuanlans(target,userdetail.followingColumnsCount);

					getQuestions(target,userdetail.followingQuestionCount);
				}
			}
    	}catch(e){
    		Logger.error('Get User Detail [ '+ target +' ] ERROR: '+e);
    	}finally{
    		done();
    	}
    }
});

// api crawler
const APICrawler = new Crawler({
    maxConnections : 1,
	rateLimit:1000,
    callback : function (error, res, done) {
    	var url = res.options.uri.substr(0,res.options.uri.indexOf('?')).split('/');
        var target = url[6];
        var path = url[7];
        if(error){
            Logger.error('Get API [ '+ target +' ] [ '+ path +' ] ERROR: '+err);
        	return ;
        }
        try{
        	var result = JSON.parse(res.body);Date
			for (var i=0;i<result.data.length;i++) {
				if(path=='followees'){
					saveUser(result.data[i]);
				}else if(path=='answers'){
					saveAnswer(result.data[i]);
				}else if(path=='favlists'){
					saveFavlist(result.data[i]);
				}else if(path=='articles'){
					saveArticle(result.data[i]);
				}else if(path=='following-columns'){
					saveZhuanlan(result.data[i]);
				}else if(path=='following-questions'){
					saveQuestion(result.data[i]);
				}
			}
        }catch(e){
        	Logger.error('Get API [ '+ target +' ] [ '+ path +' ] ERROR: '+e);
        }finally{
        	done();
        }
    }
});

// database connection
connect()
  .on('error', Logger.error)
  .on('disconnected', connect)
  .once('open', main);

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return Mongoose.connect('mongodb://localhost/bihudata', options).connection;
}

// main function
function main(){
	Logger.info('==============spider start==============');
	Users.find({hasDetail:false},'id urlToken',null,function(err,names){
		for (var i=0;i<names.length;i++) {
			PageCrawler.queue({
				uri:PageURL+names[i].urlToken+PageNode.following,
				headers:PageHeaders,
				limiter:'Page'
			});
		}
	});
}

function getFollowees(name,total){
	for (var i= 0;i<total;i=i+10) {
		APICrawler.queue({
			uri:APIURL+name+ApiNode.followees+i,
			headers:APIHeaders,
			limiter:'API',
			jQuery: false
		});
	}
}

function getAnswers(name,total){
	for (var i= 0;i<total;i=i+10) {
		APICrawler.queue({
			uri:APIURL+name+ApiNode.answers+i,
			headers:APIHeaders,
			limiter:'API',
			jQuery: false
		});
	}
}

function getFavlists(name,total){
	for (var i= 0;i<total;i=i+10) {
		APICrawler.queue({
			uri:APIURL+name+ApiNode.favlists+i,
			headers:APIHeaders,
			limiter:'API',
			jQuery: false
		});
	}
}

function getArticles(name,total){
	for (var i= 0;i<total;i=i+10) {
		APICrawler.queue({
			uri:APIURL+name+ApiNode.articles+i,
			headers:APIHeaders,
			limiter:'API',
			jQuery: false
		});
	}
}

function getZhuanlans(name,total){
	for (var i= 0;i<total;i=i+10) {
		APICrawler.queue({
			uri:APIURL+name+ApiNode.columns+i,
			headers:APIHeaders,
			limiter:'API',
			jQuery: false
		});
	}
}

function getQuestions(name,total){
	for (var i= 0;i<total;i=i+10) {
		APICrawler.queue({
			uri:APIURL+name+ApiNode.questions+i,
			headers:APIHeaders,
			limiter:'API',
			jQuery: false
		});
	}
}

function saveUserDetail(userdetail){
	userdetail.hasDetail = true;
	Users.findOne({id:userdetail.id},function(err,user){
		if(err){
			Logger.error('Save User Detail [ '+ userdetail.urlToken +' ] ERROR: '+err);
		}else{
			if (user) {
				Logger.info('SAVE User Detail (Update) ' + userdetail.urlToken);
				userdetail.lastUpdateTime = new Date();
				user.update(userdetail);
			}else{
				Logger.info('SAVE User Detail (Add) ' + userdetail.urlToken);
				new Users(userdetail).save();
			}
		}
	});
}

function saveUser(userdata){
	if(userdata.follower_count>999){
		userdata.urlToken = userdata.url_token;
		userdata.uid = userdata.url_token;
		Users.findOne({id:userdata.id},function(err,user){
			if(err){
				Logger.error('Save User Data [ '+ userdata.urlToken+' ] ERROR: '+err);
			}else{
				if (user==null){
					Logger.info('Save User Data (Add) ' + userdata.urlToken);
					new Users(userdata).save();
				}
			}
		});
	}
}

function saveAnswer(answerData){
	if(answerData.voteup_count>99){
		Answers.findOne({id:answerData.id},function(err,answer){
			if(err){
				Logger.error('Save Answer [ '+ answerData.id+' ] ERROR: '+err);
			}else{
				if (answer) {
					Logger.info('UPDATE Answer ' + answerData.id);
					answerData.lastUpdateTime = new Date();
					answer.update(answerData);
				}else{
					Logger.info('Add Answer ' + answerData.id);
					new Answers(answerData).save();
				}
			}
		});
	}
}

function saveFavlist(favlistData){
	if(favlistData.answer_count>0 && favlistData.follower_count>99){
		Favlists.findOne({id:favlistData.id},function(err,favlist){
			if(err){
				Logger.error('Save Favlist [ '+ favlistData.id+' ] ERROR: '+err);
			}else{
				if (favlist) {
					Logger.info('UPDATE Favlist ' + favlistData.id);
					favlistData.lastUpdateTime = new Date();
					favlist.update(favlistData);
				}else{
					Logger.info('Add Favlist ' + favlistData.id);
					new Favlists(favlistData).save();
				}
			}
		});
	}
}

function saveArticle(articleData){
	if(articleData.voteup_count>99){
		Articles.findOne({id:articleData.id},function(err,article){
			if (err) {
				Logger.error('Save Article [ '+ articleData.id+' ] ERROR: '+err);
			}else{
				if(article){
					Logger.info('UPDATE Article ' + articleData.id);
					articleData.lastUpdateTime = new Date();
					article.update(articleData);
				}else{
					Logger.info('Add Article ' + articleData.id);
					new Articles(articleData).save();
				}
			}
		});
	}
}

function saveZhuanlan(zhuanlanData){
	if(zhuanlanData.followers>99){
		Zhuanlans.findOne({id:zhuanlanData.id},function(err,zhuanlan){
			if (err) {
				Logger.error('Save Zhuanlan [ '+ zhuanlanData.id+' ] ERROR: '+err);
			}else{
				if(zhuanlan){
					Logger.info('UPDATE Zhuanlan ' + zhuanlanData.id);
					zhuanlanData.lastUpdateTime = new Date();
					zhuanlan.update(zhuanlanData);
				}else{
					Logger.info('Add Zhuanlan ' + zhuanlanData.id);
					new Zhuanlans(zhuanlanData).save();
				}
			}
		});
	}
}

function saveQuestion(questionData){
	if(questionData.follower_count>99){
		Questions.findOne({id:questionData.id},function(err,question){
			if (err) {
				Logger.error('Save Question [ '+ questionData.id+' ] ERROR: '+err);
			}else{
				if(question){
					Logger.info('UPDATE Question ' + questionData.id);
					questionData.lastUpdateTime = new Date();
					question.update(questionData);
				}else{
					Logger.info('Add Question ' + questionData.id);
					new Questions(questionData).save();
				}
			}
		});
	}
}