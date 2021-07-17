const Guild = require("../../database/Schemas/Guild"),
  User = require("../../database/Schemas/User"),
  Command = require("../../database/Schemas/Command"),
  ClientS = require("../../database/Schemas/Client");
const GetMention = (id) => new RegExp(`^<@!?${id}>( |)$`);
const Emojis = require("../../utils/Emojis");
const ClientEmbed = require("../../structures/ClientEmbed");
const { WebhookClient } = require("discord.js");
const moment = require("moment");
const coldoown = new Set();
let t;

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    moment.locale("pt-BR");

    const regex =
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discord|discordapp)\.com\/invite)\/.+[a-z]/g;

    if (regex.test(message.content)) {
      message.delete();
      return message.channel.send(
        `${message.author}, você não pode divulgar aqui.`
      );
    }

    try {
      const server = await Guild.findOne({ idS: message.guild.id });
      const user = await User.findOne({ idU: message.author.id });
      const client = await ClientS.findOne({ _id: this.client.user.id });

      if (message.author.bot == true) return;

      const language = await this.client.getLanguage(message.guild.id);

      try {
        t = await this.client.getTranslate(message.guild.id);
      } catch (e) {
        console.log(e);
      }

      if (!user)
        await User.create({ idU: message.author.id, idS: message.guild.id });

      if (!server) await Guild.create({ idS: message.guild.id });
      if (!client)
        await ClientS.create({
          _id: this.client.user.id,
          reason: "",
          manutenção: false,
        });

      var prefix = prefix;
      prefix = server.prefix;

      if (message.content.match(GetMention(this.client.user.id))) {
        
        const EMBED = new ClientEmbed(this.client.user)

        .setAuthor(``)
        .setDescription(`Olá eu sou o **${this.client.user.username}**, um Bot desenvolvido em \`( JavaScript \n )\`. Fui feito para ajudar vocês a se sentirem mais confortáveis em seu servidor!\n\nPara saber a lista dos meus comandos, basta digitar: **${prefix}help**.`)
        .addFields(
          {
            name: `${Emojis.Nomedeuser} Meus Link's`,
            value: `**[Meu Convite](https://discord.com/oauth2/authorize?client_id=852696922811924480&permissions=8&scope=bot)\n[Servidor de Suporte](https://discord.gg/SV3HTm3aKM)\n[Vote em mim](https://top.gg/bot/835994152193228833)\n[badd](https://github.com/badddev/)**`
          }
        )
        .setThumbnail(
          this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
        );

        message.channel.send(EMBED);
      }

      let xp = user.Exp.xp;
      let level = user.Exp.level;
      let nextLevel = user.Exp.nextLevel * level;

      if (user.Exp.id == "null") {
        await User.findOneAndUpdate(
          { idU: message.author.id },
          { $set: { "Exp.id": message.author.id } }
        );
      }

      let xpGive = Math.floor(Math.random() * 5) + 1;

      await User.findOneAndUpdate(
        { idU: message.author.id },
        {
          $set: {
            "Exp.xp": xp + xpGive,
            "Exp.user": message.author.tag,
          },
        }
      );

      if (xp >= nextLevel) {
        await User.findOneAndUpdate(
          { idU: message.author.id },
          { $set: { "Exp.xp": 0, "Exp.level": level + 1 } }
        );

        message.quote(
          `${message.author}, você acaba de subir para o level **${
            level + 1
          }**.`
        );
        message.react("⬆️");
      }

      if (message.content.indexOf(prefix) !== 0) return;
      const author = message.author;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      const cmd =
        this.client.commands.get(command) ||
        this.client.commands.get(this.client.aliases.get(command));

      if (!cmd) return;
      if (coldoown.has(message.author.id))
        return message.channel.send(
          `<:colldown:845550069586984980> - ${message.author}, você deve aguardar **5 segundos** para usar outro comando.`
        );

      const comando = await Command.findOne({ _id: cmd.name });

      if (comando) {
        if (message.author.id !== process.env.OWNER_ID) {
          if (comando.manutenção)
            return message.quote(
              `${message.author}, o comando **\`${cmd.name}\`** está em manutenção no momento.\nMotivo: **${comando.reason}**`
            );

          if (client.manutenção) {
            return message.quote(
              `${message.author}, no momento eu me encontro em manutenção, tente novamente mais tarde.\nMotivo: **${client.reason}**`
            );
          }
        }
        if (client.blacklist.some((x) => x == message.author.id)) {
          return message.quote(
            `${message.author}, você não pode me usar no momento. **\`Lista Negra\`**.`
          );
        }

        const cb = server.cmdblock;

        if (cb.status) {
          if (!cb.cmds.some((x) => x === cmd.name)) {
            if (!cb.channels.some((x) => x === message.channel.id)) {
              if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.channel.send(cb.msg);
              }
            }
          }
        }

        cmd.run({ message, args, prefix, author, language }, t);
        var num = comando.usages;
        num = num + 1;

        // Webhook de Comandos Usados //

        const Webhook = new WebhookClient(
          "845377386564550656",
          "K8udqPYEsz_Z1FRpGTk5ei9XZp4ZG3rq6KeSYhUqlY1XLGeQaGYffXk8r_281zfvfTvN"
        );

        const EMBED_COMMANDS = new ClientEmbed(this.client.user)
          .setAuthor(
            `Logs de Comandos do Bot`,
            this.client.user.displayAvatarURL()
          )
          .addFields(
            {
              name: `Servidor que foi Usado`,
              value: `**${message.guild.name}** \`( ${message.guild.id} )\``,
            },
            {
              name: `Author do Comando`,
              value: `**${message.author.tag}** \`( ${message.author.id} )\``,
            },
            {
              name: `Data da Execução`,
              value: moment(Date.now()).format("L LT"),
            },
            {
              name: `O que foi executado`,
              value: `**\`${cmd.name} ${args.join(" ")}\`**`,
            }
          )
          .setTimestamp()
          .setFooter(
            message.author.id,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setThumbnail(
            this.client.user.displayAvatarURL({ format: "jpg", size: 2048 })
          );

        Webhook.send(EMBED_COMMANDS);

               // ========================== //

               if (!["600804786492932101"].includes(message.author.id)) {
                coldoown.add(message.author.id);
                setTimeout(() => {
                  coldoown.delete(message.author.id);
                }, 5000);
              }
              await Command.findOneAndUpdate(
                { _id: cmd.name },
                { $set: { usages: num } }
              );
            } else {
              await Command.create({
                _id: cmd.name,
                usages: 1,
                manutenção: false,
              });
              console.log(
                `O comando ${cmd.name} teve seu documento criado com sucesso.`
              );
            }
          } catch (err) {
            if (err) console.error(err);
          }
  }
};