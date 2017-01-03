'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Cookies Schema
 */

const ArticlesSchema = new Schema({

	lastUpdateTime: {type: Date, default: null },
	updated: { type: Number, default: 0 },
    voting: { type: Number, default: 0 },
    author: {
        avatar_url_template: { type: String, default: '' },
        name: { type: String, default: '' },
        url: { type: String, default: '' },
        url_token: { type: String, default: '' },
        user_type: { type: String, default: '' },
        is_advertiser: { type: Boolean, default: true },
        avatar_url: { type: String, default: '' },
        is_org: { type: Boolean, default: true },
        headline: { type: String, default: '' },
        type: { type: String, default: '' },
        id: { type: String, default: '' }
    },
    created: { type: Number, default: 0 },
    url: { type: String, default: '' },
    comment_permission: { type: String, default: '' },
    collapsed_counts: { type: Number, default: 0 },
    title : { type: String, default: '' },
    excerpt : { type: String, default: '' },
    reviewing_comments_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    image_url: { type: String, default: '' },
    excerpt_title: { type: String, default: '' },
    type: { type: String, default: '' },
    id: { type: Number, default: 0 },
    voteup_count: { type: Number, default: 0 }
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
ArticlesSchema.pre('update', function (next) {
      this.lastUpdateTime = Date.now;
      next();
});
/**
 * Methods
 */

/**
 * Statics
 */

mongoose.model('Articles', ArticlesSchema);