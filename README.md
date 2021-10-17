<p align="center"><img width="100px"
   style="margin-bottom:-6px" src="https://cdn.discordapp.com/attachments/899184649090265119/899190347811401729/f6dd034f2428b3ce23f63e63503e3ed0.webp"/></p>
<h1 align="center">Klaymon</h1>
<p align="center">
   <a href="https://www.npmjs.com/package/klaymon"><img src="https://img.shields.io/npm/v/klaymon.svg?style=flat-square" /></a>
   <a href="https://github.com/kayedaa/klaymon/blob/master/LICENSE"><img src="https://nuggies.js.org/assets/img/license.ade17f5e.svg" /></a>
   <br>
   <a href="https://www.npmjs.com/package/klaymon"><img src="https://nodei.co/npm/klaymon.png?downloadRank=true&downloads=true&downloadRank=true&stars=true" /></a>
</p>

## What is klaymon?
- A fun npm package to play games, send funny image/gifs and use utility commands!
- You can find examples here: [Examples](https://github.com/kayedaa/klaymon/tree/master/Examples)

## Features
- 🧑 Beginner friendly
- 🎉 Easy to use
- 🔘 Discord Buttons
- 🤖 * ONLY *Supports Discord.js V13

## Install the package 📥
```sh
npm install klaymon
```

## Usage 📚
```js
const { TicTacToe } = require("klaymon");


   const opponent = message.mentions.users.first();
    if (!opponent) return message.reply(`You must tag a user!`);
   
        await TicTacToe({
          message: message, // Message Parameter
          opponent: opponent, // Opponent Parameter
            xColor: 'DANGER', // X Buttons color / DEFAULT: DANGER
            oColor: 'SUCCESS', // O Buttons color / DEFAULT: SUCCESS
           xEmoji: '❌', // X Emoji // DEFAULT ❌
           oEmoji: '⭕', // O Emoji // DEFAULT ⭕
           embed: {
               color: "BLACK" // Embed color / DEFAULT RANDOM
           },
             fightBot: "YOU CANT FIGHT A BOT!", // If the user tries to fight a bot / DEFAULT: "Awww, You can't fight a bot!"
             fightEmoji: "<:taskete:898896594953469952>"  // Emoji in the embed / DEFAULT: 🎮

  })
});
```

#### Example For Discord.js v13.2.0
```js
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: 32767,
});

const { TicTacToe } = require('klaymon');

client.on('ready', async () => {
	console.log(`${client.user.tag} is now online!`);
});

client.on('messageCreate', async (message) => {
	if (message.content === '$tictactoe') {

		 const opponent = message.mentions.users.first();
    if (!opponent) return message.reply(`You must tag a user!`);
   
        await TicTacToe({
          message: message, // Message Parameter
          opponent: opponent, // Opponent Parameter
            xColor: 'DANGER', // X Buttons color / DEFAULT: DANGER
            oColor: 'SUCCESS', // O Buttons color / DEFAULT: SUCCESS
           xEmoji: '❌', // X Emoji // DEFAULT ❌
           oEmoji: '⭕', // O Emoji // DEFAULT ⭕
           embed: {
               color: "BLACK" // Embed color / DEFAULT RANDOM
           },
           fightBot: "YOU CANT FIGHT A BOT!", // If the user tries to fight a bot / DEFAULT: "Awww, You can't fight a bot!"
           fightEmoji: "<:taskete:898896594953469952>"  // Emoji in the embed / DEFAULT: 🎮
       })
	}
}); 

client.login('DISCORD_BOT_TOKEN');
```
## Result 📤
<img src="https://cdn.discordapp.com/attachments/899184649090265119/899188901321785364/Immagine_2021-10-17_085522.png">

## Contributing 🤝
- Contributions, issues and feature requests are welcome!
- Feel free to check **[issues page](https://github.com/kayedaa/klaymon-examples/issues)**.

## Developers 👨‍💻
- **[kayedaa#9473](https://github.com/kayedaa)**
- **[LyoeX#6412](https://github.com/lyoex)**


  
 <h1>👥 Contact us | Support</h1>
 <p>
<a href="https://discord.gg/qFtU2g9Fa8"><img src="https://cdn.discordapp.com/attachments/899184649090265119/899193391370346496/Immagine_2021-10-17_091314.png" /></a>
</p>
