const fetch = require("node-fetch")

class Chatbot {

  constructor(options = { name: "Klay", owner: "© Klaymon Development" }) {
    this.name = options.name ? options.name : "Klay"
    this.owner = options.owner ? options.owner : "© Klaymon Development"
  }

  async chatBot(message) {
    if(!message) {
      throw new Error("Klaymon Err: provide some message to reply too.")
    }

    let json = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message)}&botname=${encodeURIComponent(this.name)}&ownername=${this.owner}`)
    let chatBot = await json.json()

    if(!chatBot) {
      throw new Error("Klaymon Err: API is not available. Try later.")
    }

    return chatBot.message
  }

}

module.exports = Chatbot

