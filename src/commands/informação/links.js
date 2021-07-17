const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class BotInfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;
    this.name = "links";
    this.category = "Informação";
    this.description = "Comando para ver meus links.";
    this.usage = "links";
    this.aliases = ["link"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {

    const EMBED = new ClientEmbed(author)

      .setAuthor(` `, this.client.user.displayAvatarURL())
      .addFields(
        {
          name: `Meus Links`,
          value: `[Meu Convite](https://discord.com/oauth2/authorize?client_id=852696922811924480&permissions=8&scope=bot)\n[Servidor de Suporte](https://discord.gg/SV3HTm3aKM)\n[Vote no Bot](https://top.gg/bot/835994152193228833)`,
        },
      )
      .setThumbnail(
        this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
      );

    message.channel.send(EMBED);
  }
};
