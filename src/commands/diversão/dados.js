const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const Discord = require("discord.js");

module.exports = class uptime extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "dados";
      this.category = "Diversão";
      this.description = "Brinque de rolar o dado.";
      this.usage = "dados";
      this.aliases = [""];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author }, t) {

        let dados = Math.round(Math.random() * 5);

        message.channel.send(`${Emojis.Errado} - ${message.author}, você rolou o dado **6** vezes. Resultado: **${dados}**.`)
    }}