const User = require("../../database/Schemas/User");
const Command = require("../../structures/Command");
const os = require('os')
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");
const moment = require("moment");
require("moment-duration-format");

module.exports = class BotInfo extends Command {
  constructor(client) {
    super(client);
    this.client = client;
    this.name = "botinfo";
    this.category = "Bot";
    this.description = "Comando para olhar as informações do Bot.";
    this.usage = "botinfo";
    this.aliases = ["b-info"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    //===============> Imports <===============//

    const users = this.client.users.cache.size;
    const servers = this.client.guilds.cache.size;
    const commands = this.client.commands.size;
    const uptime = moment
      .duration(process.uptime() * 1000)
      .format("d[d] h[h] m[m] e s[s]");
      let cpu = process.cpuUsage()
      let cpuU = cpu.user.toString()[0] + cpu.user.toString()[1]
      let cpuS = cpu.system.toString()[0] + cpu.system.toString()[1]
      cpu = cpuU / 100 * cpuS
    const ping = Math.ceil(this.client.ws.ping) + "ms";
    const version = process.version;
    const owner = await this.client.users.fetch(process.env.OWNER_ID);

    //===============> Start Request DB <===============//

    const startDB = process.hrtime();
    await User.findOne({ idU: message.author.id }, async (err, user) => {
      const coins = user.coins;
    });

    //===============> Finish Request DB <===============//

    const stopDB = process.hrtime(startDB);
    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + "ms";

    //===============> Finish <===============//

    const EMBED = new ClientEmbed(author)

      .setAuthor(`Informações do ${this.client.user.username}`, this.client.user.displayAvatarURL())
      .addFields(
        {
          name: "Informações sobre o Bot",
          value: `${Emojis.Dono} **[Dono: Victor F.](https://github.com/badddev/)** || **${owner.tag}**\n${Emojis.Users}\ Usuários: **${users.toLocaleString()}**\n${Emojis.Servers} Servidores: **${servers.toLocaleString()}**\n${Emojis.Comandos} Comandos Usados: **${this.client.commands.size}**\n${Emojis.Waiting} Tempo acordado: **${uptime}**\n${Emojis.Leadership} Total de Comandos: **${commands}**\n${Emojis.Gaming} Uso da CPU: **${cpu}%**`,
        },
        {
          name: "Minha Última Atualização foi há",
          value: `\`${uptime}\``
        },
        {
          name: `Sobre a Hospedagem`,
          value: `${Emojis.Cluster} Ping: **${ping}**\n${Emojis.MongoDB} Ping MongoDB: **${pingDB}**\n${Emojis.Cluster} Shards: **${(this.client.shard.count)}**\n${Emojis.Memory} Memória usada: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB**\n${Emojis.Js} Versão Node: **[${version}](https://nodejs.org/en/)**`,
        },
        {
          name: `Outras informaões`,
          value: `<a:carregando:845383022546124880> Prefixo no servidor: \`${prefix}\`\n<a:carregando:845383022546124880>  Prefixo padrão: \`.\`\n`
        },
        {
          name: `Links`,
          value: `**[Convite do Bot](https://discord.com/oauth2/authorize?client_id=852696922811924480&permissions=8&scope=bot)\n[Servidor de Suporte](https://discord.gg/SV3HTm3aKM)\n[Vote no Bot](https://top.gg/bot/844538119382630421)\n[badd](https://github.com/badddev/)**`
        }
      )
      .setThumbnail(
        this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
      );

    message.channel.send(EMBED);
  }
};
