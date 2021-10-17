const math = require('mathjs');
const Discord = require('discord.js');
const functions = require('../../functions/function');


module.exports = async (options) => {
	functions.checkForUpdates();
	if (!options.message) {
		throw new Error('Klaymon Err: message argument was not specified.');
	}
	if (typeof options.message !== 'object') {
		throw new TypeError('Klaymon Err: Invalid Discord Message was provided.');
	}

    if (!options.content) {
		throw new Error('Klaymon Err: message content was not specified.');
	}
	if (typeof options.content !== 'string') {
		throw new TypeError('Klaymon Err: Invalid Discord message content was provided.');
	}


const text = options.content

let Rarray = text.split("")
    let reverseArray = Rarray.reverse()
    let result = reverseArray.join("")


options.message.reply(`${result}`)


    
};