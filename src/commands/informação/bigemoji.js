const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const Emojis = require("../../utils/Emojis");

module.exports = class ServerInfo extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "bigemoji";
      this.category = "Informação";
      this.description = "Veja a foto do emoji grande!";
      this.usage = "bigemoji";
      this.aliases = ["be"];
  
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
        const EMBED = new ClientEmbed(author)

      .setAuthor(` `, this.client.user.displayAvatarURL())
      .setDescription(`${Emojis.Diversao} - ${message.author}, aqui está seu emoji em tamanho família haha`)
      .setImage(emojis.url)
      .setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send(EMBED);

    }}}