const Command = require("../../structures/Command");
const Discord = require("discord.js");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyCKxsZYfb-ipTFMdfAlxn9IaL5y1YqVEoo");

module.exports = class Help extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "yt";
      this.category = "Utilidades";
      this.description = "commands.yt";
      this.usage = "yt";
      this.aliases = [];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author, client }, t) {

  youtube.searchVideos(args, 1)
    .then(results => {
      const ytEmbed = new Discord.MessageEmbed()

        .setColor("#ed3737")
        .addField('Canal', `${results[0].channel.title}`, true)
        .addFields(
            {
                name: 'Titulo',
                value: `${results[0].title}`, inline:true
            }
        )
        .addField('Descrição', `${results[0].description}`)
        .addField('Link', `https://youtu.be/${results[0].id}`)
        .setThumbnail(`${results[0].thumbnails.high.url}`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))


      message.channel.send(ytEmbed);

    }).catch()
}}