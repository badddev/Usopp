const Discord = require('discord.js')
const os = require('os')
const cpuStat = require("cpu-stat");
const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class BotInfo extends Command {
    constructor(client) {
      super(client);
      this.client = client;
      this.name = "cpu";
      this.category = "Bot";
      this.description = "Mostra as informações da CPU do Bot!";
      this.usage = "cpu";
      this.aliases = ["processador"];
  
      this.enabled = true;
      this.guildOnly = true;
    }

    async run({ message, args, prefix, author }, t) {
     
      cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
          return console.log(err);
        }


        const version = process.version;
        const bot = new Discord.Client(); 
             
        let secs = Math.floor(bot.uptime % 60);
        let days = Math.floor((bot.uptime % 31536000) / 86400);
        let hours = Math.floor((bot.uptime / 3600) % 24);
        let mins = Math.floor((bot.uptime / 60) % 60);

        const EMBED = new ClientEmbed(author)

        .setDescription(`**${Emojis.Host} - Informações sobre a CPU do Bot!**`)
        .setTimestamp()
        .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: `${Emojis.Alternativas} - Memória sendo utilizada:`, value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, inline: true },
            { name: `${Emojis.Js} - Versão do Node:`, value: `${version}`, inline: true },
            { name: `**${Emojis.Type} - CPU:**`, value: `\`\`\`fix\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``},
            { name: `${Emojis.Memory} - CPU sendo usada:`, value: `${percent.toFixed(2)}%`, inline: true },
            { name: `${Emojis.Status} - Arch:`, value: `${os.arch()}`, inline: true },
            { name: `${Emojis.Jogando} - Plataforma:`, value: `${os.platform()}`, inline: true }
        )

        message.channel.send(EMBED);
      })
    }
  }