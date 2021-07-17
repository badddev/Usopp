const Guild = require("../../database/Schemas/Guild"),
  CommandC = require("../../database/Schemas/Command");
const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");
const Emojis = require("../../utils/Emojis");

module.exports = class Help extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "help";
    this.category = "Bot";
    this.description = "Comando para ver informações dos comandos do bot";
    this.usage = "help";
    this.aliases = ["ajuda", "comandos", "commands"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const { commands } = message.client;
    const users = this.client.users.cache.size;
    const servers = this.client.guilds.cache.size;
    const botAvatar = this.client.user.displayAvatarURL

    const AJUDA = new ClientEmbed(author)

      .setTimestamp()
      .setFooter(
        `${this.client.user.username}`,this.client.user.displayAvatarURL({ dynamic: true }))
      .setThumbnail(this.client.user.displayAvatarURL({ size: 2048 }));

    if (args[0]) {
      CommandC.findOne({ _id: args[0].toLowerCase() }, async (err, cmd) => {
        const name = args[0].toLowerCase();
        const comando =
          commands.get(name) ||
          commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));

        if (!comando) {
          return message.quote(
            `${message.author}, não achei nenhum comando com o nome/aliases **\`${name}\`**.`
          );
        }

        if (comando.description)
        AJUDA.addField(
          `${Emojis.Descrição} Descrição:`,
          !comando.description.length
            ? "Não tem Descrição"
            : comando.description
        );
        AJUDA.addField(`${Emojis.Idcard} Nome:`, comando.name);

        if (comando.aliases)
          AJUDA.addField(
            `${Emojis.Alternativas} Alternativas:`,
            !comando.aliases.length
              ? "Nenhuma"
              : comando.aliases.join(", ")
          );
          AJUDA.addField(
            `${Emojis.TextBox} Responde DM:`,
            `Não`
          );
        AJUDA.addField(
          `${Emojis.Checklist} Utilizações:`,
          !cmd
            ? "Comando não registrado"
            : cmd.usages == 0
            ? "Nenhum Uso"
            : cmd.usages
        );
        AJUDA.addField(
          `${Emojis.Permisão} Minhas Permissões:`,
          `Nenhuma`
        );
        AJUDA.addField(
          `${Emojis.Nomedeuser} Permissões do Usuário:`,
          `Nenhuma`
        );
        message.channel.send(AJUDA);
      });
    } else {
      const HELP = new ClientEmbed(author)
        .setAuthor(
          `${this.client.user.username} - Central de Ajuda`,
          this.client.user.displayAvatarURL({ size: 2048 })
        )
        .setDescription(
          `Olá **${message.author.username}**, eu sou o **${this.client.user.username}**. Um bot desenvolvido para o Discord com multifunções\n\nNo momento conto com mais de **${users.toLocaleString()}** usuários em **${servers.toLocaleString()}** servidores.\nSe precisar de ajuda com algum comando use **${prefix}help <comando>**.\nTotal de **${this.client.commands.size}** comandos.`
        )
        .setTimestamp()
        .setFooter(
          `${this.client.user.tag}`,
          this.client.user.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(this.client.user.displayAvatarURL({ size: 2048 }));

      const categories = commands
        .map((x) => x.category)
        .filter((x, f, y) => y.indexOf(x) === f);

      categories.forEach(async (category) => {
        const comandos = commands
          .filter((x) => x.category === category)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((f) => `\`${f.name}\``)
          .join("** - **");

        HELP.addField(category, comandos || `Nenhum Comando`, false);
      });

      message.channel.send(HELP);
    }
  }
};
