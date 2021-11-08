const {Client, MessageEmbed} = require("discord.js")
const client = new Client();
const guildInvites = new Map();

client.on("inviteCreate",async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on("ready",() =>{
    console.log(`${client.user.tag} is Online`)
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));


    });
});

client.on("guildMemberAdd", async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);

    try{
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new MessageEmbed()
        .setTitle(`Welcome to ${member.guild.name}`)
        .setDescription(`Hello ${member}, you are our ${member.guild.memberCount}th member\nJoined using ${usedInvite.inviter.username}'s link\nNumber of uses: ${usedInvite.uses}\nInvite Link: ${usedInvite.url}`)
        .setTimestamp()

        const joinChannel = member.guild.channels.cache.find(channel => channel.id === "841224168296546334")
        if(joinChannel) {
            joinChannel.send(embed).catch(err => console.log(err))

        }
    }
    catch(err) {console.log(err);}
})
require('http').createServer((req, res) => res.end(`
 |-----------------------------------------|
 |              Informations               |
 |-----------------------------------------|
 |• Alive: 24/7                            |
 |-----------------------------------------|
 |• Author: 翔太|ツ‡§HØ†Â‡ツ#4714           |
 |-----------------------------------------|
 |• Server: https://discord.gg/bTBwMSfQ84  |
 |-----------------------------------------|
 |• Invite My Bot: https://dsc.gg/fynlee   |
 |-----------------------------------------|
 |• Github: https://github.com/Carlboygamer|
 |-----------------------------------------|
 |•License: Apache 2.0                     |
 |-----------------------------------------|
`)).listen(3000)

client.login(process.env.token)
