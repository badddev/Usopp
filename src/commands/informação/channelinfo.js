const Discord = require('discord.js');
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const Emojis = require("../../utils/Emojis");
const moment = require("moment")
require("moment-duration-format")

module.exports = class Factory extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "channelinfo";
    this.category = "Informação";
    this.description = "Mostra as informações do canal desejado!";
    this.usage = "channelinfo";
    this.aliases = ["c-i", "canalinfo"];

    this.enabled = true;
    this.guildOnly = true;
  }

async run({ client, message, args }, t) {

    let channel = message.mentions.channels.first() || message.channel;
    
    const EMBED = new ClientEmbed(message.author.id)
    
    .setTitle(`${Emojis.Canaisdetexto} Informações do Canal: ${channel.name}`)
    .setTimestamp()
    .addFields(
      { name: `${Emojis.Name} Menção do Canal`, value: `<#${channel.id}>`, inline: true },
      { name: `${Emojis.Type} Tipo`, value: `Canal de Texto`, inline: true },
      { name: `${Emojis.Permisão} Posição`, value: `0`, inline: true },
      { name: `${Emojis.Id} ID`, value: `${channel.id}`, inline: true },
      { name: `${Emojis.ContaCriada} Data de Criação`, value: `${moment(channel.createdAt).format("LL")}`, inline: true },
      { name: `${Emojis.Topic} Tópico`, value: `${channel.topic}`, inline: true },
  )
    .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
    .setThumbnail(message.guild.iconURL());
    message.channel.send(EMBED).then(async msg => {

    })
  }
}