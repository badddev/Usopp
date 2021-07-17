const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const axios = require('axios')

module.exports = class Help extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "docs";
      this.category = "Utilidades";
      this.description = "Pesquise a DOC desejada no site oficial do Discord.JS";
      this.usage = "docs";
      this.aliases = [""];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author }, t) {

    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.channel.send(`${Emojis.Errado} - ${message.author}, não consegui encontrar nada relacionado ao que você inseriu.`)
        }
      })
  }
}