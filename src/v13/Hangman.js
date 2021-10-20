const Discord = require('discord.js');
const functions = require('../../functions/function');
const words = require('../../data/words.json');

module.exports = async (options) => {
	functions.checkForUpdates();
    /*
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

    if(!options.winMessage) {
        options.winMessage = "Cool, you saved me.";
    }
    if(!options.otherMessage) {
        options.otherMessage = 'Only the {{author}} can use the buttons!';
    }
    if(!options.looseMessage) { 
        options.looseMessage = 'Aight, it seems you lost...';   
    } 

    if (!options.emoji) options.emoji === true
	if (typeof options.emoji !== 'boolean') {
		throw new TypeError('Klaymon Err: Emoji options must be a boolean.');
	}

    if(options.emoji === false) {
        throw new ErrorEvent('Klaymon Err: You must choose true. Buttons are not working fine now! Check the new update on npm or in the Discord Server')
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
        guesses: [],
        messages: { }
    };
    game.word = game.randomWords.replace(/./g, '\▁ ');
    console.log(game.player);
    const row1 = getRows(['ABCDE', 'FGHIJ', 'KLMNO'], game.style),
        row2 = getRows(['PQRST', 'UVWXY', '~~Z~~'], game.style);

    options.message.reply({content: stages[0], components: row1})
        .then(message => game.messages.msg1 = message);  
    options.message.channel.send({content: game.word, components: row2})
        .then(message => game.messages.msg2 = message);  

 
    
    if(/(DANGER|PRIMARY|SECONDARY|SUCCESS)/.test(game.style) === false) {
        throw new TypeError('Klaymon Err: Buttons style must be "PRIMARY", "SECONDARY", "SUCCESS" or "DANGER"  ');
    } else if(game.style == "LINK") {
        throw new TypeError('Klaymon Err: Hangman Buttons style must be a non-link style');
    }

    options.client.on("interactionCreate", inter => { //questo codice fa schiofo -LyoeX (fatto da me ovviamente) / <---- bugie
        if(inter.isButton()) {
            if(inter.user.id !== game.player.id) {
                return inter.reply({content: `${options.otherMessage.replace('{{author}}', `<@${inter.user.id}>`)}`, ephemeral: true})
            }

            const print = printMessage.bind(null, game.messages, [row1, row2]);
            if(!searchButton(row1, inter)) searchButton(row2, inter);
            if(game.randomWords.indexOf(inter.customId) === -1) {
                game.mistakes++;
                game.stage++;

                if(!options.mistakesMessage) options.mistakesMessage = `Mistakes: ${game.mistakes}`;
                if(typeof options.mistakesMessage != 'string') {
                    throw new TypeError('Klaymon Err: Mistakes message must be a string');
                }
                
                print(stages[game.stage], game.word);         
                if(game.mistakes === stages.length - 1) {
                    disableButtons([row1, row2]);
                    print(`${options.looseMessage}`, game.randomWords);
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
                    let winStage = `${stages[game.stage]} ~ ${options.winMessage}`;

                    print(winStage, game.word);
                } 
            }
        }
    });
*/


//    if(options.emoji === true) {


    if(!options.winMessage) 
        options.winMessage = "Cool, you saved me.";
    


    if(!options.looseMessage) options.looseMessage = 'Aight, it seems you lost...';   
    if(typeof options.looseMessage != "string") {
        throw new TypeError('Klaymon Err: Loose message must be a string.')
    }

    if(typeof options.winMessage != "string") {
        throw new TypeError('Klaymon Err: Win message must be a string.')
    }




         /**
     * @name hangman
     * @kind constructor
     * @param {Object} options options
     * @param {String} [options.channelID] channel to send to (channel.id)
     * @param {any} [options.message] parameter used for message event
     * @param {String} [options.permission] required permission to use this command
     * @param {String} [options.word] word that needed to be guessed
     * @param {any} [options.client] client used to defined Discord.Client
     * @description Easy and simple hangman game!
     */
   
    
        
    
        if (!options.message)
            throw new TypeError(
                "Klaymon Err: Message parameter was not specified."
            );

            if (typeof options.message !== "object")
            throw new TypeError("Klaymon Err: Message Parameter must be an object.");

            if (!options.channelID) options.channelID = options.message.channel.id

            if (typeof options.channelID !== "string")
            throw new TypeError("Klaymon Err: Channel Id must be a string.");


        if (!options.word) options.word = words[Math.floor(Math.random() * words.length)];
           
        if (!options.client)
            throw new TypeError(
                "Klaymon Err: The Discord Client is a required argument."
            );

           if(typeof options.client != "object") {
               throw new TypeError('Klaymon Err: Discord Client argument must be an object.')
           }



if(!options.otherMessage) options.otherMessage = `Only {{author}} can use the emojis.`

if(typeof options.otherMessage != "string") {
    throw new TypeError('Klaymon Err: Other Message argument must be a string.')
}



if(!options.onlyAuthor) options.onlyAuthor = false

if(typeof options.onlyAuthor != "boolean") {
    throw new TypeError('Klaymon Err: Only author argument must be a boolean.')
}

           




        this.message = options.message;
        this.channel = this.message.guild.channels.cache.get(options.channelID);
        this.args = options.args;
        this.permission = options.permission;
        this.word = options.word.toLowerCase().replace(/[^a-z\s:]/g, "");
        this.client = options.client;
    




        var letters = [
            "🇦",
            "🇧",
            "🇨",
            "🇩",
            "🇪",
            "🇫",
            "🇬",
            "🇭",
            "🇮",
            "🇯",
            "🇰",
            "🇱",
            "🇲",
            "🇳",
            "🇴",
            "🇵",
            "🇶",
            "🇷",
            "🇸",
            "🇹",
            "🇺",
            "🇻",
            "🇼",
            "🇽",
            "🇾",
            "🇿",
        ];
        var unicode = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
        ];
        var games = [];

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
      |   o ~ ${options.looseMessage}
      |  /|\\
      |  / \\
      |
      \`\`\`
      `,
        ];
        function generateMessage(phrase, guesses) {
            var s = "";
            for (var i = 0; i < phrase.length; i++) {
                if (phrase[i] == " ") s += " ";
                else {
                    var c = phrase[i];
                    if (guesses.indexOf(c) == -1) c = "\\_";
                    s += "__" + c + "__ ";
                }
            }
            return s;
        }
        function nextLetter(message, index, word) {
            message.react(letters[index]).then((r) => {
                index++;
                if (index < letters.length) {
                    if (index == 13) {
                        message.channel
                            .send(generateMessage(word, []))
                            .then((m) => {
                                games.push({
                                    stage: 0,
                                    msg0: message,
                                    msg1: m,
                                    phrase: word,
                                    guesses: [],
                                });
                                nextLetter(m, index);
                            });
                    } else {
                        nextLetter(message, index, word);
                    }
                }
            });
        }

        options.client.on("messageReactionAdd", (reaction, user) => {
            var msg = reaction.message;
            if (!user.bot) {

                if(options.onlyAuthor === true) {
                if(user.id !== options.message.author.id) return options.message.reply({content: `${options.otherMessage.replace(`{{author}}`, `<@${options.message.author.id}>`)}`, ephemeral: true})
                reaction.users.remove(user.id)
                }
                for (var i = 0; i < games.length; i++) {
                    var game = games[i];
                    if (
                        (msg.id == game.msg0.id || msg.id == game.msg1.id) &&
                        game.stage < stages.length
                    ) {
                        var letter =
                            unicode[letters.indexOf(reaction.emoji.name)];

                        reaction.users.fetch().then((usrs) => {
                            var reactors = Array.from(usrs);
                            var remove_next = function (index) {
                                if (index < reactors.length)
                                    reaction
                                        .remove(reactors[index])
                                        .then(() => remove_next(index + 1));
                            };

                            remove_next(0);
                        });

                        if (game.guesses.indexOf(letter) == -1) {
                            game.guesses.push(letter);
                            if (game.phrase.indexOf(letter) == -1) {
                                game.stage++;
                                game.msg0.edit(stages[game.stage]);
                            } else {
                                var sik = true;
                                for (var j = 0; j < game.phrase.length; j++) {
                                    var c = game.phrase[j];
                                    if (
                                        c != " " &&
                                        game.guesses.indexOf(c) == -1
                                    ) {
                                        sik = false;
                                    }
                                }

                                if (sik) {
                                    game.msg0.edit(
                                        stages[game.stage].replace(
                                            "o",
                                            `o ${options.winMessage} `
                                        )
                                    );
                                }

                                game.msg1.edit(
                                    generateMessage(game.phrase, game.guesses)
                                );
                            }
                        }
                    }
                    games[i] = game;
                }
            }
        });
      
            this.channel.send(stages[0]).then((m) => {
                nextLetter(m, 0, this.word);
            });
        



    }

  //  }

  

  // ___________________________________________________________________________
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

function printMessage(message, rows, text1 = null, text2 = null) {
    if(text1) message.msg1.edit({ content: text1, components: rows[0] }); 
    if(text2) message.msg2.edit({ content: text2, components: rows[1] });
}