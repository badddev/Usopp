const {ShardingManager} = require('discord.js');

try {
const manager = new ShardingManager('./index.js', {
totalShards: 1, 
});

const c = require("colors");

manager.on('shardCreate', shard => {
console.log(c.red(`[SHARD] - Iniciando shard ${shard.id}`))
});
manager.spawn();
} catch (err) {
    console.log('erro' + err)
} 