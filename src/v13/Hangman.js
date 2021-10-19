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
    if(typeof options.words != 'string') {
        throw new TypeError('Klaymon Err: Words must be an Array');
    }

    if (!options.button) options.button = {};
    if (typeof options.button !== 'object') {
        throw new TypeError('Klaymon Err: button must be an object.');
    }
    if(!options.button.color) options.button.color = "PRIMARY";
    if(typeof options.button.color !== 'string') {
        throw new TypeError("Klaymon Err: Button Color must be a string");
    }

    if (!options.client) {
		throw new Error('Klaymon Err: client argument was not specified.');
	}
	if (typeof options.client !== 'object') {
		throw new TypeError('Klaymon Err: Invalid Discord client was provided.');
	}

    if(!options.winMessage) options.winMessage === "Cool, you saved me."

    if(typeof options.winMessage !== 'string') {
        throw new TypeError('Klaymon Err: Win Message must be a string.');
    }

    if(!options.otherMessage) options.otherMessage === 'Only the {{author}} can use the buttons!'

    if(typeof options.otherMessage !== 'string') {
        throw new TypeError('Klaymon Err: Other Message must be a string.')
    }
    if(!options.looseMessage) options.looseMessage === 'Aight, it seems you lost...'

    if(typeof options.looseMessage !== 'string') {
        throw new TypeError('Klaymon Err: loose Message must be a string.');
    }


  
var stages = [
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
|   o ~ thanks
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
        guesses: []
    };
    game.word = game.randomWords.replace(/./g, '\▁ ');
    let idMessage1, idMessage2;

    const row1 = getRows(['ABCDE', 'FGHIJ', 'KLMNO'], game.style);
    const row2 = getRows(['PQRST', 'UVWXY', '~~Z~~'], game.style);

    options.message.reply({content: stages[0], components: row1})
        .then(message => idMessage1 = message);  
    options.message.channel.send({content: game.word, components: row2})
        .then(message => idMessage2 = message);  

 
    
    if(/(DANGER|PRIMARY|SECONDARY|SUCCESS)/.test(game.style) === false) {
        throw new TypeError('Klaymon Err: Buttons style must be "PRIMARY", "SECONDARY", "SUCCESS" or "DANGER"  ')
    } else if(game.style == "LINK") {
        throw new TypeError('Klaymon Err: Hangman Buttons style must be a non-link style')
    }

    options.client.on("interactionCreate", inter => {
        if(inter.isButton()) {
            if(button.clicker.id !== game.player.id) {
             inter.reply({content: `${options.otherMessage.replace('{{author}}', `<@${button.clicker.id}>`)}`, ephemeral: true})
            }

            if(!searchButton(row1, inter)) searchButton(row2, inter);
            if(game.randomWords.indexOf(inter.customId) === -1) {
                game.mistakes++;
                game.stage++;

                if(!options.mistakesMessage) options.mistakesMessage = `Mistakes: ${game.mistakes}`
                if(typeof options.mistakesMessage != 'string') {
                    throw new TypeError('Klaymon Err: Mistakes message must be a string')
                }
      
                idMessage1.edit({ content: stages[game.stage], components: row1 }); 
                idMessage2.edit({ content: game.word, components: row2 });
                
                if(game.mistakes === game.randomWords.length) { 
                    idMessage1.edit({content: `${options.looseMessage}`})
                    idMessage2.edit({ content: game.randomWords});
                }
                
                return inter.reply({content: options.mistakesMessage.replace(`{{mistakes}}`, game.mistakes), ephemeral: true });
            } else {
                game.guesses.push(inter.customId);
                game.word = game.randomWords.split('').map(l => (game.guesses.indexOf(l) >= 0 ? `${l} ` : '\▁ ')).join('');
                let word = game.word.split('').map(l => l.trim()).join('');

                if(word !== game.randomWords) {
                    if(inter.message.id === idMessage1.id) {
                        idMessage2.edit({ content: game.word, components: row2 });
                        inter.update({ content: stages[game.stage], components: row1 });  

                    } else if(inter.message.id === idMessage2.id) {
                        idMessage1.edit({ content: stages[game.stage], components: row1 });
                        inter.update({ content: game.word, components: row2 });  
                    }    
                } else {
                    let winStage = `${stages[game.stage]} ~ ${options.winMessage}`;

                    idMessage1.edit({ content: winStage });
                } 
            }
        }
    });

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
    let check = false, index = 0;

    row.map(r => {
        const elem = r.components.findIndex(fragola => fragola.customId === inter.customId);

        if(elem !== -1) {
            row[index].components[elem].setDisabled(true);
            return check = true;
        }
        index++;
    });
} 

function disableButtons(rows) {
    let x = 0, y = 0;

    rows.map(row => {
        row.map(ro => {
            ro.map(r => {
                row[x]
            })
        })

        const elem = r.components.findIndex(fragola => fragola.customId === inter.customId);

        if(elem !== -1) {
            row[index].components[elem].setDisabled(true);
            return check = true;
        }
        index++;
    });
}