'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Cookies Schema
 */

const ZhuanlansSchema = new Schema({
	lastUpdateTime: { type: Number, default: 0 },
	updated: { type: Number, default: 0 },
    title: { type: String, default: '' },
    url: { type: String, default: '' },
    comment_permission: { type: String, default: '' },
    author: {
        avatar_url_template: { type: String, default: '' },
        name: { type: String, default: '' },
        url: { type: String, default: '' },
        type: { type: String, default: '' },
        user_type: { type: String, default: '' },
        url_token: { type: String, default: '' },
        is_advertiser: { type: Boolean, default: true },
        avatar_url: { type: String, default: '' },
        is_org: { type: Boolean, default: true },
        headline: { type: String, default: '' },
        id: { type: String, default: '' }
    },
    intro: { type: String, default: '' },
    image_url: { type: String, default: '' },
    followers: { type: Number, default: 0 },
    type: { type: String, default: '' },
    id: { type: String, default: '' },
    articles_count: { type: Number, default: 0 },
    last_article: {
        updated: { type: Number, default: 0 },
        created: { type: Number, default: 0 },
        url: { type: String, default: '' },
        comment_permission: { type: String, default: '' },
        author: {
            avatar_url_template: { type: String, default: '' },
	        name: { type: String, default: '' },
	        url: { type: String, default: '' },
	        type: { type: String, default: '' },
	        user_type: { type: String, default: '' },
	        url_token: { type: String, default: '' },
	        is_advertiser: { type: Boolean, default: true },
	        avatar_url: { type: String, default: '' },
	        is_org: { type: Boolean, default: true },
	        headline: { type: String, default: '' },
	        id: { type: String, default: '' }
        },
        excerpt: { type: String, default: '' },
        image_url: { type: String, default: '' },
        title: { type: String, default: '' },
        excerpt_title: { type: String, default: '' },
        type: { type: String, default: '' },
        id: { type: Number, default: 0 }
    }
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
/**
 * Methods
 */

/**
 * Statics
 */

mongoose.model('Zhuanlans', ZhuanlansSchema);