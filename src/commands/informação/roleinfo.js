const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const Discord = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

module.exports = class Help extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "roleinfo";
      this.category = "Informação";
      this.description = "commands.yt";
      this.usage = "roleinfo";
      this.aliases = [];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author, client }, t) {

        var rol = args[0]
        let role = message.guild.roles.cache.find(x=> x.name == `${rol}`)  || message.mentions.roles.first()
        let rolemembers;
        if(role.members.size > 20) rolemembers = role.members.map(e => `<@${e.id}>`).slice(0,20).join(", ") + ` e mais ${role.members.size - 20} membros `
        if(role.members.size < 20) rolemembers = role.members.map(e => `<@${e.id}>`).join(", ")
        var hata = new Discord.MessageEmbed()
        .setColor('#36393e')
        .setDescription(".<:314240199406387201:490756225575682049> Escreva o nome de alguma role válida.");
        if(!role) return message.channel.send(hata);
        
        moment.locale("pt-BR")
        var roleinfoEmbed = new Discord.MessageEmbed()
        .setColor(role.hexColor)
        .addField(`${Emojis.Name} Nome:`, role.name, true)
        .addField(`${Emojis.Id} Identificação:`, role.id, true)
        .addField(`${Emojis.ContaCriada} Data de Criação:`, moment(role.createdAt).format("LL"), true)
        .addField(`${Emojis.Host} Destacável:`, role.mentionable ? 'Sim' : 'Não', true)
        .addField(`${Emojis.Menc} Mencionável:`, role.mentionable ? 'Sim' : 'Não', true)
        .addField(`${Emojis.Hexa} Hexadecimal:`, role.hexColor, true)
        .addField(`${Emojis.Permisão} Posição:`, role.position, true)
        .addField(`${Emojis.Users} Membros: (${role.members.size})`, rolemembers, true)
        .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        message.channel.send(roleinfoEmbed)
    }}