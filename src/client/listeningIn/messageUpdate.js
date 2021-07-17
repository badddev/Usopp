const { WebhookClient, MessageEmbed } = require('discord.js')
const Guild = require("../../database/Schemas/Guild");

module.exports = class {
  constructor(client) {
    this.client = client;
  }
  
  async run(oldMessage, newMessage) {
      Guild.findOne({ idS: newMessage.guild.id }, async function (err, server) {
    try {
      if (newMessage.author.bot) return; // caso um bot tenha editado alguma mensagem ele não vai mandar no canal de LOGS.
      const guild = newMessage.guild;

      const wc = new WebhookClient('845377386564550656', 'K8udqPYEsz_Z1FRpGTk5ei9XZp4ZG3rq6KeSYhUqlY1XLGeQaGYffXk8r_281zfvfTvN')

      const UPDATE = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setTitle(`Mensagem Editada`)
        .addFields(
          {
            name: `Author`,
            value: newMessage.author, // pega o author da mensagem
          },
          {
            name: `Mensagem Anterior`,
            value: oldMessage.content,
          },
          {
            name: `Mensagem Posterior`,
            value: newMessage.content,
          },
          {
            name: `Canal`,
            value: newMessage.channel,
          }
        )
        .setThumbnail(
          newMessage.author.displayAvatarURL({ dynamic: true, size: 2048 })
        )
        .setFooter(
          `${newMessage.author.tag} | ${newMessage.author.id}`,
          newMessage.author.displayAvatarURL({ dynamic: true, size: 2048 })
        )
        .setTimestamp()
        .setColor(process.env.EMBED_COLOR);

      if (server.logs.status) {
        const channel = guild.channels.cache.get(server.logs.channel);
        wc.send(UPDATE);
      }
    } catch (err) {
      console.log(`EVENTO: MessageUpdate`);
    }
  });
};
}