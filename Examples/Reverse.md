# Example For Reverse

```js
const { Reverse } = require('klaymon')

const text = args.join(" ") // Defining our parameters. (make sure to define `args`)
if(!text) return message.reply("no content") // If the user doesn't wrote anything it returns the message without let the bot crash.

await Reverse({
    message: message, // Message parameter / You can user interaction. See all the function that support slash commands on the docs.
    content: text, // the message content variable
})

