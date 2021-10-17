# Example For PhComment

```js
const { PhComment } = require('klaymon')

await PhComment({
    message: message, // Message Parameter / You can user interaction. See all the function that support slash commands on the docs.
    embed: {  
        color: "GREEN",  //Embed color / DEFAULT: RANDOM
        timestamp: true, //Timestamp / DEFAULT: FALSE
    },
    NSFWchannel: true, // If the channel has to be NSFW // DEFAULT: FALSE
    noNSFWcontent: "this channel doesnt support NSFW content", // Message content if the user try to use this in the message in a non-nsfw content (if NSFWchannel is `true`) 
    thoseEmbeds: true, // Put the noNSFWcontent into a embed description
    thoseEmbedsColor: `RED` // The noNSFWcontent embed's color
})```