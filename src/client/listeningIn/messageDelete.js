const { WebhookClient, MessageEmbed } = require('discord.js')
const Guild = require("../../database/Schemas/Guild");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    Guild.findOne({ idS: message.guild.id }, async function (err, server) {
      try {
        if (message.author.bot) return; // caso um bot tenha deletado alguma mensagem ele não vai mandar no canal de LOGS.
        const guild = message.guild;

        const wc = new WebhookClient('845377386564550656', 'K8udqPYEsz_Z1FRpGTk5ei9XZp4ZG3rq6KeSYhUqlY1XLGeQaGYffXk8r_281zfvfTvN')

        const UPDATE = new MessageEmbed()
          .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
          .setTitle(`Mensagem Deletada`)
          .addFields(
            {
              name: `Author`,
              value: message.author, // pega o author da mensagem
            },
            {
              name: `Contéudo da Mensagem`,
              value: message.content, // pega o contéudo da mensagem
            },
            {
              name: `Canal`,
              value: message.channel, // pega o canal que a mensagem foi deletada
            }
          )
          .setThumbnail(
            message.author.displayAvatarURL({ dynamic: true, size: 2048 })
          )
          .setFooter(
            `${message.author.tag} | ${message.author.id}`,
            message.author.displayAvatarURL({ dynamic: true, size: 2048 })
          )
          .setTimestamp()
          .setColor(process.env.EMBED_COLOR);

        if (server.logs.status) {
          const channel = guild.channels.cache.get(server.logs.channel);
          wc.send(UPDATE);
        }
      } catch (err) {
        console.log(`EVENTO: MessageDelete`);
      }
    });
  }
};
