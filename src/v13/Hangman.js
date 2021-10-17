const Discord = require('discord.js');
const functions = require('../../functions/function');
const words = require('../../data/words.json');

module.exports = async (options) => {
	functions.checkForUpdates();
	if (!options.message) {
		throw new Error('Klaymon Err: message argument was not specified.');
	}
	if (typeof options.message !== 'object') {
		throw new TypeError('Klaymon Err: Invalid Discord Message was provided.');
	}

    if(!options.words) options.words = words[Math.floor(Math.random() * words.length)];

    if(typeof options.words != 'object') {
    throw new TypeError('Klaymon Err: Words must be an Array')
}


    const randomWords = options.words

    const rows = [];
    'abcdefghijklmnopqrstuvwxyz'.split('').map((item, index) => {
        const r
    });
}