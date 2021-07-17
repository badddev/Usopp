const Command = require("../../structures/Command");
const fetch = require("node-fetch");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class Carinho extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "carinho";
      this.category = "Diversão";
      this.description = "Faça carinho em alguém";
      this.usage = "carinho ";
      this.aliases = ["pat"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, msg, args, prefix, author }, t) {

        const user =
        this.client.users.cache.get(args[0]) || message.mentions.users.first();
  
      if (!user)
        return message.channel.send(
          `${message.author}, você deve mencionar quem deseja abraçar primeiro.`
        );
  
      const body = await fetch("https://nekos.life/api/v2/img/pat").then((res) =>
        res.json()
      );
  
      const EMBED = new ClientEmbed(author)
        .setImage(body.url)
        .setDescription(`${message.author} fez carinho no(a) ${user}`)
        .setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
  
      message.channel.send(EMBED);
    }
}