const Command = require("../../structures/Command");
const Discord = require('discord.js')
const Emojis = require("../../utils/Emojis");

module.exports = class Eval extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "eval";
    this.category = "Owner";
    this.description = "Comando para testar códigos";
    this.usage = "eval <código>";
    this.aliases = ["código"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    if (message.author.id == process.env.OWNER_ID) {
      try {
          if(!args.join(' ')) return message.channel.send(`${message.author} Insira algo para ser executado!`)
          let code = eval(args.join(" "))
          
          if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 });
          let embed = new Discord.MessageEmbed()
          .setDescription('Eval')
          .setColor("0x36393e")
          .addField(`${Emojis.Code} Entrada`, `\`\`\`js\n${args.join(" ")}\`\`\``)
          .addField(`${Emojis.Certo} Saída`, `\`\`\`js\n${code}\n\`\`\``)
          message.channel.send(embed)
      } catch(e) {
          message.channel.send(`\`\`\`\n${e}\n\`\`\``);
      }
  }
  else{
      message.channel.send("Você não tem permissão para executar este comando")
  }
      }
  }
