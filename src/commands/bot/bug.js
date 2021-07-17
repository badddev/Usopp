const Discord = require('discord.js'); 
const Command = require("../../structures/Command");
const { WebhookClient, MessageEmbed } = require('discord.js')
const Emojis = require("../../utils/Emojis");

module.exports = class Kiss extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "bugreport";
      this.category = "Bot";
      this.description = "Reporta um mal acontecimento ocorrido no uso de alguma função";
      this.usage = "bugreport";
      this.aliases = ["reportbug", "bug"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ client, message, args }, t) {

      const wc = new WebhookClient('849573892951769130', '8UJ3FRNAtSIsCz2yhh1HcC6qxkYlTo1dtJFpKqGbqB-JAKkN-CHdP0d9AxvgbsWBjlS8')

    let sugestao = args.join(' ');
  
    if (sugestao.length < 1) return message.reply(`${Emojis.Errado} - Você precisa digitar alguma coisa bobinho`)

   message.channel.send(`${Emojis.Certo} Seu bug foi enviado com sucesso obrigado pelo feedback!`)

    const embed = new MessageEmbed()

    .setColor(process.env.EMBED_COLOR)
    .setDescription(`${Emojis.Certo} Nova Report de Bug!`)
    .addField(`**${Emojis.Nomedeuser} Author:**`,`${message.author}`,true)
    .addField(`**${Emojis.Settings} Servidor:**`,`${message.guild.name} \`(${message.guild.id})\``,false)
    .addField(`**${Emojis.Menc} Conteúdo:**`, `${sugestao}`, true)
    .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

    this.client.channels.cache.get(`848755744068337724`)
    wc.send(embed);
}}