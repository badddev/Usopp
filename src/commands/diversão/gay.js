const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const Discord = require("discord.js");

module.exports = class uptime extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "gay";
      this.category = "Diversão";
      this.description = "Eu dou minha opinião do quão gay um usuário é!";
      this.usage = "gay";
      this.aliases = ["fag"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author }, t) {

        let gay = Math.round(Math.random() * 100);

        message.channel.send(`${Emojis.Gay} | Eu acho que o(a) ${message.mentions.users.first()}, é ${gay}% gay!`)
    }}