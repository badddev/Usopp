const Command = require("../../structures/Command");
const ClientEmbed = require("../../structures/ClientEmbed");

module.exports = class callConfig extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "callConfig";
    this.category = "Configuração";
    this.description = "Configure o Sistema de Call's no seu servidor";
    this.usage = "callConfig";
    this.aliases = ["callconfig", "c-config", "call-c", "call-config", "c-c"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const doc = await this.client.database.guilds.findOne({
      idS: message.guild.id,
    });

    const call = doc.infoCall;

    const EMBED = new ClientEmbed(author)
      .setAuthor(
        `Configuração Call - ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .addFields(
        {
          name: `Canais Bloqueados`,
          value: !call.channels.length
            ? "Nenhum Canal Adicionado"
            : call.channels.length > 10
            ? `${call.channels
                .map((x) => `<#${x}>`)
                .slice(0, 10)
                .join(" - ")} e mais ***${call.channels.length - 10} canais***`
            : call.channels.map((x) => `<#${x}>`).join(" - "),
        },
        {
          name: `Cargos Bloqueados`,
          value: !call.roles.length
            ? "Nenhum Cargo Adicionado"
            : call.roles.length > 10
            ? `${call.roles
                .map((x) => `<@&${x}>`)
                .slice(0, 10)
                .join(" - ")} e mais ***${call.roles.length - 10} cargos***`
            : call.roles.map((x) => `<@&${x}>`).join(" - "),
        }
      );

    if (!args[0]) return message.channel.send(EMBED);

    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        `${message.author}, você não tem permissão de executar este comando.`
      );

    if (["canal", "channel"].includes(args[0].toLowerCase())) {
      if (args[1] === "addall") {
        const channels = message.guild.channels.cache
          .filter((x) => x.type === "voice")
          .map((f) => f.id);
        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $set: { "infoCall.channels": [] } }
        );

        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $push: { "infoCall.channels": channels } }
        );

        message.channel.send(
          `${message.author}, todos os canais foram setados com sucesso.`
        );

        return;
      }
      if (args[1] === "all" || args[1] === "tudo") {
        if (!call.channels.length)
          return message.channel.send(
            `${message.author}, não há nenhum canal na lista.`
          );

        message.channel.send(
          `${message.author}, removi todos os canais com sucesso.`
        );
        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $set: { "infoCall.channels": [] } }
        );
        return;
      }

      const CHANNEL =
        message.guild.channels.cache.get(args[1]) ||
        message.mentions.channels.first();

      if (!CHANNEL)
        return message.channel.send(
          `${message.author}, mencione/insira o ID do canal desejado.`
        );

      if (CHANNEL.type != "voice")
        return message.channel.send(
          `${message.author}, o canal inserido não é um canal de voz.`
        );

      if (call.channels.find((x) => x === CHANNEL.id)) {
        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $pull: { "infoCall.channels": CHANNEL.id } }
        );
        return message.channel.send(
          `${message.author}, o canal inserido já estava na lista portanto eu removi ele.`
        );
      } else {
        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $push: { "infoCall.channels": CHANNEL.id } }
        );
        return message.channel.send(
          `${message.author}, o canal inserido foi adicionado na lista com sucesso.`
        );
      }
    }
    if (["cargo", "role"].includes(args[0].toLowerCase())) {
      if (args[1] === "addall") {
        const channels = message.guild.roles.cache.map((x) => x.id);

        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $set: { "infoCall.roles": [] } }
        );

        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $push: { "infoCall.roles": channels } }
        );

        message.channel.send(
          `${message.author}, todos os cargos foram setados com sucesso.`
        );

        return;
      }

      if (args[1] === "all" || args[1] === "tudo") {
        if (!call.roles.length)
          return message.channel.send(
            `${message.author}, não há nenhum cargo na lista.`
          );

        message.channel.send(
          `${message.author}, removi todos os cargos com sucesso.`
        );
        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $set: { "infoCall.roles": [] } }
        );
        return;
      }

      const ROLE =
        message.guild.roles.cache.get(args[1]) ||
        message.mentions.roles.first();

      if (!ROLE)
        return message.channel.send(
          `${message.author}, mencione/insira o ID do cargo desejado.`
        );

      if (call.roles.find((x) => x === ROLE.id)) {
        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $pull: { "infoCall.roles": ROLE.id } }
        );
        return message.channel.send(
          `${message.author}, o cargo inserido já estava na lista portanto eu removi ele.`
        );
      } else {
        await this.client.database.guilds.findOneAndUpdate(
          { idS: message.guild.id },
          { $push: { "infoCall.roles": ROLE.id } }
        );
        return message.channel.send(
          `${message.author}, o cargo inserido foi adicionado na lista com sucesso.`
        );
      }
    }
  }
};