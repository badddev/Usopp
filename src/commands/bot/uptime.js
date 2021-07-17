const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const moment = require("moment");
require("moment-duration-format");

module.exports = class uptime extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "uptime";
    this.category = "Bot";
    this.description = "Comando para olhar quanto tempo o bot está online.";
    this.usage = "uptime";
    this.aliases = ["tempo"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    //===============> Imports <===============//

    const uptime = moment
    
    message.channel.send(
      `${Emojis.Waiting} Estou acordado há: **${uptime
        .duration(process.uptime() * 1000)
        .format("h [horas] m [minutos] e s [segundos]")
        .replace(
          "minsutos",
          "minutos"
        )}**`
    );
  }
};
