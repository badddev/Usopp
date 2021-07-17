const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const fetch = require("node-fetch");

module.exports = class Kiss extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "kemonomimi";
    this.category = "Anime";
    this.description = "Pega um gif kemonomimi.";
    this.usage = "kemonomimi";
    this.aliases = [""];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const user =
      this.client.users.cache.get(args[0]) || message.mentions.users.first();

    const body = await fetch("https://nekos.life/api/v2/img/kemonomimi").then((res) =>
      res.json()
    );

    const EMBED = new ClientEmbed(author)
      .setImage(body.url)
      .setDescription(`Aqui sua kemonomimi.`);

    message.channel.send(EMBED);
  }
};