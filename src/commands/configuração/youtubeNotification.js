const Command = require("../../structures/Command");

module.exports = class AntInvite extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "youtubeNotification";
    this.category = "Configuração";
    this.description = "";
    this.usage = "";
    this.aliases = [""];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
  }}