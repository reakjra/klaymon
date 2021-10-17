const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const functions = require('../../functions/function');
const Fetch = require('node-fetch');


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


    if (!options.embed.color) options.embed.color = functions.randomHexColor();
	if (typeof options.embed.color !== 'string') {
		throw new TypeError('Klaymon Err: embed color must be a string.');
	}

    if (!options.embed.timestamp) options.embed.timestamp = true;
	if (typeof options.embed.timestamp !== 'boolean') {
		throw new TypeError('Klaymon Err: timestamp must be a boolean.');
	}
    if (!options.embed.footer) options.embed.footer = true;
	if (typeof options.embed.footer !== 'boolean') {
		throw new TypeError('Klaymon Err: footer must be a boolean.');
	}




    const Reds = [
        "meme"
      
    ];

    const Rads = Reds[Math.floor(Math.random() * Reds.length)];

    const res = await Fetch(`https://www.reddit.com/r/${Rads}/random/.json`);

    const json = await res.json();

    if (!json[0]) return message.reply({embeds: [e_e]})

    const data = json[0].data.children[0].data;

    const Embed = new MessageEmbed()
        .setColor(options.embed.color)
        .setURL(`https://reddit.com${data.permalink}`)
        .setTitle(data.title)
        .setImage(data.url)
        if (options.embed.footer === true) {
            Embed.setFooter(`${data.ups || 0} 👍 | ${data.downs || 0} 👎 | ${data.num_comments || 0} 💬`)
        } else if(options.embed.footer === false) {
            
        }
        
        if (options.embed.timestamp === true) {
            Embed.setTimestamp();
        } else if(options.embed.timestamp === false) {
            
        }


    return options.message.reply({embeds: [Embed]});

    }