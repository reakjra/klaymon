const urban = require('relevant-urban'); // -- ALL RIGHT RESERVED TO RELEVANT-URBAN
const { MessageEmbed } = require('discord.js');
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

    if (!options.embed) options.embed = {};
	if (typeof options.embed !== 'object') {
		throw new TypeError('Klaymon Err: embed must be an object.');
	}
	if (!options.notFound) {
		options.notFound =
			'The search query was not found.';
	}
    if (typeof options.notFound !== 'string') {
		throw new TypeError('Klaymon Err: NotFound message must be a string.');
	}

    if (!options.embed.color) {
		options.embed.color = functions.randomHexColor();
	} if (typeof options.embed.color !== 'string') {
		throw new TypeError('Klaymon Err: Embed color must be a string.');
	}


    
	if (!options.embed.footer) {
		options.embed.footer = '©️ Klaymon Development';
	}
    if (typeof options.embed.footer !== 'string') {
		throw new TypeError('Klaymon Err: Embed footer must be a string.');
	}



    if (!options.query) {
		throw new Error('Klaymon Err: query was not specified.');
	}
	if (typeof options.query !== 'string') {
		throw new TypeError('Klaymon Err: Invalid query was provided.');
	}
	if (!options.embed.timestamp) {
		options.embed.timestamp = true;
	}
	if (typeof options.embed.timestamp !== 'boolean') {
		throw new TypeError('Klaymon err: Timestamp must be a boolean.');
	}




try {

const query = options.query

const not_found = new MessageEmbed()
.setDescription(`${options.notFound}`)
.setColor(`${options.embed.color}`)


let res = await urban(query)
if (!res) return options.message.reply({embeds: [not_found]})
let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

let Embed = new MessageEmbed()
    .setColor(`${options.embed.color}`)
    .setAuthor(`Word - ${word}`)
    .setDescription(`**Defintion:**\n*${definition || "No definition"}*\n\n**Example:**\n*${example || "No Example"}*`)
    .addField('**Rating:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`)
    .addField("**Link**",  `[link to ${word}](${urbanURL})`)
    .addField("**Author:**", `${author || "unknown"}`)
    .setFooter(`${options.embed.footer}`)
    if (options.embed.timestamp === true) {
		Embed.setTimestamp();
	} else {
return;
	}

options.message.reply({embeds: [Embed]})

} catch(err) {
	console.log(err)
}


    
};