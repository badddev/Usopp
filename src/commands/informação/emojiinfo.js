const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const Discord = require('discord.js')
const client = require('discord.js')
const { MessageEmbed } = require("discord.js")
const { utc } = require("moment");
const { ContaCriada } = require("../../utils/Emojis");

module.exports = class ServerInfo extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "emojiinfo";
      this.category = "Informação";
      this.description = "Informações sobre um emoji";
      this.usage = "emojiinfo";
      this.aliases = ["emoji", "ei"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
    async run({ message, args, prefix, author }, t) {

        const EMOJI_REGEX = /:[^:\s]*(?:::[^:\s]*)*:/

        if(!EMOJI_REGEX.test(args[0])) {
            return message.channel.send(`Isso não é um emoji!`)
        } else {
            const emoji = args[0].trim().split(':')[2].slice(0, 18)

            const emojis = this.client.emojis.cache.find(emoje => emoje.id == emoji)

            const EMBED = new Discord.MessageEmbed()

            .setTitle(`Usopp`)
            .setDescription(`Use: \`${prefix} emojiinfo -- help | --ajuda\` para saber algumas informações a mais sobre este comando e divirta-se!`)
            .setColor(process.env.EMBED_COLOR)
            .setFooter(`${message.author.tag}`,this.client.user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(emojis.url)
            .addField(`${Emojis.Name} Nome:`, `${emojis.name}`, true)
            .addFields(
                {
                  name: `${Emojis.Certo} Animado:`,
                  value: emojis.animated ? 'Sim' : 'Não', inline: true
                },
            )
            .addField(`${Emojis.IdNo} ID:`, `${emojis.id}`)
            .addField(`${Emojis.Id} Identificador`, `:${emojis.name}:${emojis.id}`)
            .addField(`${Emojis.ContaCriada} Data de Criação:`, utc(emojis.createdAt).format('LL'))

            message.channel.send(EMBED)
        } 
    }
}       