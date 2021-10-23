# Example For Hangman

```js
const { Hangman } = require('klaymon')
   const word = args.join(" ")

await Hangman({
    message: message, // Message Parameter
    client: Client, // Client Parameter
    words: word, // Word to guess // Default: random
    button: {
        color: "BLURPLE", // Buttons color
    },
    looseMessage: "Ah, i got you.", // Loose message / default: Aight, it seems you lost...
    winMessage: "You're safe... for now", // Win message / default : Cool, you saved me.
    otherMessage: "Only {{author}} can use the reactions." // The message if someone tries to use the emojis if the onlyAuthor argument is true / Default : Only {{author}} can use the emojis
})

}
