const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class BotInfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;
    this.name = "invite";
    this.category = "Informação";
    this.description = "Comando para adicionar o bot á um servidor.";
    this.usage = "invite";
    this.aliases = ["convite"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {

    const EMBED = new ClientEmbed(author)

      .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${this.client.user.username} | Links Akame`, this.client.user.displayAvatarURL())
      .setDescription(`**[Convite do Bot](https://discord.com/oauth2/authorize?client_id=852696922811924480&permissions=8&scope=bot)\n[Servidor de Suporte](https://discord.gg/SV3HTm3aKM)**`)

    message.channel.send(EMBED);
  }
};
