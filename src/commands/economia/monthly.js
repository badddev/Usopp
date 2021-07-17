const User = require("../../database/Schemas/User");
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command");
const moment = require("moment");
require("moment-duration-format");
const Utils = require("../../utils/Util");
module.exports = class Daily extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "monthly";
    this.category = "Economia";
    this.description = "Comando para pegar seus coins do mês";
    this.usage = "monthly";
    this.aliases = ["mensal"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    User.findOne({ idU: message.author.id }, async (err, user) => {
      //================= Imports =================//
      let cooldown = 2.628e9;
      let coins = Math.floor(Math.random() * 540);
      let daily = user.daily;
      let atual = user.coins;
      let time = cooldown - (Date.now() - daily);

      //================= Verifcação do Tempo =================//

      if (daily !== null && cooldown - (Date.now() - daily) > 0) {
        return message.channel.send(`${Emojis.Waiting} - ${message.author}, você deve aguardar **${moment.duration(time).format
          ("d [dias] h [horas] m [minutos] e s [segundos]")
        .replace("minsutos", "minutos")}** até poder pegar seu prêmio novamente.`,
        )

      } else {
        message.channel.send(
          `${Emojis.Coins} - ${message.author}, você ganhou **${coins}** coins.\nAgora você tem **${Utils.toAbbrev(
            atual + coins
          )}** coins.`
        );

        await User.findOneAndUpdate(
          { idU: message.author.id },
          { $set: { coins: coins + atual, daily: Date.now() } }
        );
      }
    });
  }
};
