'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * User Schema
 */

const UsersSchema = new Schema({ 
  followingCount: { type: Number, default: 0 },
  voteFromCount: { type: Number, default: 0 },
  userType: { type: String, default: '' },
  showSinaWeibo: { type: Boolean, default: false },
  isFollowing: { type: Boolean, default: false },
  markedAnswersText: { type: String, default: '' },
  type: { type: String, default: '' },
  accountStatus: [],
  logsCount: { type: Number, default: 0 },
  id: { type: String, default: '' },
  favoriteCount: { type: Number, default: 0 },
  voteupCount: { type: Number, default: 0 },
  isBlocking: { type: Boolean, default: false },
  followingColumnsCount: { type: Number, default: 0 },
  isForceRenamed: { type: Boolean, default: false },
  thankToCount: { type: Number, default: 0 },
  headline: { type: String, default: '' },
  participatedLiveCount: { type: Number, default: 0 },
  isBindSina: { type: Boolean, default: false },
  followingFavlistsCount: { type: Number, default: 0 },
  favoritedCount: { type: Number, default: 0 },
  allowMessage: { type: Boolean, default: false },
  isOrg: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  followerCount: { type: Number, default: 0 },
  mutualFolloweesCount: { type: Number, default: 0 },
  employments: [{
      job: {
          name: { type: String, default: '' }
      },
      company: {
          name: { type: String, default: '' }
      }
  }],
  badge: [{
      topics: [{
          name: { type: String, default: '' }
      }],
      type: { type: String, default: '' },
      description: { type: String, default: '' }
  }],
  avatarUrlTemplate: { type: String, default: '' },
  followingTopicCount: { type: Number, default: 0 },
  description: { type: String, default: '' },
  business: {
      name: { type: String, default: '' }
  },
  sinaWeiboUrl: { type: String, default: '' },
  isActive: { type: Number, default: 0 },
  coverUrl: { type: String, default: '' },
  locations: [{
      name: { type: String, default: '' }
  }],
  markedAnswersCount: { type: Number, default: 0 },
  answerCount: { type: Number, default: 0 },
  thankFromCount: { type: Number, default: 0 },
  voteToCount: { type: Number, default: 0 },
  educations: [{
      school: {
          name: { type: String, default: '' },
      }
  }],
  urlToken: { type: String, default: '' },
  questionCount: { type: Number, default: 0 },
  articlesCount: { type: Number, default: 0 },
  name: { type: String, default: '' },
  url: { type: String, default: '' },
  gender: { type: Number, default: 0 },
  sinaWeiboName: { type: String, default: '' },
  messageThreadToken: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  followingQuestionCount: { type: Number, default: 0 },
  thankedCount: { type: Number, default: 0 },
  hostedLiveCount: { type: Number, default: 0 },
  lastUpdateTime: { type: Date, default: null },
  uid: { type: String, default: '' },
  hasDetail : { type: Boolean, default: false }
});

/**
 * Validations
 */


/**
 * Pre-save hook
 */


/**
 * Methods
 */

/**
 * Statics
 */

UsersSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  // load: function (options, cb) {
  //   options.select = options.select || 'name username';
  //   return this.findOne(options.criteria)
  //     .select(options.select)
  //     .exec(cb);
  // }
};

mongoose.model('Users', UsersSchema);
