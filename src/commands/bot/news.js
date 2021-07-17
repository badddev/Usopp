const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class BotInfo extends Command {
    constructor(client) {
      super(client);
      this.client = client;
      this.name = "news";
      this.category = "Bot";
      this.description = "Vejas as principais notícias/atualizações do Bot.";
      this.usage = "news";
      this.aliases = ["noticias"];
  
      this.enabled = true;
      this.guildOnly = true;
    }

async run({ message, args, prefix, author }, t) {

const EMBED = new ClientEmbed(this.client.user)

.setTimestamp()
.setAuthor(`${this.client.user.name} - Notícias do Bot`, this.client.user.displayAvatarURL({ dynamic: true }))
.setFooter(`Equipe Bot Usopp || Todos os direitos Reservados`,this.client.user.displayAvatarURL({ dynamic: true }))
.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
.setDescription(`Novo comando, digite \`.ascii\`\nNovo comando, digite \`.carinho\`\nNovo comando, digite \`.raposa\`\nNovo comando, digite \`.reverse\`\nNovo comando, digite \`.emojify\`\nNovo comando, digite \`.tapa\`\nNovo comando, digite \`.dados\`\nNovo comando, digite \`.corno\`\n> Os logs são enviados por webhook agora.\nDesgin de todos os comandos alterados.\n> Bugs fixados: .botinfo, .pay e .autorole\n> Novo comando digite .bugreport <report do bug> para enviar o report de um bug ao meu servidor de suporte.`)

message.channel.send(EMBED);
}}