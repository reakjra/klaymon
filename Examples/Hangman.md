# Example For Hangman

```js
const { Hangman } = require('klaymon')

const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
   const word = args.join(" ")

await Hangman({
    message: message, // Message Parameter
    client: Client, // Client Parameter
    word: word, // Word to guess // Default: random
    channelID: channel.id, // Channel to send the hangman / default: message channel
    looseMessage: "Ah, i got you.", // Loose message / default: Aight, it seems you lost...
    winMessage: "You're safe... for now", // Win message / default : Cool, you saved me.
    onlyAuthor: true, // If only the message author can use the reactions. / default: false
    otherMessage: "Only {{author}} can use the reactions." // The message if someone tries to use the emojis if the onlyAuthor argument is true / Default : Only {{author}} can use the emojis
})

}
