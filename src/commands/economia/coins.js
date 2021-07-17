const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const Utils = require("../../utils/Util");
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class Coins extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "coins";
    this.category = "Economia";
    this.description = "Comando para olhar seus coins/do usuário";
    this.usage = "coins <@user>";
    this.aliases = ["saldo", "money"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const USER =
      this.client.users.cache.get(args[0]) ||
      message.mentions.users.first() ||
      message.author;

    User.findOne({ idU: USER.id }, async (err, user) => {
      let coins = user.coins;
      let bank = user.bank;

      const EMBED = new ClientEmbed(message.author)
        .setDescription(
          `**${Emojis.Economy} Coins - ${USER.username}**`,
        )
        .setFooter(`${message.author.tag} | ${message.author.id}`,message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
          {
            name: `${Emojis.New_Coins} Coins na Carteira`,
            value: Utils.toAbbrev(coins),
          },

          {
            name: `${Emojis.Banco} Coins no Banco`,
            value: Utils.toAbbrev(bank),
          },
          {
            name: `${Emojis.Coins} Total`,
            value: Utils.toAbbrev(coins + bank),
          }
        )
        .setThumbnail(
         `https://cdn.discordapp.com/attachments/751976776607203408/821909349261115392/money.png`
        )
        .setTimestamp();

      message.channel.send(EMBED);
    });
  }
};
