const figlet = require('figlet');
const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");

module.exports = class Kiss extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "ascii";
      this.category = "Diversão";
      this.description = "Faça um texto em formato ascii.";
      this.usage = "ascii ";
      this.aliases = [""];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, msg, args, prefix, author }, t) {

        if(!args[0]) return message.channel.send(`${Emojis.Errado} - ${message.author}, contéudo inválido.`);

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
    }}