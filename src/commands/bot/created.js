const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const User = require("../../database/Schemas/User")

module.exports = class Ping extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "created";
    this.category = "Bot";
    this.description = "Mostra a data de criação do Bot!";
    this.usage = "created";
    this.aliases = ["criação", "creation"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {

    message.channel.send(`${Emojis.Calendario} - ${message.author}, data de criação do Bot: \`27/04/21\` (27 de abril de 2021)`)
  }
};
