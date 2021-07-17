const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const Discord = require("discord.js");

module.exports = class uptime extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "corno";
      this.category = "Diversão";
      this.description = "Veja o quão corno alguém é.";
      this.usage = "corno";
      this.aliases = [""];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author }, t) {

        let corno = Math.round(Math.random() * 100);

        message.channel.send(`${Emojis.Corno} | Eu acho que o(a) ${message.mentions.users.first()}, é ${corno}% corno!`)
    }}