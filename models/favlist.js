'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Cookies Schema
 */

const FavlistsSchema = new Schema({
	answer_count: { type: Number, default: 0 },
	id: { type: Number, default: 0 },
	is_public: { type: Boolean, default: true },
	title: { type: String, default: '' },
	type: { type: String, default: '' },
	updated_time: { type: Number, default: 0 },
	url: { type: String, default: '' },
	follower_count: { type: Number, default: 0 },
	lastUpdateTime: {type: Date, default: null }
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
FavlistsSchema.pre('update', function (next) {
      this.lastUpdateTime = Date.now;
      next();
});
/**
 * Methods
 */

/**
 * Statics
 */

mongoose.model('Favlists', FavlistsSchema);