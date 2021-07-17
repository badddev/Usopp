const Command = require("../../structures/Command");
const User = require("../../database/Schemas/User")

module.exports = class Ping extends Command {
  constructor(client) {
    super(client);
    this.client = client;

    this.name = "ping";
    this.category = "Bot";
    this.description = "Comando para olhar o ping da host do bot";
    this.usage = "ping";
    this.aliases = ["pong"];

    this.enabled = true;
    this.guildOnly = true;
  }

  async run({ message, args, prefix, author }, t) {
    const ping = Math.ceil(this.client.ws.ping) + "ms";


        //===============> Start Request DB <===============//

        const startDB = process.hrtime();
        await User.findOne({ idU: message.author.id }, async (err, user) => {
          const coins = user.coins;
        });

            //===============> Finish Request DB <===============//

    const stopDB = process.hrtime(startDB);
    const pingDB = Math.round((stopDB[0] * 1e9 + stopDB[1]) / 1e6) + "ms";

    message.channel
      .send(`<:cluster:845382009223512084> Ping do Bot: **${ping}**
<:cluster:845382009223512084> Shards: **[${message.guild.shardID}/ ${(this.client.shard.count)}]**
<:mongodb:845382139327545364> Ping MongoDB: **${pingDB}**`)
  }
};
