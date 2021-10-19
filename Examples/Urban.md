# Example For Urban

```js
const { Urban } = require('klaymon')

const query = args.join(" ")
if(!query) return message.reply("Please enter a search query")
   
      await Urban({ 
        message: message, // Message Parameter
        query: query, // Search Query Parameter
        embed: {
            timestamp: false, // Embed Timestamp / DEFAULT: {true} VALUE {boolean}
            color: "PURPLE", // Embed Color / DEFAULT: {random} VALUE {string}
            footer: "©️ Klaymon Development" // Embed Color / DEFAULT: {©️ Klaymon Development} VALUE {string}
        },
        notFound: "Query not found", // Query not found message error / DEFAULT: {The search query was not found.}
    })
  

