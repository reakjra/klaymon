const axios = require('axios');
const chalk = require('chalk');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const words = require('../data/words.json');
const { boxConsole } = require('./boxConsole');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {

	getRandomString: function(length) {
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += randomChars.charAt(
				Math.floor(Math.random() * randomChars.length),
			);
		}
		return result;
	},

	randomHexColor: function() {
		return (
			'#' +
			('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
		);
	},

	checkForUpdates: async function() {
		const package = require('../package.json');
		const vLatest = require('klaymon/package').version;
		if (package.dependencies.klaymon) {
			if (vLatest !== package.dependencies.klaymon.slice(1)) {
				const msg = chalk(
					`new ${chalk.green('version')} of ${chalk.yellow(
						'klaymon',
					)} is available! ${chalk.red(
						package.dependencies.klaymon.slice(1),
					)} -> ${chalk.green(vLatest)}`,
				);
				const tip = chalk(
					`registry ${chalk.cyan('https://www.npmjs.com/package/klaymon')}`,
				);
				const install = chalk(
					`run ${chalk.green('npm i klaymon@latest')} to update`,
				);
				boxConsole([msg, tip, install]);
			}
		} else if (package.devDependencies.klaymon) {
			if (vLatest !== package.devDependencies.klaymon.slice(1)) {
				const msg = chalk(
					`new ${chalk.green('version')} of ${chalk.yellow(
						'klaymon',
					)} is available! ${chalk.red(
						package.devDependencies.klaymon.slice(1),
					)} -> ${chalk.green(vLatest)}`,
				);
				const tip = chalk(
					`registry ${chalk.cyan('https://www.npmjs.com/package/klaymon')}`,
				);
				const install = chalk(
					`run ${chalk.green('npm i klaymon@latest')} to update`,
				);
				boxConsole([msg, tip, install]);
			}
		}
	},
	
};
