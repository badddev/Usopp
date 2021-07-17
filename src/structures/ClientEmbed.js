const Discord = require("discord.js");

module.exports = class ClientEmbed extends (
  Discord.MessageEmbed
) {
  constructor(user, data = {}) {
    super(data);
    this.setColor(process.env.EMBED_COLOR);
  }
};
