const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const ms = require("ms");

const bot = new Discord.Client({partials: ['MESSAGE','REACTION']});

let getjointime = [0];

function cleanDate(a)
{
  var d = new Date(a);
  var c = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  return c;
}

bot.on("ready", async () => 
{
	console.log(`${bot.user.username} is online!`);
});

bot.on('guildMemberAdd', member => {
	const embed = new Discord.MessageEmbed()
	.setTitle('Welcome!')
	.addField('To the Official ckL-Gaming Discord!', `${member}`)
	.setColor('#0099ff')
	.setThumbnail(member.user.avatarURL())
	.setTimestamp()
    member.guild.channels.cache.get('618869446462668821').send({embed}); 
});

bot.on('messageReactionAdd', async (reaction, user) => 
{
	if(reaction.message.partial)
	{
		if(reaction.message.id === '722713230203682819') // eula
		{
			let role = reaction.message.guild.roles.cache.find(role => role.name === "Verified")
			let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
			
			member.roles.add(role);
		}
		else if(reaction.message.id === '722722994505646111') //Csgo announcements
		{
			let role = reaction.message.guild.roles.cache.find(role => role.id === "722586836807188543")
			let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
			
			member.roles.add(role);
		}
		else if(reaction.message.id === '722723404523765800') //mc announcements
		{
			let role = reaction.message.guild.roles.cache.find(role => role.id === "722586530098446386")
			let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
			
			member.roles.add(role);
		}
	}
});

bot.on('messageReactionRemove', async (reaction, user) => 
{
	if(reaction.message.partial)
	{
		if(reaction.message.id === '722713230203682819') // eula
		{
			let role = reaction.message.guild.roles.cache.find(role => role.name === "Verified")
			let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
			
			member.roles.remove(role);
		}
		else if(reaction.message.id === '722722994505646111') //Csgo announcements
		{
			let role = reaction.message.guild.roles.cache.find(role => role.id === "722586836807188543")
			let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
			
			member.roles.remove(role);
		}
		else if(reaction.message.id === '722723404523765800') //mc announcements
		{
			let role = reaction.message.guild.roles.cache.find(role => role.id === "722586530098446386")
			let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
			
			member.roles.remove(role);
		}
	}
});

bot.on("message", async message => 
{
	if(message.author.bot)
		return;
	if(message.channel.type == "dm")
		return;
	
	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	
	if(message.content === "hello")
	{
		message.reply('Hello!');
	}
	
	if(cmd === `${prefix}about`)
	{
		const embed = new Discord.MessageEmbed()
		.setTitle('About ckL-Bot')
		.setThumbnail(bot.user.displayAvatarURL())
		.setDescription('Offical ckL Discord Bot!')
		.addField('Version', '0.9.14')
		.addField('Author', '@claytonjorg (SeaC#6528)')
		.addField('URL', 'https://github.com/claytonjorg/DiscordBot')
		.setColor('#0099ff')
		.setTimestamp()

		message.channel.send({embed});
	}
	else if(cmd === `${prefix}help`)
	{
		const embed = new Discord.MessageEmbed()
		.setTitle('Help Info')
		.addField('!about', 'Displays a embed about message.')
		.addField('!website/web', 'Displays a link to your website.')
		.addField('!ping', 'Sends a ping and calculates the ms response time.')
		.addField('!servers', 'Displays a embed servers message.')
		.addField('!eula', 'Creates the EULA for users to agree to.')
		.addField('!mute', 'Mutes a user from the text channels.')
		.addField('!role', 'Temporarily assigns a role to a user. (time key: 5s = 5 seconds, 5m = 5 minutes, 5hr = 5 hours)')
		.addField('!queue', 'Displays a embed message with a list of users connected to a specific voice channel and the time they joined.')
		.setColor('#0099ff')
		.setTimestamp()

		message.channel.send({embed});
	}
	else if(cmd === `${prefix}website` || cmd === `${prefix}web`)
	{
		message.channel.send("https://www.TESTDOMAIN.com");
	}
	else if(cmd === `${prefix}ping`)
	{
		message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");
	}
	else if(cmd === `${prefix}servers`)
	{
		const embed = new Discord.MessageEmbed()
		.setTitle('Servers')
		.setDescription('SAMPLE PLACEHOLDER ==> N/A\nSAMPLE PLACEHOLDER ==> N/A')
		.setColor('#0099ff')
		.setTimestamp()
		
		const embed2 = new Discord.MessageEmbed()
		.setTitle('More Servers')
		.setDescription('SAMPLE PLACEHOLDER ==> N/A')
		.setColor('#008000')
		.setTimestamp()
		
		message.channel.send(embed).then(message.channel.send(embed2));
	}
	else if(cmd === `${prefix}eula`)
	{
		const embed = new Discord.MessageEmbed()
		.setTitle('Agreement to EULA')
		.setDescription('By reacting to this message, you are indicating your agreement to our #discord-rules.\nIf you have not viewed them, please do so now.')
		.setColor('#0099ff')
		.setTimestamp()

		message.channel.send({embed})
		 .then(function (message) {
              message.react("📑")
            }).catch(function() {
              console.error;
             });
	}
	else if(cmd === `${prefix}mute`)
	{
		let tempUser = message.mentions.members.first();
		let tempTime = args[1];
		let tempReason = args[2];
		
		if( message.member.roles.cache.find(role => role.name === "Founder") ||
			message.member.roles.cache.find(role => role.name === "Co-Founder") ||
			message.member.roles.cache.find(role => role.name === "Lead Admin") ||
			message.member.roles.cache.find(role => role.name === "Server Admin") ||
			message.member.roles.cache.find(role => role.name === "Moderator"))
		{
			// TODO
		}
		else
		{
			message.channel.send("You do not have permission to use this command.");
		}
	}
	else if(cmd === `${prefix}role`)
	{
		let tempUser = message.mentions.members.first();
		let tempRole = message.mentions.roles.first();
		let tempTime = args[2];
		let tempReason = args[3];
		
		if( message.member.roles.cache.find(role => role.name === "Founder") ||
			message.member.roles.cache.find(role => role.name === "Admin") ||
			message.member.roles.cache.find(role => role.name === "Moderator"))
		{
			if(!tempUser)
				return message.channel.send('Invalid UserName, `!role <@UserName> <role> <time> <reason>`');
			
			if(!tempTime)
				return message.channel.send('Invalid Time, `!role <@UserName> <role> <time> <reason>`');
			
			if(!tempRole)
				message.channel.send('Invalid Role, `!role <@UserName> <role> <time> <reason>`');
			
			if(!tempReason)
				tempReason = "N/A";
			
			if(tempUser.roles.cache.find(role => role.id === tempRole.id))
				return message.channel.send('Invalid Usage, User already has role.');
			
			await(tempUser.roles.add(tempRole.id).catch(console.error));
			
			const embed = new Discord.MessageEmbed()
			.setTitle('Added Role')
			.setDescription(`<@${tempUser.id}> has been granted the ${tempRole} role for ${tempTime}. Reason: ${tempReason}`)
			.setColor('#0099ff')
			.setTimestamp()
			message.channel.send(embed);
			
			setTimeout(function() 
			{
				tempUser.roles.remove(tempRole.id);
				message.channel.send(`<@${tempUser.id}>, your ${tempRole} role has been removed.`);
			}, ms(tempTime));
		}
		else
		{
			message.channel.send("You do not have permission to use this command.");
		}
	}
	else if(cmd === `${prefix}queue`)
	{
		let membersInChannel = message.guild.members.cache.filter(n => n.voice.channelID === "771784239132704779");
		let membersInQueue = membersInChannel.map(n => n.displayName + " (" + cleanDate(getjointime[n]) + ")");

		const embed = new Discord.MessageEmbed()
		.setTitle("Current Queue #1")
		.setColor("#0099ff")
        .setDescription(membersInQueue.join("\n"))
        .setTimestamp()

		return message.channel.send({embed});
	}
	
});

bot.on('voiceStateUpdate', (oldState, newState) =>
{	
	if(newState.member.voice.channelID === "771784239132704779") // Voice channel for queue
	{
		console.log('[DEBUG]Console: ' + newState.member.displayName + ' joined voice channel Queue.');
		const m = newState.member.guild.channels.cache.get('771545218642214924').send(newState.member.displayName + ' joined voice channel Queue.')
              .then((msg) => {
                  getjointime[newState.member] = msg.createdTimestamp;
      });
	}
});

bot.login(botconfig.token);
