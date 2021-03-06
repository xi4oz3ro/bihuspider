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
	lastUpdateTime: { type: Number, default: 0 },
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
/**
 * Methods
 */

/**
 * Statics
 */

mongoose.model('Questions', QuestionsSchema);