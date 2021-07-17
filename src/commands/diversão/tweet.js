const { MessageEmbed } = require('discord.js')
const Command = require("../../structures/Command");
const fetch = require('node-fetch')

module.exports = class Kiss extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "tweet";
      this.category = "Diversão";
      this.description = "Faça um Fake Tweet";
      this.usage = "tweet";
      this.aliases = [""];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, client, args, prefix, author }, t) {

        fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
        .then((res) => res.json())
        .then((data) => {

            message.quote(data.message)
        })
    }
}