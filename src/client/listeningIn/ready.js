const User = require("../../database/Schemas/User");
const Guild = require("../../database/Schemas/Guild");
const Commands = require("../../structures/Command");


module.exports = class {
  constructor(client) {
    this.client = client;
  }
                                 //Request nas users servers e comandos da DataBase
  async run() {
    this.client.database.users = User;
    this.client.database.guilds = Guild;
    this.client.database.commands = Commands;

                                //Definindo os users servers e comandos

    const users = this.client.users.cache.size;
    const servers = this.client.guilds.cache.size;

                                //Definindo os status do bot
                                const activities = [

                                  { name: `${users} usuários [19] | @Usopp help`, type: 'WATCHING' },

                                ];
                              
                                // Update presence
                                this.client.user.setPresence({ status: 'dnd', activity: activities[0] });
                              
                                let activity = 1;
                              
                                // Update activity every 30 seconds
                                setInterval(() => {
                                  activities[1] = { name: `${this.client.commands.size} comandos [22] | @Usopp help`, type: 'PLAYING' },
                                  activities[2] = { name: `${servers} servidores [18] | @Usopp help`, type: 'WATCHING' }; // Update server count
                                  activities[3] = { name: `${users} usuários [19] | @Usopp help`, type: 'WATCHING' }; // Update user count
                                  if (activity > 3) activity = 0;
                                  this.client.user.setActivity(activities[activity]);
                                  activity++;
                                }, 16000);
  }
};