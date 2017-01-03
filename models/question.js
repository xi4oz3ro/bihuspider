'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Cookies Schema
 */

const QuestionsSchema = new Schema({
	lastUpdateTime: {type: Date, default: null },
	created: { type: Number, default: 0 },
    url: { type: String, default: '' },
    title: { type: String, default: '' },
    answer_count: { type: Number, default: 0 },
    question_type: { type: String, default: '' },
    follower_count: { type: Number, default: 0 },
    type: { type: String, default: '' },
    id: { type: Number, default: 0 }
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
QuestionsSchema.pre('update', function (next) {
      this.lastUpdateTime = Date.now;
      next();
});
/**
 * Methods
 */

/**
 * Statics
 */

mongoose.model('Questions', QuestionsSchema);