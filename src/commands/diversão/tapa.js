const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");
const fetch = require("node-fetch");

module.exports = class Kiss extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "slap";
    this.category = "Diversão";
    this.description = "Dê um tapa em alguém";
    this.usage = "tapa <user>";
    this.aliases = ["tapa"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) || message.mentions.users.first();

    if (!user)
      return message.channel.send(
        `${Emojis.Errado} - ${message.author}, você deve mencionar alguém primeiro.`
      );

    const body = await fetch("https://nekos.life/api/v2/img/slap").then((res) =>
      res.json()
    );

    const EMBED = new ClientEmbed(author)
      .setImage(body.url)
      .setDescription(`${message.author} deu um tapa no(a) ${user}`)
      .setFooter(message.author.tag,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send(EMBED);
  }
};