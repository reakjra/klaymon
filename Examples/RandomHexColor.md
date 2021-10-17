# Example For RandomHexColor

```js
const { RandomHexColor } = require('klaymon')

await RandomHexColor({
    message: message, // Message Parameter
    embed: {
        color: '{{hexColor}}', // Embed color // {{hexColor}} is for making the embed color as the hex color // DEFAULT: {{hexColor}} / VALUE: {string}
        footer: '© Klaymon Development' // Embed Footer tezt / DEFAULT: {© Klaymon Development} / VALUE: {string}
    }
})



