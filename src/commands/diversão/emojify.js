const Command = require("../../structures/Command");

module.exports = class uptime extends Command {
    constructor(client) {
      super(client);
      this.client = client;
  
      this.name = "emojify";
      this.category = "Diversão";
      this.description = "Escreve em emoji.";
      this.usage = "emojify";
      this.aliases = [""];
  
      this.enabled = true;
      this.guildOnly = true;
    }
  
    async run({ message, args, prefix, author }, t) {

if(!args.length) return message.reply('Please specify a text to translate.')
const specialCodes = {
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '#': ':hash:',
    '*': ':asterisk:',
    '?': ':grey_question:',
    '!': ':grey_exclamation:',
    ' ' :'   '
  }
const text = args.join(" ").toLowerCase().split('').map(letter => {
    if(/[a-z]/g.test(letter)) {
        return `:regional_indicator_${letter}:`
    } else if (specialCodes[letter]) {
        return `${specialCodes[letter]}`
    }
    return letter;
}).join(' ');

message.channel.send(text)
    }}