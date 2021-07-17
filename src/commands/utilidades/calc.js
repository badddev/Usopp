const Guild = require("../../database/Schemas/Guild");
const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");
const Discord = require('discord.js');
const math = require('mathjs');

module.exports = class Help extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "calc";
      this.category = "Utilidades";
      this.description = "Comando para ver informações dos comandos do bot";
      this.usage = "calc";
      this.aliases = ["calcular", "calculadora"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author }, t) {

        const server = await Guild.findOne({ idS: message.guild.id });

        if(!args[0]) return message.channel.send(`${Emojis.Errado} - ${message.author}, modo correto de usar \`${server.prefix}calc <expressão matemática>*\``);

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send(`${Emojis.Errado} - ${message.author}, insira uma questão válida!`)
        }

        const EMBED = new ClientEmbed(this.client.user)

        .setTitle(`${Emojis.Calculator} - Calculadora`)
        .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .addField(`Expressão`, `**\`\`\`fix\n${args.join(' ')}\`\`\`**`)
        .addField(`Resultados da Conta`, `**\`\`\`fix\n${resp}\`\`\`**`)
        .setThumbnail(`https://media.discordapp.net/attachments/781521650721488916/796750700004638750/calculator.png?width=468&height=468`)

        message.channel.send(EMBED);

    }
}