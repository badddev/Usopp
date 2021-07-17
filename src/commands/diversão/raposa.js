const fetch = require('node-fetch');
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class Raposa extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "raposa";
      this.category = "Diversão";
      this.description = "Pegue uma imagem aleátoria de uma raposa.";
      this.usage = "raposa ";
      this.aliases = ["fox"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, msg, args, prefix, author }, t) {

        try {
            const res = await fetch('https://randomfox.ca/floof/');
            const img = (await res.json()).image;
            const EMBED = new ClientEmbed(author)
              .setDescription('Aqui sua imagem de uma raposa.')
              .setImage(img)
              .setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
            message.channel.send(EMBED);
          } catch (err) {
          }
        }}