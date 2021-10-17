const { 
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js')

const functions = require('../../functions/function');


module.exports = async (options) => {
   /**
     * @name TicTacToe
     * @kind constructor
     * @param {Object} options options
     * @param {String} [options.xEmoji] x emoji
     * @param {any} [options.message] the discord message
     * @param {String} [options.xColor] x button color
     * @param {String} [options.oEmoji] o emoji
     * @param {String} [options.oColor] o button color
     * @param {String} [options.embed.color] embed color
     * @param {String} [options.embed.fightEmoji] embed emoji
     * @param {any} [options.opponent] const opponent = <Message>.mentions.members.first() (NOT CHANGEABLE)
     */
    if (!options.embed) options.embed = {};
    if (typeof options.embed !== 'object') {
            throw new TypeError('Klaymon Err: embed must be an object.');
    }

        if (options.fightEmoji) this.fightEmoji = options.fightEmoji;
        else this.fightEmoji = "🎮"
        const taskete = this.fightEmoji;
        if (options.xEmoji) this.xEmoji = options.xEmoji;
        else this.xEmoji = "❌"
        if (options.oEmoji) this.oEmoji = options.oEmoji;
        else this.oEmoji = "⭕";
        if (options.xColor) this.xColor = options.xColor;
        else this.xColor = "BLURPLE"
        if (options.oColor) this.oColor = options.oColor;
        else this.oColor = "BLURPLE"
        if (!options.opponent) throw new TypeError('Missing argument: opponent | Type: DiscordUser')
        if (!options.message) throw new TypeError('Missing argument: message | Type Message')
        this.message = options.message;
        this.opponent = options.opponent;

        if (!options.embed.color) options.embed.color = functions.randomHexColor();
	if (typeof options.embed.color !== 'string') {
		throw new TypeError('Klaymon Err: embed color must be a string.');
	}

        if (!options.fightBot) options.fightBot = "Awww, You can't fight a bot!"
	if (typeof options.fightBot !== 'string') {
		throw new TypeError('Klaymon Err: fightBot message content must be a string.');
	}


const main_color = options.embed.color

        let [a1, a2, a3, b1, b2, b3, c1, c2, c3] = getBoarder();
        let [a11, a22, a33, b11, b22, b33, c11, c22, c33] = getIds();
        let [A1, A2, A3, B1, B2, B3, C1, C2, C3] = getButtons();
        const author = this.message.author.id;
        const member = this.opponent;
        const authorName = this.message.author.username;
        const gameData = [{
                        member: this.message.author,
                        em: this.xEmoji,
                        color: this.xColor
                },
                {
                        member: member,
                        em: this.oEmoji,
                        color: this.oColor
                }
        ];
        let player = Math.floor(Math.random() * gameData.length);
        const midDuel = new Set();

        if (midDuel.has(author)) {
                return this.message.reply(`You're currently in a duel`)
        } else if (midDuel.has(member.id)) {
                return this.message.reply(`<@${member.id}> is currently in a duel`)
        }
        if (member.id === this.message.client.user.id || member.bot) {
                return this.message.reply(`${options.fightBot}`)
        }

        let Embed;
        if (player == 0) {
                Embed = new MessageEmbed()
                        .setTitle(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                        .setDescription(`It is ${authorName}'s Turn!`)
                        .setColor(main_color)
        } else {
                Embed = new MessageEmbed()
                        .setTitle(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                        .setDescription(`It is ${this.opponent.username}'s Turn!`)
                        .setColor(main_color)
        }

        this.message.reply({
                embeds: [Embed],
                components: [
                        new MessageActionRow().addComponents([A1, A2, A3]),
                        new MessageActionRow().addComponents([B1, B2, B3]),
                        new MessageActionRow().addComponents([C1, C2, C3]),
                ]
        }).then(async (msg) => {
                midDuel.add(author)
                midDuel.add(member.id)
                const gameCollector = msg.createMessageComponentCollector({
                        filter: (i) => i.isButton() && i.user && (i.user.id == this.message.author.id || i.user.id == this.opponent.id) && i.message.author.id == this.message.client.user.id,
                });



                gameCollector.on('collect', async btn => {
                        if (btn.customId == a11 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate();
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                a1 = gameData[player].em;
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        A1 = new MessageButton()
                                                .setCustomId(a11)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == a22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                a2 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        A2 = new MessageButton()
                                                .setCustomId(a22)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == a33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                a3 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        A3 = new MessageButton()
                                                .setCustomId(a33)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == b11 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {

                                        try {
                                                b1 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        B1 = new MessageButton()
                                                .setCustomId(b11)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == b22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                b2 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        B2 = new MessageButton()
                                                .setCustomId(b22)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == b33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                b3 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        B3 = new MessageButton()
                                                .setCustomId(b33)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == c11 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                c1 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        C1 = new MessageButton()
                                                .setCustomId(c11)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == c22 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                c2 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        C2 = new MessageButton()
                                                .setCustomId(c22)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()


                                }
                        } else if (btn.customId == c33 && gameData[player].member.id === btn.user.id) {
                                btn.deferUpdate()
                                if (btn.label == this.oEmoji || btn.label == this.xEmoji) { // User tries to place at an already claimed spot
                                        btn.message.update('That spot is already occupied.')
                                } else {
                                        try {
                                                c3 = gameData[player].em
                                                if (
                                                        (a1 == this.xEmoji && b1 == this.xEmoji && c1 == this.xEmoji || a1 == this.oEmoji && b1 == this.oEmoji && c1 == this.oEmoji) ||
                                                        (a2 == this.xEmoji && b2 == this.xEmoji && c2 == this.xEmoji || a2 == this.oEmoji && b2 == this.oEmoji && c2 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b3 == this.xEmoji && c3 == this.xEmoji || a3 == this.oEmoji && b3 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && a2 == this.xEmoji && a3 == this.xEmoji || a1 == this.oEmoji && a2 == this.oEmoji && a3 == this.oEmoji) ||
                                                        (b1 == this.xEmoji && b2 == this.xEmoji && b3 == this.xEmoji || b1 == this.oEmoji && b2 == this.oEmoji && b3 == this.oEmoji) ||
                                                        (c1 == this.xEmoji && c2 == this.xEmoji && c3 == this.xEmoji || c1 == this.oEmoji && c2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a1 == this.xEmoji && b2 == this.xEmoji && c3 == this.xEmoji || a1 == this.oEmoji && b2 == this.oEmoji && c3 == this.oEmoji) ||
                                                        (a3 == this.xEmoji && b2 == this.xEmoji && c1 == this.xEmoji || a3 == this.oEmoji && b2 == this.oEmoji && c1 == this.oEmoji)
                                                ) {
                                                        this.message.reply(`${gameData[player].member} wins!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)
                                                } else if (a1 !== '⬜' && a2 !== '⬜' && a3 !== '⬜' && b1 !== '⬜' && b2 !== '⬜' && b3 !== '⬜' && c1 !== '⬜' && c2 !== '⬜' && c3 !== '⬜') {
                                                        this.message.reply(`It's a **Tie**!`)
                                                        gameCollector.stop()
                                                        midDuel.delete(author)
                                                        midDuel.delete(member.id)

                                                }
                                        } catch (e) {
                                                console.log(e.stack ? e.stack : e)
                                        }
                                        player = (player + 1) % 2;
                                        if (player == 0) {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} __**${authorName}**__ VS ${this.opponent.username} ${taskete}`)
                                                        .setColor(main_color)
                                        } else {
                                                Embed = new MessageEmbed()
                                                        .setDescription(`${taskete} ${authorName} VS __**${this.opponent.username}**__ ${taskete}`)
                                                        .setColor(main_color)
                                        }
                                        C3 = new MessageButton()
                                                .setCustomId(c33)
                                                .setStyle(`${gameData[player].color}`)
                                                .setEmoji(gameData[player].em)
                                                .setDisabled()

                                }
                        } else {
                                return btn.reply({
                                        content: 'Wait for the opponent!',
                                        ephemeral: true
                                })
                        }
                        //only edi the message if not the else executed
                        msg.edit({
                                embeds: [Embed],
                                components: [
                                        new MessageActionRow().addComponents([A1, A2, A3]),
                                        new MessageActionRow().addComponents([B1, B2, B3]),
                                        new MessageActionRow().addComponents([C1, C2, C3]),
                                ]
                        })
                })

                gameCollector.on("end", async btn => {
                        msg.edit({
                                embeds: [Embed],
                                components: [
                                        new MessageActionRow().addComponents([A1.setDisabled(), A2.setDisabled(), A3.setDisabled()]),
                                        new MessageActionRow().addComponents([B1.setDisabled(), B2.setDisabled(), B3.setDisabled()]),
                                        new MessageActionRow().addComponents([C1.setDisabled(), C2.setDisabled(), C3.setDisabled()]),
                                ]
                        }).catch(console.log)
                })

        })

        function getBoarder() {
                return ['⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'];
        }

        function getIds() {
                return ["A1-1",
                        "A2-2",
                        "A3-3",
                        "B1-1",
                        "B2-2",
                        "B3-3",
                        "C1-1",
                        "C2-2",
                        "C3-3"
                ];
        }

        function getButtons() {
                return [
                        new MessageButton()
                        .setCustomId(a11)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(a22)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(a33)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(b11)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(b22)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(b33)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(c11)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(c22)
                        .setStyle('SECONDARY')
                        .setLabel('~'),
                        new MessageButton()
                        .setCustomId(c33)
                        .setStyle('SECONDARY')
                        .setLabel('~')
                ]
        }
}
