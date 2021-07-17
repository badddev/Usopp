const Command = require("../../structures/Command");
const Emojis = require("../../utils/Emojis");

module.exports = class Reverse extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "reverse";
      this.category = "Diversão";
      this.description = "Faça o texto ficar ao contrário.";
      this.usage = "reverse ";
      this.aliases = [""];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, msg, args, prefix, author }, t) {

const text = args.join(" ")
if(!text) return message.channel.send(`${Emojis.Errado} - ${message.author}, insira o que você deseja inverter.`)
let Rarray = text.split("")
let reverseArray = Rarray.reverse()
let result = reverseArray.join("")
message.channel.send(result)
    }}