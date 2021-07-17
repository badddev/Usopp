const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class BotInfo extends Command {
    constructor(client) {
      super(client);
      this.client = client;
      this.name = "staff";
      this.category = "Bot";
      this.description = "commands.staff";
      this.usage = "staff";
      this.aliases = ["moderadores", "stf"];
  
      this.enabled = true;
      this.guildOnly = true;
    }

async run({ message, args, prefix, author }, t) {

const EMBED = new ClientEmbed(this.client.user)

.setTimestamp()
.setFooter(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
.addFields(
    { name: `${Emojis.Dono} Donos`, 
    value: `badd#2657 e bito#0001` },
     { name: `${Emojis.Nomedeuser} Gerentes`, 
    value: `A procura` },
    { name: `**${Emojis.Administração} Administrador`, 
    value: `A procura` },
    { name: `${Emojis.Dev} Moderadores`,
    value: `A procura`},
    { name: `${Emojis.Suporte} Suporte`,
    value: `A procura`}
)

message.channel.send(EMBED);
    }
}