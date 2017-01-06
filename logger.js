/*
name: logger.js
author: xi4oz3ro
description: a console logs recorder, show in forever.
*/

var moment = require("moment");
var chalk = require('chalk');

var level = 1;//是否调试状态，调试状态下会显示debug类型的日志

exports.loglevel = function (number) {
    level = number;
}

exports.debug = function (msg) {
    console.log(chalk.gray(' DEBUG ') + moment().format() + " " + msg);
}

exports.info = function (msg) {
    console.log(chalk.gray.bold(' INFO ') + moment().format() + " " + msg);
}

exports.warn = function (msg) {
    console.log(chalk.yellow(' WARNING ') + moment().format() + " " + msg);
}

exports.error = function (msg) {
    console.log(chalk.red(' ERROR ') + moment().format() + " " + msg);
}

exports.fatal = function (msg) {
    console.log(chalk.bgwhite.red(' FATAL ') + moment().format() + " " + msg);
}

exports.success = function (msg) {
    console.log(chalk.green(' SUCCESS ') + moment().format() + " " + msg);
}