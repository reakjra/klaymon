# Example For chatBot

```js
const Discord = require('discord.js')
const Client = new Discord.Client({
    intents: 32767
})

const aiChatBot = require("klaymon")
const strawberry = new aiChatBot({ 
   name: "Klay", // Bot name
   owner: "© Klaymon Development." // Bot owner
})

Client.on("messageCreate", async message => {

const chatchannel = "900466548303601714"  //Id of the channel where the chatbot will talk.

if(message.channel.id === `${chatchannel}` && !message.author.bot) { //checking if the channel is the channel id and if the author is not a bot

 let response = await strawberry.chatBot(message.content) //Taking the Bot response and reading the user message content

message.channel.sendTyping() // Start the typing event

  await message.reply(response) // Replying to a user message with the response.

 }
})
