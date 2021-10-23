const Discord = require('discord.js');
const functions = require('../../functions/function');
const words = require('../../data/words.json');

module.exports = async (options) => {
	functions.checkForUpdates();

	if(!options.message) throw new Error('Klaymon Err: message argument was not specified.');
	if(typeof options.message !== 'object') {
		throw new TypeError('Klaymon Err: Invalid Discord Message was provided.');
	}

    if(!options.words) options.words = words[Math.floor(Math.random() * words.length)];
    if(typeof options.words != 'string') {
        throw new TypeError('Klaymon Err: Words must be an Array');
    }

    if(!options.button) options.button = {};
    if(typeof options.button !== 'object') {
        throw new TypeError('Klaymon Err: button must be an object.');
    }

    if(!options.button.color) options.button.color = "PRIMARY";
    if(typeof options.button.color !== 'string') {
        throw new TypeError("Klaymon Err: Button Color must be a string");
    }

    if (!options.client) throw new Error('Klaymon Err: client argument was not specified.');
	if (typeof options.client !== 'object') {
		throw new TypeError('Klaymon Err: Invalid Discord client was provided.');
	}

    if(!options.winMessage) options.winMessage = "Cool, you saved me.";
    if(!options.otherMessage) options.otherMessage = 'Only the {{author}} can use the buttons!';  
    if(!options.looseMessage) options.looseMessage = 'Aight, it seems you lost...';   

    if(!options.mistakesMessage) options.mistakesMessage = `Mistakes: {{mistakes}}`;
    if(typeof options.mistakesMessage != 'string') {
        throw new TypeError('Klaymon Err: Mistakes message must be a string');
    }

    /* if (!options.emoji) options.emoji === true;
	if (typeof options.emoji !== 'boolean') {
		throw new TypeError('Klaymon Err: Emoji options must be a boolean.');
	}

    if(options.emoji === false) {
        throw new ErrorEvent('Klaymon Err: You must choose true. Buttons are not working fine now! Check the new update on npm or in the Discord Server');
    } */

    const stages = [
        `\`\`\`
    /---|
    |   
    |
    |
    |
    \`\`\`
    `,
        `\`\`\`
    /---|
    |   o
    |
    |
    |
    \`\`\`
    `,
        `\`\`\`
    /---|
    |   o
    |   |
    | 
    |
    \`\`\`
    `,
        `\`\`\`
    /---|
    |   o
    |  /|
    |
    |
    \`\`\`
    `,
        `\`\`\`
    /---|
    |   o
    |  /|\\
    |
    |
    \`\`\`
    `,
        `\`\`\`
    /---|
    |   o
    |  /|\\
    |  /
    |
    \`\`\`
    `,
        `\`\`\`
    /---|
    |   o ~ ${options.looseMessage}
    |  /|\\
    |  / \\
    |
    \`\`\`
    `,
    ];

    const game = {
        player: options.message.author,
        style: options.button.color,
        randomWords: options.words,
        mistakes: 0,
        stage: 0,
        guesses: [],
        messages: { }
    };
    game.word = game.randomWords.replace(/./g, '\▁ ');

    const row1 = getRows(['ABCDE', 'FGHIJ', 'KLMNO'], game.style),
        row2 = getRows(['PQRST', 'UVWXY', '~~Z~~'], game.style);

    if(/(DANGER|PRIMARY|SECONDARY|SUCCESS)/.test(game.style) === false) {
        throw new TypeError('Klaymon Err: Buttons style must be "PRIMARY", "SECONDARY", "SUCCESS" or "DANGER"  ');
    } else if(game.style == "LINK") {
        throw new TypeError('Klaymon Err: Hangman Buttons style must be a non-link style');
    }

    options.message.reply({content: stages[0], components: row1})
        .then(message => {
            const collector = message.createMessageComponentCollector({ componentType: 'BUTTON' });
            game.messages.msg1 = message;

            collector.on('collect', inter => hangman(inter));
        });  
    options.message.channel.send({content: game.word, components: row2})
        .then(message => {
            const collector = message.createMessageComponentCollector({ componentType: 'BUTTON' });
            game.messages.msg2 = message;

            collector.on('collect', inter => hangman(inter));
        }); 
    
    function hangman(inter) {
        if(inter.isButton()) {
            if(inter.user.id !== game.player.id) 
                return inter.reply({content: `${options.otherMessage.replace('{{author}}', `<@${game.player.id}>`)}`, ephemeral: true});
            
            const print = printMessage.bind(null, game.messages, [row1, row2]);
            if(!searchButton(row1, inter)) searchButton(row2, inter);
    
            if(game.randomWords.indexOf(inter.customId) === -1) {
                game.mistakes++;
    
                print(stages[++game.stage], game.word);
                if(game.mistakes === stages.length - 1) {
                    disableButtons([row1, row2]);
                    return print(stages[game.stage], game.randomWords);
                }
    
                return inter.reply({content: options.mistakesMessage.replace(`{{mistakes}}`, game.mistakes), ephemeral: true });
            } else {
                game.guesses.push(inter.customId);
                game.word = game.randomWords.split('').map(l => (game.guesses.indexOf(l) >= 0 ? `${l} ` : '\▁ ')).join('');
                let word = game.word.split('').map(l => l.trim()).join('');

                if(word !== game.randomWords) {
                    if(inter.message.id === game.messages.msg1.id) {
                        print(null, game.word);
                        inter.update({ content: stages[game.stage], components: row1 });  
                    } else if(inter.message.id === game.messages.msg2.id) {
                        print(stages[game.stage]);
                        inter.update({ content: game.word, components: row2 });  
                    }    
                } else {
                    disableButtons([row1, row2]);
                    let winStage = `${stages[game.stage].replace(`o`, `o ~ ${options.winMessage}`)}`;

                    print(winStage, game.word);
                }
            }
        }
    }
}

function getRows(arr, style) {
    const rows = [];

    arr.map((item, index) => {
        const row = new Discord.MessageActionRow();

        item.split('').map((it, i) => { 
            const btn = new Discord.MessageButton() 
                .setStyle(style) 
                .setLabel(it)
                .setCustomId(it.toLowerCase());

            if(it === '~')
                btn.setStyle('SECONDARY')
                    .setCustomId(`${it}${i}`)
                    .setDisabled(true);

            row.addComponents(btn); 
        });

        rows.push(row);
    });

    return rows;
}

function searchButton(row, inter) {
    let check = false;

    row.map((r, index) => {
        const elem = r.components.findIndex(fragola => fragola.customId === inter.customId);

        if(elem !== -1) {
            row[index].components[elem].setDisabled(true);
            return check = true;
        }
    });
} 

function disableButtons(rows) {
    rows.map(row => {
        row.map((ro, index) => {
            ro.components.map((r, i) => row[index].components[i].setDisabled(true));
        });
    });
}

function printMessage(message, rows, text1, text2) {
    if(text1) message.msg1.edit({ content: text1, components: rows[0] }); 
    if(text2) message.msg2.edit({ content: text2, components: rows[1] });
}