'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Cookies Schema
 */

const AnswersSchema = new Schema({
  	updated_time: { type: Number, default: 0 },
	author: {
	    avatar_url_template: { type: String, default: '' },
	    name: { type: String, default: '' },
	    avatar_url: { type: String, default: '' },
	    url: { type: String, default: '' },
	    type: { type: String, default: '' },
	    user_type: { type: String, default: '' },
	    is_advertiser: { type: Boolean, default: false },
	    is_org: { type: Boolean, default: false },
	    headline: { type: String, default: '' },
	    url_token: { type: String, default: '' },
	    id: { type: String, default: '' }
	},
	url: { type: String, default: '' },
	question: {
	    url: { type: String, default: '' },
	    type: { type: String, default: '' },
	    id: { type: Number, default: 0 },
	    question_type: { type: String, default: '' },
	    title: { type: String, default: '' }
	},
	collapsed_counts: { type: Number, default: 0 },
	excerpt: { type: String, default: '' },
	suggest_edit: {
	    status: { type: Boolean, default: false },
	    title: { type: String, default: '' },
	    url: { type: String, default: '' },
	    tip: { type: String, default: '' },
	    reason: { type: String, default: '' },
	    unnormal_details: { type: Object, default: null }
	},
	content: { type: String, default: '' },
	reviewing_comments_count: { type: Number, default: 0 },
	comment_count: { type: Number, default: 0 },
	voteup_count: { type: Number, default: 0 },
	created_time: { type: Number, default: 0 },
	type: { type: String, default: '' },
	id: { type: Number, default: 0 },
	is_normal: { type: Boolean, default: false },
	lastUpdateTime: { type: Date, default: null }
});

/**
 * Virtuals
 */

/**
 * Validations
 */

/**
 * Pre-save hook
 */
AnswersSchema.pre('update', function (next) {
      this.lastUpdateTime = Date.now;
      next();
});
/**
 * Methods
 */

/**
 * Statics
 */

mongoose.model('Answers', AnswersSchema);