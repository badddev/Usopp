const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const Discord = require('discord.js')
const tempo = require('weather-js');

module.exports = class ServerInfo extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "clima";
      this.category = "Informação";
      this.description = "Mostra o clima da cidade desejada!";
      this.usage = "clima";
      this.aliases = ["tempo", "weather"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
    async run({ message, args, prefix, author }, t) {

tempo.find({search: args.join(" "), degreeType: 'C'}, function(err, result){

    let volte = args[0];
    if (!volte) return;
var Tempo = result[0].current; 
var Local = result[0].location;

    const EMBED = new Discord.MessageEmbed()

    .setColor(process.env.EMBED_COLOR)
    .setTitle(`${Emojis.Certo} - Informações sobre o clima da cidade: \`\`\`${Tempo.observationpoint}\`\`\``)
    .addField(`${Emojis.Regiao} - Fuso Horário:`, `${Local.timezone} UTC`, true)
    .addField(`${Emojis.Cloudy} - Sensação Térmica:`, `${Tempo.feelslike} graus`, true)
    .addField(`${Emojis.Centigrade} - Tipo de grau:`, Local.degreetype, true)
    .addField(`${Emojis.Raindrops} - Umidade do Ar:`, `${Tempo.humidity}%`, true)
    .addField(`${Emojis.Temperatura} - Temperatura:`, `${Tempo.temperature} graus`, true)
    .addField(`${Emojis.Tornado} - Ventos:`, Tempo.winddisplay, true)
    .setFooter(`${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.displayAvatarURL)
    

    message.channel.send(EMBED)


}
    )}}