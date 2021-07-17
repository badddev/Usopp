const axios = require('axios');
const Emojis = require("../../utils/Emojis");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const { MessageEmbed } = require('discord.js')

module.exports = class ServerInfo extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "covid";
      this.category = "Informação";
      this.description = "Comando para ver estatísticas do Covid-19";
      this.usage = "covid";
      this.aliases = ["corona"];
  
      this.enabled = true;
      this.guildOnly = true;
    }
    async run({ message, args, prefix, author }, t) {
        const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, corona;

        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            return message.channel.send(`***${args[0]}*** Não existem casos coletados Reporte esse Bug para o badd#2657`)
        }

        const EMBED = new ClientEmbed(author)
            .setTitle(args[0] ? `${args[0].toUpperCase()}` : `${Emojis.Virus} COVID-19 - Status Mundial`)
            .setTimestamp()
            .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: `Casos Totais:`,
                    value: corona.cases.toLocaleString(),
                    inline: true
                },
                {
                    name: `Mortes Totais:`,
                    value: corona.deaths.toLocaleString(),
                    inline: true
                },
                {
                    name: `Total Recuperados:`,
                    value: corona.recovered.toLocaleString(),
                    inline: true
                },
                {
                    name: `Casos Críticos:`,
                    value: corona.critical.toLocaleString(),
                    inline: true
                },
                {
                    name: `Recuperados Hoje:`,
                    value: corona.todayRecovered.toLocaleString().replace("-", ""),
                    inline: true
                },
                {
                    name: `Mortos Hoje:`,
                    value: corona.todayDeaths.toLocaleString(),
                    inline: true
                })

        await message.channel.send(EMBED)
    }
};