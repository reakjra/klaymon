# Example For TicTacToe

```js
const { TicTacToe } = require('klaymon')

    const opponent = message.mentions.users.first();
    if (!opponent) return message.reply(`You must tag a user.`);
   
        await TicTacToe({
          message: message, // Message Parameter
          opponent: opponent, // Opponent Parameter
            xColor: 'DANGER', // X Buttons color / DEFAULT: DANGER
            oColor: 'SUCCESS', // O Buttons color / DEFAULT: SUCCESS
           xEmoji: '❌', // X Emoji // DEFAULT ❌
           oEmoji: '⭕', // O Emoji // DEFAULT ⭕
           embed: {
               color: "PURPLE" // Embed color / DEFAULT RANDOM
           },
           fightBot: "YOU CANT FIGHT A BOT!", // If the user tries to fight a bot / DEFAULT: "Awww, You can't fight a bot!"

  })

