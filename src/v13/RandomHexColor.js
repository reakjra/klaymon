const math = require('mathjs');
const Discord = require('discord.js');
const functions = require('../../functions/function');
const { createCanvas } = require('canvas');


module.exports = async (options) => {
	functions.checkForUpdates();
	if (!options.message) {
		throw new Error('Klaymon Err: message argument was not specified.');
	}
	if (typeof options.message !== 'object') {
		throw new TypeError('Klaymon Err: Invalid Discord Message was provided.');
	}

	if(!options.embed) options.embed = {};
	if(typeof options.embed !== 'object') {
		throw new TypeError('Klaymon Err: Embed must be a object.')
	}


    const canvas = createCanvas(256, 125);
	const ctx = canvas.getContext('2d');
	const hex = functions.randomHexColor();
	ctx.fillStyle = hex;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    

	if(!options.embed.color) options.embed.color = hex;
	if(typeof options.embed.color !== 'string') {
		throw new TypeError('Klaymon Err: Embed color must be a string.')
	}

if(!options.embed.footer) options.embed.footer = `© Klaymon Development`
if(typeof options.embed.footer !== "string") {
	throw new TypeError(`Klaymon Err: Embed footer must be a string.`)
}




	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'hex.png');
	const Embed = new Discord.MessageEmbed()
		.setColor(`${options.embed.color.replace(`{{hexColor}}`, hex)}`)
		.setDescription(`**Hex**\n${hex}`)
		.setImage('attachment://hex.png')
	    .setFooter(`${options.embed.footer}`)
		

	return options.message.reply({embeds: [Embed], files: [attachment]});
	
};