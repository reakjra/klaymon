# Example For RoadRace

```js
const { RoadRace } = require('klaymon')

const opponent = message.mentions.users.first()
if(!opponent) return message.reply(`Please mention an opponent`)

await RoadRace({
    message: message, // Message Parameter / VALUE: {OBJECT}
    opponent: opponent, // Opponent Parameter / VALUE: {OBJECT}
   winMessage: `Cool! {{whoWin}} won the game!` // Win Message | {{whoWin}} is The WINNER username <@{{whoWin}}> for tag him / DEFAULT: {Awww, {{whoWin}} won!} / VALUE: {STRING}
    
})

